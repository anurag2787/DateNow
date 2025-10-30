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

            {/* Divider */}
            <div className="mt-8 mb-6 border-t-2 border-black/10"></div>

            {/* Office Hours */}
            <div className="mt-2">
              <h3 className="text-lg font-bold text-black mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Office Hours
              </h3>
              <div className="space-y-2 text-sm text-black/80">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday:</span>
                  <span className="text-orange-600 font-semibold">Closed</span>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-black mb-3">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-black/10 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                  <svg className="w-5 h-5 text-black group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-black/10 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                  <svg className="w-5 h-5 text-black group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-black/10 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                  <svg className="w-5 h-5 text-black group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-black/10 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                  <svg className="w-5 h-5 text-black group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quote/Message Box */}
            <div className="mt-6 p-4 bg-orange-100/50 rounded-lg border-l-4 border-orange-500">
              <p className="text-sm text-black/80 italic">
                "We typically respond within 24 hours. Your message is important to us!"
              </p>
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
                className={`w-full py-3 px-4 rounded-lg bg-white text-black font-medium
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
                className={`w-full py-3 px-4 rounded-lg bg-white text-black font-medium
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
              <label htmlFor="msg" className="text-black font-semibold mb-2 text-sm flex items-center gap-1">
                <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                Message <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  name="msg"
                  id="msg"
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
