"use client";
import React from "react";
import {
  BsCheckLg,
  BsXLg,
  BsSlashCircle,
  BsArrowReturnLeft,
} from "react-icons/bs";

const ActionButtons = ({
  updateFileAndIndex,
  index,
  tasks,
  transcript,
}) => {
  return (
    <>
      <div className="fixed bottom-0 flex gap-1 border shadow-sm p-2">
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium text-sm p-9"
          onClick={() =>
            updateFileAndIndex(
              "submit",
              tasks[index]?.id,
              transcript
            )
          }
        >
          <BsCheckLg width="5rem" />
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium text-sm p-9"
          onClick={() =>
            updateFileAndIndex(
              "flag",
              tasks[index]?.id,
              transcript
            )
          }
        >
          <BsXLg />
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-gray-400 hover:bg-gray-500 font-medium text-sm p-9"
          onClick={() =>
            updateFileAndIndex(
              "ignore",
              tasks[index]?.id,
              transcript
            )
          }
        >
          <BsSlashCircle />
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-gray-400 hover:bg-gray-500 font-medium text-sm p-9"
        >
          <BsArrowReturnLeft />
        </button>
      </div>
    </>
  );
};

export default ActionButtons;
