"use server";

import prisma from "@/lib/db";
import { s3, bucketName } from "@/lib/aws";

//get user detail if exist
export const getUserDetails = async (username) => {
  try {
    const userData = await prisma.User.findUnique({
      where: {
        name: username,
      },
    });
    if (userData === null) {
      throw new Error("No user found! Please try another.");
    }
    return userData;
  } catch (error) {
    console.log("error", error);
    throw new Error("No user found! Please try another");
  }
};

//geting user's asigned tasks
export const getAssingedTask = async (groupId, stateId, userId) => {
  try {
    const assingedTasks = await prisma.Task.findMany({
      where: {
        group_id: groupId,
        state_id: stateId,
        transcriber_id: userId,
      },
    });
    if (assingedTasks === null) {
      throw new Error("No task found for user!.");
    }
    return assingedTasks;
  } catch (error) {
    console.log("error", error);
    throw new Error("No task found for user! Please try another");
  }
};

// get task based on username
export const getUserTask = async (username) => {
  const userData = await getUserDetails(username);
  console.log("userData", userData);
  let userId = userData.id;
  let groupId = userData.group_id;
  let roleId = userData.role_id;
  console.log("user id", userId, groupId, roleId);

  // return tasks based on  user role
  try {
    switch (roleId) {
      case 1:
        // get transcriber tasks
        const transcriberTasks = await getAssingedTask(groupId, 1, userId);
        if(transcriberTasks.length == 0){
          // assign some tasks
        const assignedTranscriberTask = await assignTasks(groupId, 1, userId);
        console.log("assignedTranscriberTask", assignedTranscriberTask);
        return await preSignedUrlTask(Object.values(assignedTranscriberTask), roleId, "assign");
        }else {
        console.log("transcriberTasks", transcriberTasks, transcriberTasks.length);
        return await preSignedUrlTask(transcriberTasks, roleId, "assign");
        }
        break;
      case 2:
        // get transcriber tasks
        const reviewerTasks = await prisma.Task.findMany({
          where: {
            group_id: groupId,
            reviewer_id: userId,
            state_id: 4,
          },
        });
        console.log("reviewerTasks", reviewerTasks);
        return await preSignedUrlTask(reviewerTasks, roleId);
        break;
      case 3:
        // get transcriber tasks
        const finalReviewerTasks = await prisma.Task.findMany({
          where: {
            group_id: groupId,
            final_reviewer_id: userId,
            state_id: 5,
          },
        });
        console.log("finalReviewerTasks", finalReviewerTasks);
        return await preSignedUrlTask(finalReviewerTasks, roleId);
        break;
      default:
        break;
    }
  } catch (error) {
    console.log("Error occurred while getting user task:", error);
    throw new Error(error);
  }
};

// assign tasks to user when got no task to work on
export const assignTasks = async (groupId, stateId, userId) => {
  let assignedTasks;

  //first get all the unassigned tasks and assign some to user and give back to user
  const unassignedTasks = await prisma.Task.findMany({
    where: {
      group_id: groupId,
      state_id: stateId,
      transcriber_id: null
    },
    // filteration of lastest or old task could come here
    take: 20,
  });
  console.log("unassignedTasks are", unassignedTasks);
  if(unassignedTasks.length === 0 ){
    return assignedTasks = unassignedTasks;
  } else {

  const assignedTaskCount = await prisma.Task.updateMany({
    where: {
      id: { in : unassignedTasks?.map(task => task.id)}
    },
    data: {
      transcriber_id: userId
    }
  });
  console.log("assignedTaskCount", assignedTaskCount);
  //updatedManyTask { count: 3 }
  if(assignedTaskCount?.count > 0) {
    assignedTasks = await getAssingedTask(groupId, stateId, userId);
  }
  console.log("assignedTasks", assignedTasks);
  return assignedTasks;
}
  // const assignedTask = unassignedTasks.map(task => { 
  //   const updatedTasked = updateId(task, userId)/
  //   console.log("updatedTasked", updatedTasked);
  //   return { ...task, transcriber_id: userId}
  // });

}

export const updateId = async (task, userId) => {
  const updatedTasked = await prisma.Task.update({
    where: {
      id: task.id,
    },
    data: {
      transcriber_id: userId
    }
  })
  return updatedTasked;
}
// return task with presignedurl for audio clip
export const preSignedUrlTask = async (tasks, roleId, action) => {
  console.log("preSignedUrlTask");
  const taskList = await tasks.map( (list) => {
    console.log("key 1", list.file_name)
    const key = list.file_name;
    const params = {
      Bucket: bucketName,
      Key: key,
      Expires: 3600,
    };
    // 
    const statedTask = changeTaskState(list, roleId, action);
    const presignedUrl = s3.getSignedUrl("getObject", params);
    return { ...statedTask, url: presignedUrl };
  });
  return taskList;
};

// to change the state of task based on user action (state machine)
export const changeTaskState = (task, role, action) => {
  switch (role) {
    case 1:
      return  action === "assign"
        ? { ...task, state_id: 2 }
        : action === "submit"
        ? { ...task, state_id: 4 }
        : action === "trash"
        ? { ...task, state_id: 3 }
        : { ...task, state_id: 1 };
      break;
    case 2:
      return  action === "accept"
        ? { ...task, state_id: 5 }
        : action === "reject"
        ? { ...task, state_id: 2 }
        : { ...task, state_id: 4 };
      break;
    case 3:
      return  action === "finalized"
        ? { ...task, state_id: 6 }
        : action === "reject"
        ? { ...task, state_id: 4 }
        : { ...task, state_id: 5 };
      break;
    default:
      break;
  }
};

// change all the status to unannotated
export const changeAllStatus = async () => {
  const allFiles = await prisma.files.findMany(); // Fetch all records

  for (const file of allFiles) {
    await prisma.files.update({
      where: {
        id: file.id,
      },
      data: {
        status: "unannotated", // Replace with the new status value
      },
    });
  }
};


// update the files
export const updateTask = async (action, id, transcript, task) => {
  console.log("update task", action, id, transcript, task)
  const changeState = await changeTaskState(task, 1, action);
  console.log("changeState",changeState);
  try {
    const updatedFile = await prisma.Task.update({
      where: {
        id,
      },
      data: {
        state_id: changeState.state_id,
        transcript,
        url: task.url
      },
    });
    return updatedFile;
  } catch (error) {
    console.log("Error updating files", error);
  }
};

// get file by id
export const getFileById = async (id) => {
  try {
    console.log("id for file", id);
    const file = await prisma.files.findUnique({
      where: {
        id: id,
      },
    });
    const key = file.audioname;
    const params = {
      Bucket: bucketName,
      Key: key,
      Expires: 3600,
    };
    const presignedUrl = s3.getSignedUrl("getObject", params);
    return { ...file, audioname: presignedUrl };
  } catch (error) {
    throw new Error(error);
  }
};
