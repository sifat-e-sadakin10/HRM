"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const page = ({ params }) => {
  console.log(params.slug);
  const [employee, setEmployee] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    let newData = {
      ...data,
      company: employee.company,
      designation: employee.designation,
      salary: employee.salary,
    };

    await fetch("https://hrm-server-hlrg.vercel.app/addCandidate", {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          alert("Employee added successfully");
        }
      });
  };
  useEffect(() => {
    fetch(`https://hrm-server-hlrg.vercel.app/employee/${params.slug}`)
      .then(res => res.json())
      .then(data => {
        setEmployee(data);
      });
  }, []);
  //   console.log(employee);
  return (
    <div>
      <h1 className="text-center my-5 font-semibold text-5xl">
        Add new employee as a {employee.designation} to {employee.company}
      </h1>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-3">
            <label htmlFor="">Company</label>
            <input
              className="input input-bordered block input-primary w-full max-w-xs"
              value={employee.company}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Designation</label>
            <input
              className="input input-bordered block input-primary w-full max-w-xs"
              value={employee.designation}
            />
          </div>

          {/* include validation with required or other standard HTML validation rules */}
          <div className="my-3">
            <label htmlFor="">Name</label>
            <input
              {...register("Name", { required: true })}
              className="input input-primary block w-full max-w-xs"
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Email</label>
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
    </div>
  );
};

export default page;
