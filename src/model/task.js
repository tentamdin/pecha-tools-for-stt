"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

const fs = require("fs");
const csvParser = require("csv-parser");

export const getAllTask = async () => {
  try {
    const tasks = await prisma.task.findMany({});
    return tasks;
  } catch (error) {
    console.error("Error getting all the tasks:", error);
  }
};

export async function createTasksFromCSV(fileData, formData) {
  const groupId = formData.get("group_id");
  console.log("createTasksFromCSV called", "ID", groupId);
  const tasksCreated = await Promise.all(
    fileData.map(async (row) => {
      console.log("rows", row);
      // Extract data from the CSV row
      const inference_transcript = row.inference_transcript;
      const fileName = row.file_name;
      const url = row.url;

      // Create a new task in the database
      const task = await prisma.task.create({
        data: {
          group_id: parseInt(groupId),
          inference_transcript: inference_transcript,
          file_name: fileName,
          url: url,
        },
      });
      // Return the created task
      return task;
    })
  );
  revalidatePath("/dashboard/task");
  console.log("Tasks created successfully", tasksCreated);
}

// export async function createTasksFromCSV(formData) {
//   const groupId = formData.get("group_id");
//   const csvFile = formData.get("file_name");
//   const csvFilePath = "/Users/tenzintamdin/Desktop/test_csv.csv";

//   console.log(
//     "createTasksFromCSV called",
//     "ID",
//     groupId,
//     "file name:",
//     csvFilePath
//   );
//   const tasks = [];

//   fs.createReadStream(csvFilePath)
//     .pipe(csvParser())
//     .on("data", async (row) => {
//       console.log("rows", row);
//       // Extract data from the CSV row
//       const inference_transcript = row.inference_transcript;
//       const fileName = row.file_name;
//       const url = row.url;

//       // Create a new task in the database
//       const task = await prisma.task.create({
//         data: {
//           group_id: parseInt(groupId),
//           inference_transcript: inference_transcript,
//           file_name: fileName,
//           url: url,
//         },
//       });
//       tasks.push(task);
//     })
//     .on("end", async () => {
//       // Insert all tasks into the database
//       await prisma.$transaction(tasks);
//       console.log("Tasks created successfully");
//     });
// }
