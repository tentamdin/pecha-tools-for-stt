"use server";

import prisma from "@/lib/db";
import { s3, bucketName } from "@/lib/aws";
import { NextResponse } from "next/server";
// get all the files
// export const getFiles = async (param) => {
//   console.log("param", param);
//   const response = await fetch(`http://localhost:3000/api/${param}`, {
//     next: { revalidate: 60 },
//   });
//   if (!response.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   console.log("response is", response.json());
//   const data = await response.json();
//   // console.log("response in getFiles", data);
//   return data;
// };

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
