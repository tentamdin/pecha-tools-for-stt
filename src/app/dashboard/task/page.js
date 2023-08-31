import React from "react";
import TaskDashbooard from "./TaskDashbooard";
import { getAllGroup } from "@/model/group";

const Task = async () => {
  const groups = await getAllGroup();

  return (
    <>
      <div className="h-screen mt-20">
        <TaskDashbooard groups={groups} />
      </div>
    </>
  );
};

export default Task;
