import React, { useState, useEffect } from "react";
import { User, Mail, Calendar, LogOut, Heart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { use } from "react";
import { toast } from 'react-toastify';

export default function DateNowProfile() {
  const [name, setName] = useState("Sarah Johnson");
  const [email, setEmail] = useState("sarah.johnson@email.com");
  const [joinDate, setJoinDate] = useState("15 Mar 2024");
  const [isLoading, setIsLoading] = useState(false);
  const [images,setImages]=useState("")
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if(!user){
      navigate("/login");
    }
  }, [navigate,user]);

  useEffect(() => { 
    if (user) { 
      const date = new Date(Number(user.metadata.createdAt)); 
      console.log(user); 
      const formatted = date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", }); 
      setName(user.displayName); 
      setEmail(user.email); 
      setJoinDate(formatted); 
      setImages(user.photoURL);
     } 
    }, [user]);
  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
        if (!confirmed) {
            return;
        }
        try {
            setIsLoading(true);
            await signOut(auth);
            setIsLoading(false);
            toast.info("👋 Logged out successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            })
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#F8A199]">
      
     

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row lg:space-x-12 space-y-8 lg:space-y-0">
          
          {/* Profile Image Section - Left Side */}
          <div className="lg:w-1/3">
            <div className="bg-[#ffdad7] rounded-3xl shadow-xl overflow-hidden border border-rose-100">
              
              {/* Profile Image Container */}
              <div className="aspect-[3/4] relative bg-gradient-to-br from-rose-100 via-pink-50 to-orange-50 flex items-center justify-center p-8">
                
                {/* Profile Avatar */}
                <div className="w-40 h-40 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                  <User className="w-20 h-20 text-white" />
                </div>

                {/* Online Status */}
                <div className="absolute top-6 right-6 flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Online</span>
                </div>
              </div>

              {/* Profile Name */}
              <div className="p-8 text-center bg-gradient-to-r from-rose-500 to-pink-500">
                <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
                <p className="text-rose-100">Welcome to DateNow</p>
              </div>
            </div>
          </div>

          {/* Profile Information - Right Side */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-xl border border-rose-100 overflow-hidden">
              
              {/* Header */}
              <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-rose-50 border-b border-rose-100">
                <h3 className="text-2xl font-bold text-gray-900">Profile Information</h3>
                <p className="text-gray-600 mt-1">Your account details</p>
              </div>

              {/* Profile Details */}
              <div className="p-8">
                <div className="space-y-6">
                  
                  {/* Name */}
                  <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-100">
                    <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium mb-1">Full Name</p>
                      <p className="text-xl font-semibold text-gray-900">{name}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium mb-1">Email Address</p>
                      <p className="text-xl font-semibold text-gray-900 break-all">{email}</p>
                    </div>
                  </div>

                  {/* Join Date */}
                  <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Calendar className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium mb-1">Member Since</p>
                      <p className="text-xl font-semibold text-gray-900">{joinDate}</p>
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <div className="mt-10">
                  <button 
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="text-lg">Signing Out...</span>
                      </>
                    ) : (
                      <>
                        <LogOut className="w-6 h-6" />
                        <span className="text-lg">Sign Out</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float-heart {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-15px) translateX(10px) rotate(5deg); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-30px) translateX(-5px) rotate(-3deg); 
            opacity: 0.4;
          }
          75% { 
            transform: translateY(-20px) translateX(15px) rotate(8deg); 
            opacity: 0.5;
          }
        }
        .animate-float-heart {
          animation: float-heart 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}