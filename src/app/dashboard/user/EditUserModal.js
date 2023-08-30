"use client";
import React, { useRef, useState, useEffect } from "react";
import { editUser } from "@/model/user";

const EditUserModal = ({ groups, selectedRow }) => {
  const [groupId, setGroupId] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const userGroupId = selectedRow?.group_id;
  const userRole = selectedRow?.role;

  const ref = useRef(null);

  useEffect(() => {
    let isMounted = true;
    if (selectedRow !== null) {
      setGroupId(userGroupId);
      setRole(userRole);
      setIsLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [selectedRow]);

  const roles = [
    {
      name: "Transcriber",
      title: "TRANSCRIBER",
    },
    {
      name: "Reviewer",
      title: "REVIEWER",
    },
    {
      name: "Final Reviewer",
      title: "FINAL_REVIEWER",
    },
  ];

  return (
    <>
      <dialog id="edit_modal" className="modal">
        {isLoading ? (
          <div className="flex min-h-screen flex-col justify-center items-center">
            <h1 className="font-bold text-3xl">loading...</h1>
          </div>
        ) : (
          <form ref={ref} method="dialog" className="modal-box w-4/5 max-w-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Edit User</h3>
              <button
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => {
                  ref.current?.reset();
                  window.edit_modal.close();
                }}
              >
                ✕
              </button>
            </div>
            <div className="form-control grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="id">
                  <span className="label-text text-base font-semibold ">
                    Id
                  </span>
                </label>
                <input
                  id="id"
                  type="text"
                  name="id"
                  disabled
                  required
                  className="input input-bordered w-full"
                  defaultValue={selectedRow?.id}
                />
              </div>
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
                  defaultValue={selectedRow?.name}
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
                  defaultValue={selectedRow?.email}
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
                  value={groupId}
                  onChange={(e) => setGroupId(e.target.value)}
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
                  <span className="label-text text-base font-semibold">
                    Role
                  </span>
                </label>
                <select
                  id="role"
                  name="role"
                  className="select select-bordered"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select role</option>
                  {roles.map((role) => (
                    <option key={role.title} value={role.title}>
                      {role.name}
                    </option>
                  ))}
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
                  const newUsesr = await editUser(selectedRow?.id, formData);
                  window.edit_modal.close();
              }}
              className="btn my-4 py-1 px-6 normal-case bg-green-500 hover:bg-green-600 text-white"
            >
              Add
            </button>
          </form>
        )}
      </dialog>
    </>
  );
};

export default EditUserModal;
