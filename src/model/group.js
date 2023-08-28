"use server";

import prisma from "@/lib/db";

export const getAllGroup = async () => {
  try {
    const allGroup = await prisma.group.findMany({
      include: {
        users: true,
        tasks: true
      }
    });
    return allGroup;
  } catch (error) {
    console.error("Error getting all group:", error);
  }
};

export const createGroup = async (name) => {
  try {
    const newGroup = await prisma.group.create({
      data: {
        name,
      },
    });
    return newGroup;
  } catch (error) {
    console.log("Error creating a group", error);
    throw new Error(error);
  }
};

export const deleteGroup = async (id) => {
  try {
    const group = await prisma.group.delete({
      where: {
        id,
      },
    });
    return group;
  } catch (error) {
    console.log("Error deleting a group", error);
    throw new Error(error);
  }
};

export const editGroup = async (id, name) => {
  try {
    const group = await prisma.group.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return group;
  } catch (error) {
    console.log("Error updating a group", error);
    throw new Error(error);
  }
};
