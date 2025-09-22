"use client"

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../auth"
import { useOTP } from "../../context/OTPContext"
import axios from "axios"

export default function OTPVerification({ username, email, password, redirectPath }) {
  const [otp,setOtp] = useState(new Array(6).fill(""))
  const [isResending, setIsResending] = useState(false)
  const inputsRef = useRef([])
  const navigate = useNavigate()
  const { setIsOTP,sendOTP } = useOTP()

  // Handle digit typing
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "") // allow digits only
    if (!value) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // move to next input
    if (index < 5) inputsRef.current[index + 1].focus()
  }

  // Handle backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus()
    }
  }

  // Handle paste of full OTP
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("Text").slice(0, 6).split("")
    setOtp(pasteData.concat(new Array(6 - pasteData.length).fill("")))
    inputsRef.current[Math.min(pasteData.length, 5)].focus()
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    try {
        sendOTP(username,email).then(()=>{
            toast.success("OTP resent successfully!")
            // Clear current OTP inputs
            setOtp(new Array(6).fill(""))
            // Focus on first input
            inputsRef.current[0].focus()
        })
      }
    catch (err) {
      console.error(err.message)
      toast.error(err.message || "Failed to resend OTP")
    } finally {
      setIsResending(false)
    }
  }

  // Verify OTP and create Firebase account
  const handleVerify = async () => {
    const enteredOtp = otp.join("")
    if (enteredOtp.length < 6) {
      toast.error("Enter complete OTP")
      return
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/verify/verify-otp`, {
        token: localStorage.getItem("validationToken"),
        otp: enteredOtp,
      })
      console.log(response.data) //testing purpose
      if (response.statusText != "OK") {
        throw new Error("Invalid OTP")
      }

      // If OTP is valid, create Firebase user
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, { displayName: username })

      toast.success("Account created successfully")
      setIsOTP(false) // exit OTP step
      navigate(redirectPath)
    } catch (err) {
      console.error(err.message)
      setIsOTP(false)
      toast.error(err.message || "OTP verification failed")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-8">
      <div className="bg-[#ffdad7] pt-12 pb-16 px-8 md:px-16 rounded-xl shadow-2xl mx-5 md:mx-0 max-w-md w-full">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="text-3xl font-mono font-bold text-black mb-2">
              Verify Your <span className="text-red-500 font-extrabold">Code</span>
            </h2>
            <p className="text-lg font-semibold text-red-500 max-w-sm">
              We've sent a 6-digit verification code to your email. Enter it below to complete your registration.
            </p>
          </div>

          <div className="flex gap-3 justify-center" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-12 h-12 text-center border-2 border-red-200 rounded-lg bg-white text-black text-xl font-bold focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 transition-all duration-200 shadow-sm hover:border-red-300"
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            className="w-full bg-orange-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition ease-in-out duration-300 shadow-lg text-lg"
          >
            Verify & Continue ❤️
          </button>

          <button
            onClick={handleResendOTP}
            disabled={isResending}
            className="w-full bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed transition ease-in-out duration-300 shadow-lg text-lg"
          >
            {isResending ? "Resending..." : "Resend Code 🔄"}
          </button>

          <p className="text-sm text-red-400 text-center font-medium">Almost there! Your perfect match awaits 💕</p>
        </div>
      </div>
    </div>
  )
}
