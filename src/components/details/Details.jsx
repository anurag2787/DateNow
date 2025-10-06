import { useState } from "react";
import { Heart, Users, MessageCircle, Sparkles, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Details() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName||"");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [preferredGender, setPreferredGender] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "This field is required *";
    if (!age) newErrors.age = "This field is required *";
    else if (parseInt(age) <= 0) newErrors.age = "Please enter a valid age *";
    if (!gender) newErrors.gender = "This field is required *";
    if (!preferredGender) newErrors.gender = "This field is required *";

    return newErrors;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Simulate form submission
      setTimeout(() => {
        // In a real app, this would navigate to /match
        localStorage.setItem("name", name);
        localStorage.setItem("age", age);
        localStorage.setItem("gender", gender);
        localStorage.setItem("preferredGender", preferredGender);
        setIsSubmitting(false);
        navigate("/match");
      }, 3000);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8A199] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          
          {/* Left Side - Illustration/Icons */}
          <div className="lg:w-1/2 bg-[#ffdad7] flex flex-col items-center justify-center p-8 lg:p-12 relative">
            {/* Decorative elements */}
            <div className="absolute top-8 left-8 opacity-20">
              <Heart className="w-8 h-8 text-pink-600" fill="currentColor" />
            </div>
            <div className="absolute top-8 right-8 opacity-20">
              <Star className="w-6 h-6 text-pink-600" fill="currentColor" />
            </div>
            <div className="absolute bottom-8 left-8 opacity-20">
              <Sparkles className="w-7 h-7 text-pink-600" />
            </div>
            <div className="absolute bottom-8 right-8 opacity-20">
              <MessageCircle className="w-6 h-6 text-pink-600" />
            </div>

            {/* Main illustration area */}
            <div className="text-center space-y-8">
              <div className="relative">
                {/* Large heart in center */}
                <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-red-400 rounded-full flex items-center justify-center shadow-lg mb-6">
                  <Heart className="w-16 h-16 text-white" fill="white" />
                </div>
                
                {/* Floating hearts around */}
                <div className="absolute -top-4 -left-4 animate-bounce">
                  <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
                </div>
                <div className="absolute -top-2 -right-6 animate-pulse">
                  <Heart className="w-4 h-4 text-red-400" fill="currentColor" />
                </div>
                <div className="absolute -bottom-2 -left-6 animate-bounce delay-300">
                  <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">Find Your Soulmate</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Connect with amazing people and discover meaningful relationships that last a lifetime.
                </p>
                
                {/* Features */}
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center mb-3 mx-auto shadow-sm">
                      <Sparkles className="w-6 h-6 text-pink-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">Instant Match</p>
                    <p className="text-xs text-gray-500 mt-1">No waiting around</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center mb-3 mx-auto shadow-sm">
                      <MessageCircle className="w-6 h-6 text-blue-500" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">Fun Conversations</p>
                    <p className="text-xs text-gray-500 mt-1">Start chatting now</p>
                  </div>
                  <div className="text-center hidden md:block">
                    <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center mb-3 mx-auto shadow-sm">
                      <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">Easy & Simple</p>
                    <p className="text-xs text-gray-500 mt-1">Just enter details</p>
                  </div>
                  <div className="text-center hidden md:block">
                    <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center mb-3 mx-auto shadow-sm">
                      <Users className="w-6 h-6 text-purple-500" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">Random Matching</p>
                    <p className="text-xs text-gray-500 mt-1">Surprise connections</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          {/* Right Side - Form */}
          <div className="lg:w-1/2 bg-white p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Enter Your Details</h1>
                <p className="text-gray-600">Let's get to know you better</p>
              </div>

              <div className="space-y-2">
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((prev) => ({ ...prev, name: "" }));
                    }}
                    className={`w-full py-4 px-4 rounded-xl bg-gray-50 border-2 text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 ${
                      errors.name ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-pink-300"
                    }`}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm font-medium">{errors.name}</span>
                  )}
                </div>

                {/* Age Field */}
                <div className="space-y-2">
                  <label htmlFor="age" className="block text-sm font-semibold text-gray-700">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (Number.isInteger(Number(val)) || val === "") {
                        setAge(val);
                        setErrors((prev) => ({ ...prev, age: "" }));
                      }
                    }}
                    className={`w-full py-4 px-4 rounded-xl bg-gray-50 border-2 text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 ${
                      errors.age ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-pink-300"
                    }`}
                  />
                  {errors.age && (
                    <span className="text-red-500 text-sm font-medium">{errors.age}</span>
                  )}
                </div>

                {/* Gender Field */}
                <div className="space-y-2">
                  <label htmlFor="gender" className="block text-sm font-semibold text-gray-700">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      id="gender"
                      name="gender"
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                        setErrors((prev) => ({ ...prev, gender: "" }));
                      }}
                      className={`w-full py-4 px-4 rounded-xl bg-gray-50 border-2 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer ${
                        errors.gender ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-pink-300"
                      } ${!gender ? "text-gray-400" : "text-gray-900"}`}
                    >
                      <option value="" disabled>
                        Select your gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {errors.gender && (
                      <span className="text-red-500 text-sm font-medium mt-1 block">{errors.gender}</span>
                    )}
                  </div>
                </div>

                {/*prefered gender */}
                <div className="space-y-2">
                  <label htmlFor="preferredGender" className="block text-sm font-semibold text-gray-700">
                    Looking For
                  </label>
                  <div className="relative">
                    <select
                      id="preferredGender"
                      name="preferredGender"
                      value={preferredGender}
                      onChange={(e) => {
                        setPreferredGender(e.target.value);
                        setErrors((prev) => ({ ...prev, preferredGender: "" }));
                      }}
                      className={`w-full py-4 px-4 rounded-xl bg-gray-50 border-2 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer ${
                        errors.preferredGender ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-pink-300"
                      } ${!preferredGender ? "text-gray-400" : "text-gray-900"}`}
                    >
                      <option value="" disabled>
                        Select preferred gender 
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Any</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {errors.preferredGender && (
                      <span className="text-red-500 text-sm font-medium mt-1 block">{errors.preferredGender}</span>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg shadow-lg transition-all duration-300 transform ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                          Finding your match...
                        </>
                      ) : (
                        <>
                          Find My Match
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </div>
                  </button>
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm text-gray-500">
                    Ready to find your perfect match? 💕
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;