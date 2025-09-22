import { createContext, useContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

const OTPContext = createContext();

export const OTPProvider = ({ children }) => {
  const [isOTP, setIsOTP] = useState(false);
  const sendOTP = async(user,emailId)=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/verify`,{
                username:user,
                email:emailId,
            })
            console.log(response)
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
