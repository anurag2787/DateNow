import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import GIF from "../../assets/giphy.gif"

export default function Contact() {
  const form = useRef();
  const [messages, setMessages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    msg: ""
  });

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return "Full name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validateMessage = (msg) => {
    if (!msg.trim()) return "Message is required";
    if (msg.trim().length < 10) return "Message must be at least 10 characters";
    return "";
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field as user types (only after first submit attempt)
    if (isSubmitted && errors[name]) {
      const newErrors = { ...errors };

      // Validate in real-time after first submit
      let error = "";
      switch (name) {
        case "name":
          error = validateName(value);
          break;
        case "email":
          error = validateEmail(value);
          break;
        case "msg":
          error = validateMessage(value);
          break;
        default:
          break;
      }

      newErrors[name] = error;
      setErrors(newErrors);
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const msgError = validateMessage(formData.msg);

    const newErrors = {
      name: nameError,
      email: emailError,
      msg: msgError
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (nameError || emailError || msgError) {
      // Scroll to first error
      const firstErrorField = nameError ? 'name' : emailError ? 'email' : 'msg';
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    // Start loading state
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/sendemail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            displayName: formData.name,
            text: formData.msg
          }),
        }
      );

      // Check if the response is successful (status 200-299)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      // Only show success if server confirms
      setCheck(true);

      // Reset form on success
      setFormData({ name: "", email: "", msg: "" });
      setErrors({});
      setIsSubmitted(false);
    } catch (error) {
      console.error("Error sending message:", error);

      // Show user-friendly error message
      setErrors({
        submit: error.message || "Failed to send message. Please try again later."
      });
    } finally {
      // Stop loading state regardless of success or failure
      setIsLoading(false);
    }
  };
  const [check, setCheck] = useState(false);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".right", {
      x: 450,
      duration: 1,
      delay: 0,
      scale: 0,
    });
    tl.from(".collegen", {
      x: 200,
      duration: 0.7,
      scale: 0,
    })
    tl.from(".phn", {
      x: 200,
      duration: 0.7,
      scale: 0,
    })
    tl.from(".emailn", {
      x: 200,
      duration: 0.7,
      scale: 0,
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
            ref={form}
            onSubmit={sendEmail}
            className="right p-0 pt-6 md:p-6 flex flex-col justify-center"
          >
            {/* Name Field */}
            <div className="flex flex-col group">
              <label htmlFor="name" className="text-black font-semibold mb-2 text-sm flex items-center gap-1">
                <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={`w-100 py-3 px-4 rounded-lg bg-white text-black font-medium
                  transition-all duration-300 ease-in-out
                  ${errors.name
                    ? 'border-2 border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-100'
                    : 'border-2 border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100'
                  }
                  focus:outline-none 
                  hover:border-orange-400 hover:shadow-md
                  placeholder:text-gray-400`}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p
                  id="name-error"
                  className="text-red-600 text-sm mt-2 flex items-center gap-1.5 animate-fade-in font-semibold bg-red-50 p-2 rounded-md"
                  role="alert"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="flex flex-col mt-5 group">
              <label htmlFor="email" className="text-black font-semibold mb-2 text-sm flex items-center gap-1">
                <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className={`w-100 py-3 px-4 rounded-lg bg-white text-black font-medium
                  transition-all duration-300 ease-in-out
                  ${errors.email
                    ? 'border-2 border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-100'
                    : 'border-2 border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100'
                  }
                  focus:outline-none
                  hover:border-orange-400 hover:shadow-md
                  placeholder:text-gray-400`}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="text-red-600 text-sm mt-2 flex items-center gap-1.5 animate-fade-in font-semibold bg-red-50 p-2 rounded-md"
                  role="alert"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="flex flex-col mt-5 group">
              <label htmlFor="mg" className="text-black font-semibold mb-2 text-sm flex items-center gap-1">
                <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                Message <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  name="msg"
                  id="mg"
                  value={formData.msg}
                  onChange={handleInputChange}
                  placeholder="Tell us what you're thinking..."
                  rows="5"
                  className={`w-full py-3 px-4 rounded-lg bg-white text-black font-medium
                    transition-all duration-300 ease-in-out resize-none
                    ${errors.msg
                      ? 'border-2 border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-100'
                      : 'border-2 border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100'
                    }
                    focus:outline-none
                    hover:border-orange-400 hover:shadow-md
                    placeholder:text-gray-400`}
                  aria-invalid={errors.msg ? "true" : "false"}
                  aria-describedby={errors.msg ? "msg-error" : undefined}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400 font-medium">
                  {formData.msg.length} / 500
                </div>
              </div>
              {errors.msg && (
                <p
                  id="msg-error"
                  className="text-red-600 text-sm mt-2 flex items-center gap-1.5 animate-fade-in font-semibold bg-red-50 p-2 rounded-md"
                  role="alert"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.msg}
                </p>
              )}
            </div>

            {/* Submit Error Display */}
            {errors.submit && (
              <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg animate-fade-in">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold">Failed to send message</p>
                    <p className="text-sm">{errors.submit}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full md:w-auto md:ml-auto mt-6 bg-gradient-to-r from-orange-500 to-orange-600 
                hover:from-orange-600 hover:to-orange-700 
                text-white font-bold py-3.5 px-8 rounded-lg
                transition-all ease-in-out duration-300 
                shadow-lg hover:shadow-xl
                transform hover:scale-105 hover:-translate-y-0.5 active:scale-95
                focus:outline-none focus:ring-4 focus:ring-orange-300
                flex items-center justify-center gap-2 group
                ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
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
