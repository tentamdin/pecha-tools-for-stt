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
export const getAssignedTasks = async (groupId, userId, role) => {
  console.log("inside getAssignedTask with role as:", role);
  // return tasks based on  user role
  try {
    switch (role) {
      case "TRANSCRIBER":
        // get transcriber assigned tasks
        try {
          const assingedTasks = await prisma.Task.findMany({
            where: {
              group_id: groupId,
              state: "transcribing",
              transcriber_id: userId,
            },
          });
          if (assingedTasks === null) {
            throw new Error("No task found for TRANSCRIBER!.");
          }
          return assingedTasks;
        } catch (error) {
          console.log("error", error);
          throw new Error(
            "Error while getting assigned task for TRANSCRIBER! Please try another"
          );
        }
        break;
      case "REVIEWER":
        // get reviwer assigned tasks
        try {
          const assingedTasks = await prisma.Task.findMany({
            where: {
              group_id: groupId,
              state: "submitted",
              reviewer_id: userId,
            },
          });
          if (assingedTasks === null) {
            throw new Error("No task found for REVIEWER!.");
          }
          return assingedTasks;
        } catch (error) {
          console.log("error", error);
          throw new Error(
            "Error while getting assigned task for REVIEWER! Please try another"
          );
        }
        break;
      case "FINAL_REVIEWER":
        // get final reviwer assigned tasks
        try {
          const assingedTasks = await prisma.Task.findMany({
            where: {
              group_id: groupId,
              state: "accepted",
              final_reviewer_id: userId,
            },
          });
          if (assingedTasks === null) {
            throw new Error("No task found for FINAL_REVIEWER!.");
          }
          return assingedTasks;
        } catch (error) {
          console.log("error", error);
          throw new Error(
            "Error while getting assigned task for FINAL_REVIEWER! Please try another"
          );
        }
      default:
        break;
    }
  } catch (error) {
    console.log("Error occurred while getting user task:", error);
    throw new Error(error);
  }
  // try {
  //   const assingedTasks = await prisma.Task.findMany({
  //     where: {
  //       group_id: groupId,
  //       state_id: stateId,
  //       reviewer_id: userId,
  //     },
  //   });
  //   if (assingedTasks === null) {
  //     throw new Error("No task found for user!.");
  //   }
  //   return assingedTasks;
  // } catch (error) {
  //   console.log("error", error);
  //   throw new Error("No task found for user! Please try another");
  // }
};

// get task based on username
export const getUserTask = async (username) => {
  const userData = await getUserDetails(username);
  console.log("userDetail", userData);
  const { id: userId, group_id: groupId, role } = userData;
  // let userId = userData.id;
  // let groupId = userData.group_id;
  // let role = userData.role_id;
  console.log("userId", userId, "groupId", groupId, "role", role);
  const userTasks = await getAssignedTasks(groupId, userId, role);
  console.log("user already assigned task", userTasks)
  if (userTasks.length == 0) {
    // assign some tasks
    const assingedTasks = await assignTasks(groupId, userId, role);
    console.log("assignedTask", assingedTasks);
    return await preSignedUrlTask(Object.values(assingedTasks), role);
  } else {
    console.log("userTasks", userTasks.length);
    return await preSignedUrlTask(userTasks, role);
  }
};

