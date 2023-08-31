"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getAllUser = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        transcriber_task: true,
        reviewer_task: true,
        final_reviewer_task: true,
      },
    });
    return users;
  } catch (error) {
    console.error("Error getting all the user:", error);
  }
};

export const createUser = async (formData) => {
  console.log("createuser called", formData);
  const name = formData.get("name");
  const email = formData.get("email");
  const groupId = formData.get("group_id");
  const role = formData.get("role");
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        group_id: parseInt(groupId),
        role,
      },
    });
    revalidatePath("/dashboard/user");
    return newUser;
  } catch (error) {
    console.log("Error adding a user", error);
    throw new Error(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/user");
    return user;
  } catch (error) {
    console.log("Error deleting a user", error);
    throw new Error(error);
  }
};

export const editUser = async (id, formData) => {
  console.log("createuser called", formData);
  const name = formData.get("name");
  const email = formData.get("email");
  const groupId = formData.get("group_id");
  const role = formData.get("role");
  try {
    const group = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        group_id: parseInt(groupId),
        role,
      },
    });
    revalidatePath("/dashboard/user");
    return group;
  } catch (error) {
    console.log("Error updating a user details", error);
    throw new Error(error);
  }
};
