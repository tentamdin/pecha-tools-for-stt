import React from "react";
import ReportForm from "../ReportForm";
import { getAllGroup } from "@/model/group";

const GroupReport = async () => {
  const groups = await getAllGroup();
  return (
    <>
      <ReportForm options={groups} title="group_id" label="Groups" />
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
              {/* row 1 */}
              <tr>
                <td>Tenzin</td>
                <td>22</td>
                <td>10</td>
                <td>4</td>
                <td>50</td>
              </tr>
              {/* row 2 */}
              <tr>
                <td>Tashi</td>
                <td>12</td>
                <td>6</td>
                <td>5</td>
                <td>150</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default GroupReport;
