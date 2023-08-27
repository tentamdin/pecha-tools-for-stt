import DashboardBtn from "@/components/DashboardBtn";
import React from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineEdit } from "react-icons/ai";

const Group = () => {
  return (
    <>
      <div className="h-screen mt-20">
        <div className="flex flex-col sm:flex-row justify-center items-center mt-10 space-y-5 space-x-0 sm:space-y-0 sm:space-x-10">
          <DashboardBtn label="Add" icon={<AiOutlinePlus />} />
          <DashboardBtn label="Delete" icon={<AiOutlineMinus />} />
          <DashboardBtn label="Edit" icon={<AiOutlineEdit />} />
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
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    1
                  </th>
                  <td className="px-6 py-4">A</td>
                  <td className="px-6 py-4">5</td>
                  <td className="px-6 py-4">10</td>
                </tr>
                <tr className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    2
                  </th>
                  <td className="px-6 py-4">B</td>
                  <td className="px-6 py-4">2</td>
                  <td className="px-6 py-4">0</td>
                </tr>
                <tr className="bg-white">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    3
                  </th>
                  <td className="px-6 py-4">C</td>
                  <td className="px-6 py-4">4</td>
                  <td className="px-6 py-4">20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Group;
