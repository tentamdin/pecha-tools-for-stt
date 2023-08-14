"use server";

import prisma from "@/lib/db";
import { s3, bucketName } from "@/lib/aws";
import { NextResponse } from "next/server";

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
      console.log("params", params);
      const presignedUrl = s3.getSignedUrl("getObject", params);
      return { ...list, audioname: presignedUrl };
    });
    console.log("file array", fileArray);
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
      console.log("params", params);
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
