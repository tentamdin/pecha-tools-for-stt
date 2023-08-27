import React from "react";
import DashboardBtn from "@/components/DashboardBtn";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowDropdown } from "react-icons/io";
import DropdownBtn from "@/components/DropdownBtn";

const Task = () => {
  return (
    <>
      <div className="h-screen mt-20">
        <div className="flex flex-col sm:flex-row justify-center items-center mt-10 space-y-5 space-x-0 sm:space-y-0 sm:space-x-10">
          <DropdownBtn />
          <DashboardBtn label="Upload CSV" icon={<AiOutlinePlus />} />
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
                    State
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Inference
                  </th>
                  <th scope="col" className="px-6 py-3">
                    File Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Url
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
                  <td className="px-6 py-4">1</td>
                  <td className="px-6 py-4">imported</td>
                  <td className="px-6 py-4">hi</td>
                  <td className="px-6 py-4">file1</td>
                  <td className="px-6 py-4">url1</td>
                </tr>
                <tr className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    2
                  </th>
                  <td className="px-6 py-4">2</td>
                  <td className="px-6 py-4">imported</td>
                  <td className="px-6 py-4">0</td>
                  <td className="px-6 py-4">file2</td>
                  <td className="px-6 py-4">url2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
