"use client";

import DashboardBtn from "@/components/DashboardBtn";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AddGroupModal from "./AddGroupModal";
import EditGroupModal from "./EditGroupModal";
import { deleteGroup } from "@/model/group";

const GroupDashboard = ({ groupList }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRemoveGroup = async (row) => {
    const noUser = row.users?.length;
    const noTask = row.tasks?.length;
    if (noUser !== 0 || noTask !== 0) {
      window.alert(
        `Group ${row.name} has ${noUser} users and ${noTask} tasks!`
      );
    } else {
      const deletedGroup = await deleteGroup(row.id);
      console.log("deletedGroup", deletedGroup);
    }
  };

  const handleEditGroup = async (row) => {
    const oneGroup = await groupList.find((group) => group.id === row.id);
    setSelectedRow(oneGroup);
    window.edit_modal.showModal();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-center items-center mt-10 space-y-5 space-x-0 sm:space-y-0 sm:space-x-10">
        <DashboardBtn
          label="Create"
          icon={<AiOutlinePlus />}
          onClick={() => window.add_modal.showModal()}
        />
      </div>
      <div className="flex justify-center items-center my-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-4/5">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Group name
                </th>
                <th scope="col" className="px-6 py-3">
                  No. Users
                </th>
                <th scope="col" className="px-6 py-3">
                  No. Tasks
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {groupList.map((row) => (
                <tr className="bg-white border-b" key={row.id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {row.id}
                  </th>
                  <td className="px-6 py-4">{row.name}</td>
                  <td className="px-6 py-4">{row.users?.length || 0}</td>
                  <td className="px-6 py-4">{row.tasks?.length || 0}</td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleEditGroup(row)}
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => handleRemoveGroup(row)}
                    >
                      Remove
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddGroupModal />
      <EditGroupModal selectedRow={selectedRow} />
    </div>
  );
};

export default GroupDashboard;
