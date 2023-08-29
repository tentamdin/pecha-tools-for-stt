import { getAllGroup } from "@/model/group";
import React from "react";
import GroupTable from "./GroupTable";

const Group = async () => {
  const groupList = await getAllGroup();

  return (
    <>
      <div className="h-screen mt-20">
        <GroupTable groupList={groupList} />
      </div>
    </>
  );
};

export default Group;
