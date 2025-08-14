import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function Details() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "This field is required *";
    if (!age) newErrors.age = "This field is required *";
    else if (parseInt(age) <= 0) newErrors.age = "Please enter a valid age *";
    if (!gender) newErrors.gender = "This field is required *";

    return newErrors;
  };

  const pressed = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem("name", name);
      localStorage.setItem("age", age);
      localStorage.setItem("gender", gender);
      navigate("/match");
    }
  };

  // animating the ui of detials page
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".right", {
      x: 450,
      duration: 0.8,
      delay: 0,
      scale: 0,
    });
    tl.from(".collegen", {
      x: 200,
      duration: 0.6,
      scale: 0,
    });
    tl.from(".phn", {
      x: 200,
      duration: 0.6,
      scale: 0,
    });
    tl.from(".emailn", {
      x: 200,
      duration: 0.6,
      scale: 0,
    });
  });

  return (
    <div className="mt-0 w-full grid place-content-center">
      <div className="right bg-[#ffdad7] rounded-xl shadow-2xl flex flex-col px-5 mx-5 overflow-auto md:my-32 md:mx-0 max-w-full my-16">
        <div className="flex justify-center">
          <h1 className="collegen text-2xl md:text-3xl text-black font-mono mt-10 font-bold mb-2">
            Enter Your Details
          </h1>
        </div>
        <div>
          <form className="p-6 flex flex-col justify-center" onSubmit={pressed}>
            <div className="phn flex flex-col">
              <label htmlFor="name" className="hidden">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
                className={`w-100 md:w-[400px] mt-2 py-3 px-3 rounded-lg bg-white border text-black font-semibold focus:outline-none focus:ring-2 focus:ring-white-500 ${
                  errors.name ? "border-2 border-red-500 " : "border-black"
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">{errors.name}</span>
              )}
            </div>

            <div className="phn flex flex-col mt-2">
              <label htmlFor="age" className="hidden">
                Age
              </label>
              <input
                type="number"
                name="age"
                id="age"
                placeholder="Age"
                value={age}
                onChange={(e) => {
                  const val = e.target.value;
                  if (Number.isInteger(Number(val))) {
                    setAge(val);
                    setErrors((prev) => ({ ...prev, age: "" }));
                  }
                }}
                className={`w-100 mt-2 py-3 px-3 rounded-lg bg-white border text-black font-semibold focus:outline-none focus:ring-2 focus:ring-white-500 ${
                  errors.age ? "border-2 border-red-500" : "border-black"
                }`}
              />
              {errors.age && (
                <span className="text-red-500 text-sm mt-1">{errors.age}</span>
              )}
            </div>

            <div className="phn flex flex-col mt-2">
              <label htmlFor="gender" className="hidden">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setErrors((prev) => ({ ...prev, gender: "" }));
                }}
                className={`bg-white h-11 mt-2 w-150 border text-gray-400 font-semibold rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-white-500 ${
                  errors.gender ? "border-2 border-red-500" : "border-black"
                }`}
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.gender}
                </span>
              )}
            </div>

            <div className="emailn text-end">
              <button
                type="submit"
                className=" md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-8 ml-auto hover:bg-orange-600 transition ease-in-out duration-300"
              >
                Find
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Details;
