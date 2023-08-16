"use server";

import prisma from "@/lib/db";
import { s3, bucketName } from "@/lib/aws";
import { NextResponse } from "next/server";

  //get user detail if exist
export const getUserDetails = async (username) => {
  try {
    const userData = await prisma.User.findUnique({
      where: {
        name: username,
      },
    });
    if(userData === null) {
      throw new Error("No user found! Please try another.")
    }
    return userData;
  } catch (error) {
    console.log("erroe", error)
    throw new Error("No user found! Please try another");
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
        const transcriberTasks = await prisma.Task.findMany({
          where: {
            group_id: groupId,
            transcriber_id: userId,
          },
        });
        console.log("transcriberTasks", transcriberTasks);
        return  await preSignedUrlTask(transcriberTasks);
        break;
      case 2:
        // get transcriber tasks
        const reviewerTasks = await prisma.Task.findMany({
          where: {
            group_id: groupId,
            reviewer_id: userId,
          },
        });
        console.log("reviewerTasks", reviewerTasks);
        return reviewerTasks;
        break;
      case 3:
        // get transcriber tasks
        const finalReviewerTasks = await prisma.Task.findMany({
          where: {
            group_id: groupId,
            final_reviewer_id: userId,
          },
        });
        console.log("finalReviewerTasks", finalReviewerTasks);
        return finalReviewerTasks;
        break;
      default:
        break;
    }
  } catch (error) {
    console.log("Error occurred while getting user task:", error);
    throw new Error(er);
  }
};

// return task with presignedurl for audio clip
export const preSignedUrlTask = async (tasks) => {
  const taskList = await tasks.map((list) => {
    const key = list.file_name;
    const params = {
      Bucket: bucketName,
      Key: key,
      Expires: 3600,
    };
    const presignedUrl = s3.getSignedUrl("getObject", params);
    return { ...list, url: presignedUrl };
  });
  return taskList;
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

// update all unannotated files
export const getUnannotatedFiles = async () => {
  try {
    const files = await prisma.files.findMany({
      where: {
        status: {
          equals: "unannotated",
        },
      },
    });
    const fileArray = await files.map((list) => {
      const key = list.audioname;
      const params = {
        Bucket: bucketName,
        Key: key,
        Expires: 3600,
      };
      const presignedUrl = s3.getSignedUrl("getObject", params);
      return { ...list, audioname: presignedUrl };
    });
    return fileArray;
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

// update all annotated files
export const getAnnotatedFiles = async () => {
  try {
    const files = await prisma.files.findMany({
      where: {
        status: {
          not: "unannotated",
        },
      },
    });
    const fileArray = await files.map((list) => {
      const key = list.audioname;
      const params = {
        Bucket: bucketName,
        Key: key,
        Expires: 3600,
      };
      const presignedUrl = s3.getSignedUrl("getObject", params);
      return { ...list, audioname: presignedUrl };
    });
    console.log("file array", fileArray);
    return fileArray;
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

// update the files
export const updateFiles = async (status, id, transcript) => {
  try {
    const updatedFile = await prisma.files.update({
      where: {
        id,
      },
      data: {
        status,
        transcript,
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
