"use client";
import React from "react";
import {
  BsCheckLg,
  BsXLg,
  BsSlashCircle,
  BsArrowReturnLeft,
  BsTrash,
} from "react-icons/bs";

const ActionButtons = ({ updateTaskAndIndex, index, tasks, transcript }) => {
  return (
    <>
      <div className="fixed bottom-0 flex gap-1 border shadow-sm p-2">
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium text-sm p-9"
          onClick={() =>
            updateTaskAndIndex(
              "submit",
              transcript,
              tasks[index]
            )
          }
        >
          <BsCheckLg width="5rem" />
          <p>Submit</p>
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium text-sm p-9"
          onClick={() =>
            updateTaskAndIndex(
              "reject",
              transcript,
              tasks[index]
            )
          }
        >
          <BsXLg />
          <p>Reject</p>
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-gray-400 hover:bg-gray-500 font-medium text-sm p-9"
          onClick={() =>
            updateTaskAndIndex(
              "trash",
              transcript,
              tasks[index]
            )
          }
        >
          <BsTrash />
          <p>Trash</p>
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-gray-400 hover:bg-gray-500 font-medium text-sm p-9"
          onClick={() =>
            updateTaskAndIndex(
              "save",
              transcript,
              tasks[index]
            )
          }
        >
          <BsArrowReturnLeft />
          <p>Save</p>
        </button>
      </div>
    </>
  );
};

export default ActionButtons;
