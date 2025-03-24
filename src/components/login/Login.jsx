import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-full flex items-center justify-center mx-0 my-0 py-8">
      <div className="bg-[#ffdad7] p-8 md:p-12 rounded-xl shadow-2xl mx-5 md:mx-0 flex flex-col justify-between max-w-md w-full">
        <div className="overflow-y-auto mb-4">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-center mb-8">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            
            {/* Google Sign In Button */}
            <button className="flex items-center justify-center gap-2 w-full bg-white text-gray-700 py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
            
            <div className="flex items-center justify-center gap-2">
              <div className="h-px bg-gray-300 flex-1"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>
            
            <form className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
              )}
              
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              
              {isLogin && (
                <div className="text-right">
                  <a href="#" className="text-sm text-pink-700 hover:text-pink-900">
                    Forgot Password?
                  </a>
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight size={18} />
              </button>
            </form>
            
            <div className="text-center mt-4">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={toggleForm}
                  className="text-pink-700 font-medium ml-1 hover:text-pink-900"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;