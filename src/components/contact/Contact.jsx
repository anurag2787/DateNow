import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import GIF from "../../assets/giphy.gif"

export default function Contact() {
  const form = useRef();
  const [messages, setMessages] = useState([]);

  const sendEmail = async (e) => {
    e.preventDefault();
    setCheck(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/sendemail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: form.current.email.value,
              displayName: form.current.name.value,
              text: form.current.msg.value
            }),
          }
        );
      } catch (error) {
        console.error("Error saving message:", error);
      }
    }





  const [check, setCheck] = useState(false);
  useGSAP(() => {
    const tl=gsap.timeline();
    
    tl.from(".right", {
      x: 450,
      duration: 1,
      delay: 0,
      scale:0,
    });
    tl.from(".collegen",{
      x:200,
      duration:0.7,
      scale:0,
    })
    tl.from(".phn",{
      x:200,
      duration:0.7,
      scale:0,
    })
    tl.from(".emailn",{
      x:200,
      duration:0.7,
      scale:0,
    })

    
  });

 

  return (
    <div className="flex justify-center bg-[#F8A199] sm:items-center sm:pt-0 md:mx-0 mx-5">
      {/* <div className=" mx-auto sm:px-6 lg:px-8"> */}
        {/* <div className="mt-8 overflow-hidden"> */}
          {/* <div className=" grid grid-cols-1 md:grid-cols-2 bg-[#ffdad7] p-8 rounded-lg"> */}
          {!check ? (
            <div className="grid grid-cols-1 md:grid-cols-2 bg-[#ffdad7] p-8 rounded-lg md:my-32 my-10">
              <div className="left p-0 md:p-6 mr-2  sm:rounded-lg md:shadow-xl">
                <h1 className="text-3xl sm:text-4xl text-black font-extrabold tracking-tight">
                  Get in touch:
                </h1>
                <p className="text-normal text-lg sm:text-xl font-medium text-black mt-2">
                  Fill in the form to start a conversation
                </p>

                <div className="collegen flex items-center mt-4 text-black p-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-black"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div className="ml-4 text-md tracking-wide font-semibold w-40">
                    IIIT Lucknow
                  </div>
                </div>

                <div className="phn flex items-center mt-4 p-0 text-black">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-black"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div className=" ml-4 text-md tracking-wide font-semibold w-40">
                    +91 90648xxxxx
                  </div>
                </div>

                <div className="emailn flex items-center mt-4 p-0 text-black">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-black"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div className=" ml-4 text-md tracking-wide font-semibold w-40">
                    anuragyadav2787@gmail.com
                  </div>
                </div>
              </div>

              <form
                // onSubmit={handleSubmit}
                ref={form} 
                onSubmit={sendEmail}
                className="right p-0 pt-6 md:p-6 flex flex-col justify-center"
              >
                <div className="flex flex-col">
                  <label for="name" className="hidden">
                    Full Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-black text-black font-semibold focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col mt-2">
                  <label for="email" className="hidden">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-black text-black font-semibold focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col mt-2">
                  <label for="mg" className="hidden">
                    Number
                  </label>
                  <textarea
                    type="text"
                    name="msg"
                    id="mg"
                    placeholder="Enter Your Message"
                    className="w-100 mt-2 py-3 px-3 h-20 rounded-lg bg-white border border-black text-black font-semibold focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-8 ml-auto hover:bg-orange-600 transition ease-in-out duration-300"
                >
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-[#ffdad7] p-8 rounded-lg ">
              <div className="flex flex-col items-center">
                <img
                  src={GIF}
                  alt="Loading"
                  className="m-4"
                />
                <h2 className="text-center text-xl text-black  font-bold">
                  Thank you for your message! We will get back to you soon.
                </h2>
                <h3 className="text-center text-base text-red-500  font-bold">
                  A Confirmation Email has been Sent To You!
                </h3>
              </div>
            </div>
          )}
        {/* </div> */}
      {/* </div> */}
    </div>
  );
}
