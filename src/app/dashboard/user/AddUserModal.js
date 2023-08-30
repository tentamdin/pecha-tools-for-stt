"use client";

import React, { useRef } from "react";
import { createGroup } from "@/model/group";
import { createUser } from "@/model/user";

const AddUserModal = ({ groups }) => {
  const ref = useRef(null);
  return (
    <>
      <dialog id="add_modal" className="modal">
        <form ref={ref} method="dialog" className="modal-box w-4/5 max-w-2xl">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Create User</h3>
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
          <div className="form-control grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="name">
                <span className="label-text text-base font-semibold ">
                  Name
                </span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="name"
                required
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label" htmlFor="email">
                <span className="label-text text-base font-semibold ">
                  Email
                </span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="email"
                required
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="group_id">
                <span className="label-text text-base font-semibold">
                  Group
                </span>
              </label>
              <select
                id="group_id"
                name="group_id"
                className="select select-bordered overflow-y-scroll"
                required
              >
                <option value="">Select group</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="role">
                <span className="label-text text-base font-semibold">Role</span>
              </label>
              <select
                id="role"
                name="role"
                className="select select-bordered"
                required
              >
                <option value="">Select role</option>
                <option key="transcriber" value="TRANSCRIBER">
                  Transcriber
                </option>
                <option key="reviewer" value="REVIEWER">
                  Reviewer
                </option>
                <option key="final_reviewer" value="FINAL_REVIEWER">
                  Final reviewer
                </option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            formAction={async (formData) => {
              ref.current?.reset();
              console.log(
                "formData",
                formData.get("email"),
                formData.get("name"),
                formData.get("group_id"),
                formData.get("role")
              );
              const newUsesr = await createUser(formData);
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

export default AddUserModal;