// assign tasks to user when got no task to work on
export const assignTasks = async (groupId, userId, role) => {
  let assignedTasks;
  // assign tasks based on  user role
  try {
    switch (role) {
      case "TRANSCRIBER":
        //get first 20 of the unassigned tasks and assign some to TRANSCRIBER and give back to TRANSCRIBER
        try {
          const unassignedTasks = await prisma.Task.findMany({
            where: {
              group_id: groupId,
              state: "imported",
              transcriber_id: null,
            },
            orderBy: {
              id: "asc",
            },
            take: 20,
          });
          console.log("unassignedTasks are", unassignedTasks);

          if (unassignedTasks.length === 0) {
            return (assignedTasks = unassignedTasks);
          } else {
            const assignedTaskCount = await prisma.Task.updateMany({
              where: {
                id: { in: unassignedTasks?.map((task) => task.id) },
              },
              data: {
                transcriber_id: userId,
                state: "transcribing",
              },
            });
            console.log("assignedTaskCount", assignedTaskCount);

            //updatedManyTask { count: 3 }
            if (assignedTaskCount?.count === 0) {
              throw new Error("No task found for TRANSCRIBER!.");
            }
            const assignedTasks = await getAssignedTasks(groupId, userId, role);
            console.log("assignedTasks", assignedTasks);
            return assignedTasks;
          }
        } catch (error) {
          console.log("error", error);
          throw new Error(
            "Error while getting assigned task for REVIEWER! Please try another"
          );
        }
        break;
      case "REVIEWER":
        //get first 20 of the unassigned tasks and assign some to TRANSCRIBER and give back to TRANSCRIBER
        try {
          const unassignedTasks = await prisma.Task.findMany({
            where: {
              group_id: groupId,
              state: "submitted",
              reviewer_id: null,
            },
            orderBy: {
              id: "asc",
            },
            take: 20,
          });
          console.log("unassignedTasks are", unassignedTasks);

          if (unassignedTasks.length === 0) {
            return (assignedTasks = unassignedTasks);
          } else {
            const assignedTaskCount = await prisma.Task.updateMany({
              where: {
                id: { in: unassignedTasks?.map((task) => task.id) },
              },
              data: {
                reviewer_id: userId,
              },
            });
            console.log("assignedTaskCount", assignedTaskCount);

            //updatedManyTask { count: 3 }
            if (assignedTaskCount?.count === 0) {
              throw new Error("No task found for TRANSCRIBER!.");
            }
            const assignedTasks = await getAssignedTasks(groupId, userId, role);
            console.log("assignedTasks", assignedTasks);
            return assignedTasks;
          }
        } catch (error) {
          console.log("error", error);
          throw new Error(
            "Error while getting assigned task for REVIEWER! Please try another"
          );
        }f
        break;
      case "FINAL_REVIEWER":
        //get first 20 of the unassigned tasks and assign some to TRANSCRIBER and give back to TRANSCRIBER
        try {
          const unassignedTasks = await prisma.Task.findMany({
            where: {
              group_id: groupId,
              state: "accepted",
              final_reviewer_id: null,
            },
            orderBy: {
              id: "asc",
            },
            take: 20,
          });
          console.log("unassignedTasks are", unassignedTasks);

          if (unassignedTasks.length === 0) {
            return (assignedTasks = unassignedTasks);
          } else {
            const assignedTaskCount = await prisma.Task.updateMany({
              where: {
                id: { in: unassignedTasks?.map((task) => task.id) },
              },
              data: {
                final_reviewer_id: userId,
              },
            });
            console.log("assignedTaskCount", assignedTaskCount);

            //updatedManyTask { count: 3 }
            if (assignedTaskCount?.count === 0) {
              throw new Error("No task found for TRANSCRIBER!.");
            }
            const assignedTasks = await getAssignedTasks(groupId, userId, role);
            console.log("assignedTasks", assignedTasks);
            return assignedTasks;
          }
        } catch (error) {
          console.log("error", error);
          throw new Error(
            "Error while getting assigned task for REVIEWER! Please try another"
          );
        }
        break;
      default:
        break;
    }
  } catch (error) {
    console.log("Error occurred while getting user task:", error);
    throw new Error(error);
  }
};


// return task with presignedurl for audio clip
export const preSignedUrlTask = async (tasks, role, action) => {
  console.log("preSignedUrlTask");
  const taskList = await tasks.map((list) => {
    console.log("key 1", list.file_name);
    const key = list.file_name;
    const params = {
      Bucket: bucketName,
      Key: key,
      Expires: 3600,
    };
    //
    // const statedTask = changeTaskState(list, role, action);
    // console.log("statedTask", statedTask);
    const presignedUrl = s3.getSignedUrl("getObject", params);
    return { ...list, url: presignedUrl };
  });
  return taskList;
};

// to change the state of task based on user action (state machine)
export const changeTaskState = (task, role, action) => {
  console.log("changeTaskState", role, action)
  switch (role) {
    case "TRANSCRIBER":
      return action === "assign" || action === "save"
        ? { ...task, state: "transcribing" }
        : action === "submit"
        ? { ...task, state: "submitted" }
        : action === "trash"
        ? { ...task, state: "trashed" }
        : { ...task, state: "imported" };
      break;
    case "REVIEWER":
      return action === "submit"
        ? { ...task, state: "accepted" }
        : action === "reject"
        ? { ...task, state: "transcribing" }
        : { ...task, state: "submitted" };
      break;
    case "FINAL_REVIEWER":
      return action === "submit"
        ? { ...task, state: "finalised" }
        : action === "reject"
        ? { ...task, state: "submitted" }
        : { ...task, state: "accepted" };
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
export const updateTask = async (action, id, transcript, task, role) => {
  console.log("update task", action, id, transcript, task, role);
  const changeState = await changeTaskState(task, role, action);
  console.log("changeState", changeState);
  switch (role) {
    case "TRANSCRIBER":
      try {
        const updatedFile = await prisma.Task.update({
          where: {
            id,
          },
          data: {
            state: changeState.state,
            transcript,
            url: task.url,
          },
        });
        return updatedFile;
      } catch (error) {
        console.log("Error updating files", error);
      }
      break;
    case "REVIEWER":
    try {
      const updatedFile = await prisma.Task.update({
        where: {
          id,
        },
        data: {
          state: changeState.state,
          reviewed_transcript: transcript,
          url: task.url,
        },
      });
      return updatedFile;
    } catch (error) {
      console.log("Error updating files", error);
    }
    break;
    default:
      break;
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


export const updateId = async (task, userId) => {
  const updatedTasked = await prisma.Task.update({
    where: {
      id: task.id,
    },
    data: {
      transcriber_id: userId,
    },
  });
  return updatedTasked;
};