"use client";

import React, { useRef } from "react";
import { createGroup } from "@/model/group";

const AddTaskModal = () => {
  const ref = useRef(null);
  return (
    <>
      <dialog id="add_modal" className="modal">
        <form ref={ref} method="dialog" className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Create Group</h3>
            <button
              className="btn btn-sm btn-circle btn-ghost"
              onClick={() => {
                ref.current?.reset();
                window.add_modal.close();
              }}
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
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <button
            type="submit"
            formAction={async (formData) => {
              ref.current?.reset();
              console.log("formData", formData, formData.get("name"));
              const newGroup = await createGroup(formData);
              window.add_modal.close();
            }}
            className="btn my-4 py-1 px-6 normal-case bg-green-500 hover:bg-green-600 text-white"
          >
            Add
          </button>
        </form>
      </dialog>
    </>
  );
};

export default AddTaskModal;
