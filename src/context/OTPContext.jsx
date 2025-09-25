import { createContext, useContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../auth";

const OTPContext = createContext();

export const OTPProvider = ({ children }) => {
  const [isOTP, setIsOTP] = useState(false);
  const sendOTP = async(user,emailId)=>{
        try {
            // Prevent sending OTP if email already registered in Firebase
            const normalizedEmail = (emailId || "").trim().toLowerCase()
            if (!normalizedEmail) {
                toast.error('Please provide a valid email')
                return
            }
            const methods = await fetchSignInMethodsForEmail(auth, normalizedEmail)
            if (methods && methods.length > 0) {
                toast.error('Account already exists. Please sign in instead.')
                return
            }
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/verify`,{
                username:user,
                email:emailId,
            })
            if(response.statusText === 'OK')
            {
                localStorage.setItem('validationToken',response?.data?.token)
                toast.success('OTP Sent to your Email')
            }
        } catch (error) {
            console.error(error.message)
            toast.error('Error Sending OTP')
        }
  }

  return (
    <OTPContext.Provider value={{ isOTP,setIsOTP,sendOTP }}>
      {children}
    </OTPContext.Provider>
  );
};

export const useOTP = () => {
  return useContext(OTPContext);
};
