"use client";
import React, { useState } from "react";
import ReportForm from "../ReportForm";

const GroupReport = ({ groups }) => {
  const [users, setUsers] = useState([]);

  return (
    <>
      <ReportForm
        options={groups}
        setUsers={setUsers}
        title="group_id"
        label="Groups"
      />
      <div className="flex justify-center items-center mt-10">
        <div className="overflow-x-auto shadow-md sm:rounded-lg w-11/12 md:w-4/5 max-h-[80vh]">
          <table className="table  ">
            {/* head */}
            <thead className="text-gray-700 bg-gray-50">
              <tr>
                <th>Transcriber Name</th>
                <th>Task Submitted</th>
                <th>Task Reviewed</th>
                <th>Reviewed minutes</th>
                <th>Reviewed syllabus count</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.noSubmitted}</td>
                  <td>{user.noReviewed}</td>
                  <td>{user.reviewedMins}</td>
                  <td>{user.syllableCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default GroupReport;
