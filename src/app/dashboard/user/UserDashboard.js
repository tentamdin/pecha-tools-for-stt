"use client";

import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import DashboardBtn from "@/components/DashboardBtn";
import AddUserModal from "./AddUserModal";
import { deleteUser } from "@/model/user";
import EditUserModal from "./EditUserModal";

const UserDashboard = ({ users, groups }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRemoveUser = async (user) => {
    const noTranscriberTask = user.transcriber_task?.length;
    const noReviewerTask = user.reviewer_task?.length;
    const noFinalReviewerTask = user.final_reviewer_task?.length;
    if (
      noTranscriberTask !== 0 ||
      noReviewerTask !== 0 ||
      noFinalReviewerTask !== 0
    ) {
      window.alert(`User ${user.name} has some uncomplete tasks!`);
    } else {
      const deletedUser = await deleteUser(user.id);
      console.log("deletedUser", deletedUser);
    }
  };

  const handleEditUser = async (userRow) => {
    const oneUser = await users.find((user) => user.id === userRow.id);
    setSelectedRow(oneUser);
    window.edit_modal.showModal();
  };

  return (
    <>
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
                  Group Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {user.id}
                  </th>
                  <td className="px-6 py-4">{user.group_id}</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => handleRemoveUser(user)}
                    >
                      Remove
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AddUserModal groups={groups} />
        <EditUserModal groups={groups} selectedRow={selectedRow} />
      </div>
    </>
  );
};

export default UserDashboard;
