"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const DepartmentCard = () => {
  let modal = useRef(null);
  let [departments, setDepartments] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    console.log(data);
    await fetch("https://hrm-server-hlrg.vercel.app/addDepartment", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          alert("Department added successfully");
          modal.current.close();
        }
      });
  };

  useEffect(() => {
    fetch("https://hrm-server-hlrg.vercel.app/departments")
      .then(res => res.json())
      .then(data => {
        setDepartments(data);
      });
  }, [departments]);

  return (
    <section className="container mx-auto">
      <h1 className="text-5xl font-semibold text-center my-4">Company List</h1>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-accent mx-auto block my-5"
        onClick={() => document.getElementById("my_modal_5").showModal()}>
        New Company
      </button>
      <dialog
        id="my_modal_5"
        ref={modal}
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Company</h3>
          <div className="py-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-3">
                <label htmlFor="">Name of the Company</label>
                <input
                  {...register("companyName")}
                  className="input input-bordered input-primary w-full max-w-xs"
                />
              </div>

              {/* include validation with required or other standard HTML validation rules */}
              <div className="my-3">
                <label htmlFor=""> Company details</label>
                <textarea
                  {...register("companyDetails", { required: true })}
                  className="textarea textarea-primary block w-full max-w-xs"
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
      <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
        {departments.map(item => (
          <div className="card w-96 bg-primary text-primary-content">
            <div className="card-body">
              <h2 className="card-title">{item.companyName}</h2>
              <p>{item.companyDetails}</p>
              <div className="card-actions justify-end">
                <button className="btn">
                  <Link href={`/dept/${item._id}`}>Details</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DepartmentCard;
