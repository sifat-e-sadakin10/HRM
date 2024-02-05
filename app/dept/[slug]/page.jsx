"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const DepartmentDetails = ({ params }) => {
  let modal = useRef(null);
  let [dept, setDept] = useState([]);
  let [employees, setEmployees] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    console.log(data);
    await fetch("https://hrm-server-hlrg.vercel.app/employee", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          alert("Employee added successfully");
          modal.current.close();
        }
      });
  };
  useEffect(() => {
    fetch(`https://hrm-server-hlrg.vercel.app/department/${params.slug}`)
      .then(res => res.json())
      .then(data => {
        setDept(data);
      });

    fetch(`https://hrm-server-hlrg.vercel.app/employees/${dept.companyName}`)
      .then(res => res.json())
      .then(data => {
        setEmployees(data);
      });
  }, [dept]);

  return (
    <section className="container mx-auto">
      <h1 className="text-5xl font-semibold text-center my-4">
        {dept.companyName}
      </h1>
      <p className="text-center">{dept.companyDetails}</p>
      <div className="flex justify-center gap-6">
        {" "}
        <button
          className="btn btn-accent  block my-5"
          onClick={() => document.getElementById("my_modal_1").showModal()}>
          New Position
        </button>
        <button className="btn btn-accent  block my-5">
          <Link href={`/candidates/${dept.companyName}`}>Employee List</Link>
        </button>
      </div>
      <dialog
        id="my_modal_1"
        ref={modal}
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add people</h3>
          <div className="py-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-3">
                <label htmlFor="">Company</label>
                <input
                  {...register("company")}
                  className="input input-bordered block input-primary w-full max-w-xs"
                  value={dept.companyName}
                />
              </div>
              <div className="my-3">
                <label htmlFor="">Department</label>
                <input
                  className="input input-bordered block input-primary w-full max-w-xs"
                  {...register("department", { required: true })}
                />
              </div>
              <div className="my-3">
                <label htmlFor="">Designation</label>
                <input
                  {...register("designation")}
                  className="input input-bordered block input-primary w-full max-w-xs"
                />
              </div>

              {/* include validation with required or other standard HTML validation rules */}
              <div className="my-3">
                <label htmlFor="">Salary</label>
                <input
                  type="number"
                  {...register("salary", { required: true })}
                  className="input input-primary block w-full max-w-xs"
                />
              </div>

              {/* errors will return when field validation fails  */}
              {errors.exampleRequired && <span>This field is required</span>}

              <input className="btn block" type="submit" />
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn "> Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Company</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Salary</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {employees.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.company}</td>
                  <td>{item.department}</td>
                  <td>{item.designation}</td>
                  <td>{item.salary}</td>
                  <td>
                    <Link
                      className="btn-sm btn-ghost"
                      href={`/employee/${item._id}`}>
                      add
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default DepartmentDetails;
