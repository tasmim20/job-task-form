import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";



const Home = () => {
    const [selections, setSelections] = useState([]);
    const { register, handleSubmit } = useForm();
 
            
    useEffect(() =>
    {
        axios.get("https://job-task-server-pearl.vercel.app/sectors")
        .then(res => setSelections(res.data))  
    } ,[])


  const onSubmit = (data) => {
   toast.success("Successfully Fill-up")
    console.log(data);
  };

 
  return (
    <div className="my-20">
      <div className="grid justify-center align-center">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name:</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              id="name"
              placeholder="Name"
              className="input border-info mb-3 input-bordered max-w-xs rounded-none"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Sectors:</span>
            </label>
             <select multiple id="sector" onChange={onchange}
              {...register("sectors", { required: true })}
              className="select select-info w-full max-w-xs rounded-none"
            >
               {[...selections].map(selection => (
            <option key={selection._id} value={selection.value} options={selection.label}>
              
            </option>
          ))}
            </select> 
           

          </div>
          <div className="flex mt-3 ">
            <input id="termsAgreed"
              {...register("checked", { required: true })}
              type="checkbox"
              className="radio radio-primary"
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
