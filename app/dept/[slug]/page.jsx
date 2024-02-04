"use client";

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

    fetch(`https://hrm-server-hlrg.vercel.app/employees/${dept.departmentName}`)
      .then(res => res.json())
      .then(data => {
        setEmployees(data);
      });
  }, [dept]);

  return (
    <section className="container mx-auto">
      <h1 className="text-5xl font-semibold text-center my-4">
        {dept.departmentName}
      </h1>
      <p className="text-center">{dept.departmentDetails}</p>
      <button
        className="btn btn-accent mx-auto block my-5"
        onClick={() => document.getElementById("my_modal_1").showModal()}>
        Add Employee
      </button>
      <dialog
        id="my_modal_1"
        ref={modal}
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add people</h3>
          <div className="py-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-3">
                <label htmlFor="">Department</label>
                <input
                  {...register("department")}
                  className="input input-bordered block input-primary w-full max-w-xs"
                  value={dept.departmentName}
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
                <label htmlFor="">Name</label>
                <input
                  {...register("name", { required: true })}
                  className="input input-primary block w-full max-w-xs"
                />
              </div>
              <div className="my-3">
                <label htmlFor="">email</label>
                <input
                  {...register("email", { required: true })}
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
                <th>Department</th>
                <th>Designation</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {employees.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.department}</td>
                  <td>{item.designation}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
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
