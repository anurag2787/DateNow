import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // ✅ Helper functions for validation
  const isValidName = (name) => /^[A-Za-z ]+$/.test(name); // only letters & spaces
  const isValidPassword = (password) => password.length >= 6;

  const handleAuth = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setErrorMessage("");

    if (isLogin) {
      // LOGIN VALIDATION
      if (!email.trim() || !password.trim()) {
        setErrorMessage("Please fill in both Email and Password.");
        return;
      }
    } else {
      // SIGNUP VALIDATION
      if (!username.trim() || !email.trim() || !password.trim()) {
        setErrorMessage("All fields are required — Name, Email, and Password.");
        return;
      }

      if (!isValidName(username)) {
        setErrorMessage("Name can only contain letters and spaces.");
        return;
      }

      if (!isValidPassword(password)) {
        setErrorMessage("Password must be at least 6 characters long.");
        return;
      }
    }

    try {
      if (isLogin) {
        const response = await axios.post("http://localhost:5000/api/login", {
          email,
          password,
        });
        console.log("Login successful:", response.data);
        navigate("/dashboard");
      } else {
        const response = await axios.post("http://localhost:5000/api/signup", {
          username,
          email,
          password,
        });
        console.log("Signup successful:", response.data);
        setIsLogin(true);
        setSubmitted(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Invalid credentials or server error.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          {isLogin ? "Welcome Back 👋" : "Create Your Account 🎉"}
        </h2>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
              />
              {submitted && !username.trim() && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
              {submitted && username.trim() && !isValidName(username) && (
                <p className="text-red-500 text-sm mt-1">
                  Name can only contain letters and spaces
                </p>
              )}
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
            {submitted && !email.trim() && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
            {submitted && !password.trim() && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={
              isLogin
                ? !email.trim() || !password.trim()
                : !username.trim() || !email.trim() || !password.trim()
            }
            className={`w-full py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              (isLogin
                ? !email.trim() || !password.trim()
                : !username.trim() || !email.trim() || !password.trim())
                ? "bg-gray-400 cursor-not-allowed text-gray-700"
                : "bg-[#e71f1f] hover:bg-[#F8A199] text-white hover:text-black"
            }`}
          >
            {isLogin ? "Sign In" : "Create Account"}
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMessage("");
              setSubmitted(false);
            }}
            className="text-red-500 hover:text-red-700 font-semibold"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
