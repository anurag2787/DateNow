import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PasswordStrengthBar from "react-password-strength-bar";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  // getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  // updateProfile,
} from "firebase/auth";
import { auth } from "../../auth";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import OTPVerification from "../OTP/otp-verfication";
import { useOTP } from "../../context/OTPContext";
const provider = new GoogleAuthProvider();

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const {isOTP,setIsOTP,sendOTP} = useOTP()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectPath = params.get("redirect") || "/";

  useEffect(() => {
    console.log(redirectPath);
  }, []);

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(redirectPath); // Redirect if already logged in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  function validatePassword(password) {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()]/.test(password);

    const isValidLength = password.length >= minLength;

    return {
      isValid:
        isValidLength &&
        hasLetter &&
        hasNumber &&
        hasSpecialChar,
      feedback: {
        length: isValidLength,
        letter: hasLetter,
        number: hasNumber,
        specialChar: hasSpecialChar,
      },
    };
  }
  const { isValid, feedback } = validatePassword(password);

  const ValidIndicator = ({ val, text }) => {
    return (
      <li className="flex items-center gap-2 text-sm">
        {val ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <X className="w-4 h-4 text-red-500" />
        )}
        <span className={val ? "text-green-600" : "text-gray-600"}>{text}</span>
      </li>
    );
  };


  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("✅ Logged in successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate(redirectPath);
        setIsLogin(true);
      } else {
        if (isValid) {
          //Add OTP Verification here
          sendOTP(username,email).then(()=>{
            setIsOTP(true)
          })
/*           const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          user.displayName = username;

          // Update the user's profile with their full name
          await updateProfile(user, { displayName: username });
          toast.success("🎉 Registration successful!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate(redirectPath);
          setIsLogin(true); */
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      if (!isLogin && error.code === "auth/email-already-in-use") {
        setErrorMessage("An account with this email already exists. Please log in instead.");
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("✅ Logged in successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(redirectPath);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const toggleShowPassword = () =>{
    setShowPassword((showPassword)=>!showPassword)
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-transparent">
      {isOTP ? <OTPVerification username={username} email={email} password={password} redirectPath={redirectPath} /> : <div className="bg-[#ffdad7] p-8 md:p-12 rounded-xl shadow-2xl mx-5 md:mx-0 flex flex-col justify-between max-w-md w-full">
        <div className="overflow-y-auto mb-4">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-black">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            
            {/* Error message display */}
            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                {errorMessage}
              </div>
            )}

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-2 w-full bg-white text-gray-700 py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
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
              <span className="text-black font-semibold text-sm ">OR</span>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>

            <form className="space-y-4 text-black" onSubmit={handleAuth}>
              {!isLogin && (
                <div className="relative">
                  <User
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
              )}

              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  aria-controls="password"
                  title={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-3 text-gray-400 cursor-pointer hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-300 rounded"
                >
                  {!showPassword?(
                    <Eye aria-hidden="true" className="w-5 h-5"/>
                    ):(
                    <EyeOff aria-hidden="true" className="w-5 h-5"/>
                    )
                  }
                </button>
                
                {!isLogin && (
                  <>
                <PasswordStrengthBar password={password} />
                <div>
                  <ValidIndicator
                    val={feedback.letter}
                    text={"At least one alphabet letter (A–Z or a–z)"}
                  />
                  <ValidIndicator
                    val={feedback.number}
                    text={"At least one number (0–9)"}
                  />
                  <ValidIndicator
                    val={feedback.specialChar}
                    text={"At least one special character (e.g., !@#$%^&*)"}
                  />
                  <ValidIndicator
                    val={feedback.length}
                    text={"Minimum length of 8 characters"}
                  />
                </div>
                </>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r bg-[#e71f1f] hover:bg-[#F8A199] text-white hover:text-black py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight size={18} />
              </button>
            </form>
            <div className="text-center mt-4">
              <p className="text-gray-600">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
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
      </div>}
    </div>
  );
}

export default Login;
