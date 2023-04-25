import React from "react";
import { useForm } from "react-hook-form";

const sectors = [
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Construction materials', label: 'Construction materials'},
    { value: 'Food and Beverage', label: 'Food and Beverage'},
    { value: 'Electronics and optics', label: 'Electronics and optics'},
    { value: 'Bakery & Confectionery products', label: 'Bakery & Confectionery products'},
    { value: 'Fish Products', label: 'Fish Products'},
    { value: 'Meat Products', label: 'Meat Products'},
    { value: 'Other', label: 'Other'},
    { value: 'Furniture', label: 'Furniture'},
    { value: 'Bedroom', label: 'Bedroom'},
    { value: 'kitchen', label: 'kitchen'},
    { value: 'Living Room', label: 'Living Room'},
    { value: 'Office', label: 'Office'},
    { value: 'Other(Furniture)', label: 'Other(Furniture)'},
    { value: 'Machinery', label: 'Machinery'},
    { value: 'Machinery components', label: 'Machinery components'},
    { value: 'Maritime', label: 'Maritime'},
    { value: 'Aluminium and steel', label: 'Aluminium and steel'},
    { value: 'Boat building', label: 'Boat building'},
    { value: 'other', label: 'other'},
    { value: 'Plastic and Rubber', label: 'Plastic and Rubber'},
    { value: 'Packaging', label: 'Packaging'},
    { value: 'Plastic goods', label: 'Plastic goods'},
    { value: 'Blowing', label: 'Blowing'},
    { value: 'Moulding', label: 'Moulding'},
    { value: 'others', label: 'others'},
    { value: 'Printing', label: 'Printing'},
    { value: 'Advertising', label: 'Advertising'},
    { value: 'copying', label: 'copying'},
    { value: 'Advertising', label: 'Advertising'},
    { value: 'other', label: 'other'},
  ];

const Home = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="my-20">
      <div className="grid justify-center align-center">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Name"
              className="input border-info mb-3 input-bordered max-w-xs rounded-none"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Sectors</span>
            </label>
            <select multiple
              {...register("sectors", { required: true })}
              className="select select-info w-full max-w-xs rounded-none"
            >
               {sectors.map(sector => (
            <option key={sector.value} value={sector.value}>
              {sector.label}
            </option>
          ))}
            </select>
          </div>
          <div className="flex mt-3 ">
            <input
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
