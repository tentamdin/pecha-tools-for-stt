"use client";

import DashboardBtn from "@/components/DashboardBtn";
import { createGroup, deleteGroup, getAllGroup } from "@/model/group";
import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineEdit } from "react-icons/ai";

const Group = () => {
  const [groupList, setGroupList] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const allGroup = await getAllGroup();
      if (allGroup?.length != 0) {
        console.log("inside", allGroup);
        setGroupList(allGroup);
      }
    }
    fetchData();
  }, []);

  const data = [
    { id: 1, name: "A", users: 5, tasks: 10 },
    { id: 2, name: "B" },
    { id: 3, name: "c" },
  ];

  const toggleSelectRow = (id) => {
    if (selectedRow === id) {
      setSelectedRow(null);
    } else {
      setSelectedRow(id);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const addGroup = async () => {
    console.log("name is", name);
    const newGroup = await createGroup(name);
    setGroupList((prev) => [...prev, newGroup]);
    console.log("New group created", newGroup);
  };

  const removeGroup = async (id) => {
    const deletedGroup = await deleteGroup(id);
    setGroupList((prev) => prev.filter((group) => group.id !== id));
    console.log("deletedGroup", deletedGroup);
  };

  return (
    <>
      <div className="h-screen mt-20">
        <div className="flex flex-col sm:flex-row justify-center items-center mt-10 space-y-5 space-x-0 sm:space-y-0 sm:space-x-10">
          <DashboardBtn
            label="Add"
            icon={<AiOutlinePlus />}
            onClick={() => window.add_modal.showModal()}
          />
          <DashboardBtn
            label="Delete"
            icon={<AiOutlineMinus />}
            onClick={deleteGroup}
          />
          <DashboardBtn label="Edit" icon={<AiOutlineEdit />} />
        </div>

        <div className="flex justify-center items-center my-10">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-4/5">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Select
                  </th>
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
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table"
                          type="checkbox"
                          checked={selectedRow === row.id}
                          onChange={() => toggleSelectRow(row.id)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                        />
                        <label htmlFor="checkbox-table" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
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
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => removeGroup(row.id)}
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

        <dialog id="add_modal" className="modal">
          <form method="dialog" className="modal-box" onSubmit={addGroup}>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Add Group</h3>
              <button
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => window.add_modal.close()}
              >
                ✕
              </button>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label" htmlFor="name">
                <span className="label-text text-base font-semibold ">
                  Group Name
                </span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="name"
                required
                value={name}
                onChange={handleNameChange}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <button
              type="submit"
              className="btn my-4 py-1 px-6 normal-case bg-green-500 hover:bg-green-600 text-white"
            >
              Add
            </button>
          </form>
        </dialog>
      </div>
    </>
  );
};

export default Group;
