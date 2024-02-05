"use client";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  let [employee, setEmployee] = useState([]);

  useEffect(() => {
    fetch(`https://hrm-server-hlrg.vercel.app/candidates/${params.slug}`)
      .then(res => res.json())
      .then(data => {
        setEmployee(data);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-5xl font-semibold my-5 ">
        Employee List of {employee[0]?.company}
      </h1>
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Company</th>
            <th>Designation</th>
            <th>Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {employee.map((item, index) => (
            <tr key={item._id}>
              <th>{index + 1}</th>
              <td>{item.company}</td>
              <td>{item.designation}</td>
              <td>{item.Name}</td>
              <td>{item.email}</td>
              <td>{item.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
