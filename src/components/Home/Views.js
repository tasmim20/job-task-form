import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const Views = () => {
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    axios
      .get("https://job-task-server-pearl.vercel.app/selections")
      .then((res) => setSectors(res.data.result));
  }, []);

  return (
    <div className=" max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12 test-red">
      <div className="overflow-x-auto ">
        <table className="table  w-full">
          <thead className=" bg-gray-700">
            <tr className="text-2xl">
              <th></th>
              <th>Name</th>
              <th>Sectors</th>
              <th>Terms Agreed</th>
              <th>Edit </th>
            </tr>
          </thead>
          <tbody>
            {[...sectors].map((row) => (
              <tr className="bg-red" key={row._id}>
                <th></th>
                <td>{row.name}</td>
                <td>{row.sectors.join(",")}</td>
                <td>{row.checked ? "Yes" : "No"}</td>
                {/* <td><button className="btn bg-lime btn-outline btn-black border-black hover:bg-black hover:text-white rounded-none ">Edit</button></td>  */}
                <td>
                  <AiFillEdit className="text-black "></AiFillEdit>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Views;
