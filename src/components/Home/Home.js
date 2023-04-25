import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Home = () => {
  const [selections, setSelections] = useState([]);
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      sectors: [],
      checked: false,
    },
  });

  console.log(control);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData"));
    if (storedData) {
      // const { name, sectors, checked } = storedData;
      // control.setValue("name", name);
      // control.setValue("sectors", sectors);
      // control.setValue("checked", checked);
    }
  });

 
  useEffect(() => {
    axios
      .get("https://job-task-server-pearl.vercel.app/sectors")
      .then((res) => setSelections(res.data));
  }, []);

  const onSubmit = (data) => {
    const newData = {
      ...data,
    };

    console.log(newData);

    axios.post("https://job-task-server-pearl.vercel.app/selections", newData).then((res) => {
      if (res.data.success) {
        localStorage.setItem("formData", JSON.stringify(data));
        toast.success("Successfully Fill-up");
      } else {
        toast.error("Please fill out all required fields");
      }
    });
  };

  return (
    <div className="my-20 grid justify-center align-center text-black">
      <div className="card w-96 bg-base-100 shadow-2xl p-8 shadow-slate-600">
        <h2 className="font-bold my-4">
          Please enter your name and pick the Sectors you are currently involved
          in.
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Name:</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              id="name"
              placeholder="Name"
              className="input border-black mb-3 input-bordered  max-w-xs rounded-none"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Sectors:</span>
            </label>
            <select
              multiple
              id="sectors"
              {...register("sectors", { required: true })}
              className="select  w-full max-w-xs rounded-none  border-black text-black"
              required
            >
              {[...selections].map((selection) => (
                <option
                  key={selection._id}
                  value={selection.value}
                  label={selection.label}
                ></option>
              ))}
            </select>
          </div>
          <div className="flex mt-3 ">
            <input
              id="termsAgreed"
              {...register("checked", { required: true })}
              type="checkbox"
              className="radio
               radio-black border-black"
              required
            />
            <p className="ml-2">Accept terms & Conditions</p>
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-white bg-lime rounded-none hover:bg-black hover:text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
