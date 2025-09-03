import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import image from "/Users/asimmaji/Desktop/DateNow/DateNow/src/assets/image.png";
import { useAuth } from "../../context/AuthContext";
import proimage from "/Users/asimmaji/Desktop/DateNow/DateNow/src/assets/proimage.png"
import { useTypewriter, Cursor } from "react-simple-typewriter";

export default function Profile() {
  const [name, setName] = useState("xyz");
  const [mail, setMail] = useState("xy@71");
  const [date, setDate] = useState("");
  const [images, setImages] = useState(proimage);
  const { user } = useAuth();
  const [Text]= useTypewriter({
    words: [
      `Welcome ${name}`,
      "User Profile"
    ],
    loop: 1,
    typeSpeed: 200,
    deleteSpeed: 80
  })

  useEffect(() => {
    if (user) {
      const date = new Date(Number(user.metadata.createdAt));
      const formatted = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      setName(user.displayName);
      setMail(user.email);
      setDate(formatted);
      setImages(proimage || user.photoURL);
    }
  }, [user]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#F8A199] overflow-hidden">
      <h1 className="absolute lg:top-[150px] lg:text-[30px] top-[20px] text-[20px] font-bold text-[#a52f4c] underline ">
        <span>{Text}</span>
      </h1>
      {/* Floating hearts (all visible, repositioned for small/large screens) */}

      {/* Top-left */}
      <motion.img
        src={image}
        alt=""
        initial={{ scale: 1 }}
        animate={{ scale: 1.25 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute lg:h-[60px] lg:top-[190px] lg:left-[70px] hidden lg:block z-[1]"
        style={{ rotate: "25deg" }} 
      />
      <motion.img
        src={image}
        alt=""
        initial={{ scale: 1 }}
        animate={{ scale: 1.25 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute lg:h-[32px] lg:top-[145px] lg:left-[70px] hidden lg:block  z-[1]"
        style={{ rotate: "20deg" }} 
      />
      <motion.img
        src={image}
        alt=""
        initial={{ scale: 1 }}
        animate={{ scale: 1.25 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute lg:h-[27px] lg:top-[190px] lg:left-[144px] hidden lg:block  z-[1]"
        style={{ rotate: "-10deg" }} 
      />
      <motion.img
        src={image}
        alt=""
        initial={{ scale: 1 }}
        animate={{ scale: 1.25 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute lg:h-[15px] lg:top-[170px] lg:left-[110px] hidden lg:block  z-[1]"
        // style={{ rotate: "-10deg" }} 
      />
      <motion.img
        src={image}
        alt=""
        initial={{ scale: 1 }}
        animate={{ scale: 1.25 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute lg:h-[15px] lg:top-[248px] lg:left-[110px] hidden lg:block  z-[1]"
        style={{ rotate: "-10deg" }} 
      />
      <motion.img
        src={image}
        alt=""
        initial={{ scale: 1 }}
        animate={{ scale: 1.25 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute lg:h-[15px] lg:top-[200px] lg:left-[50px] hidden lg:block  z-[1]"
        style={{ rotate: "-10deg" }} 
      />

      {/* Bottom-right */}
      <motion.img
        src={image}
        alt=""
        initial={{ scale: 1 }}
        animate={{ scale: 1.25 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute hidden lg:block z-[1] lg:h-[70px] lg:bottom-[180px] lg:right-[110px]"
        style={{
          rotate: "-30deg"
        }}
      />
      <motion.img
        src={image}
        alt=""
        initial={{ scale: 1 }}
        animate={{ scale: 1.25 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute hidden lg:block z-[1] lg:h-[40px] lg:bottom-[250px] lg:right-[150px]"
        // style={{
        //   rotate: "-30deg"
        // }}
      />
      <motion.img
        src={image}
        alt=""
        initial={{ scale: 1 }}
        animate={{ scale: 1.25 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute hidden lg:block z-[1] lg:h-[40px] lg:bottom-[250px] lg:right-[150px]"
        // style={{
        //   rotate: "-30deg"
        // }}
      />
      <motion.img
        src={image}
        alt=""
        initial={{ scale: 1 }}
        animate={{ scale: 1.25 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute hidden lg:block z-[1] lg:h-[40px] lg:bottom-[250px] lg:right-[150px]"
        // style={{
        //   rotate: "-30deg"
        // }}
      />
      <motion.img
        src={image}
        alt=""
        initial={{ scale: 1 }}
        animate={{ scale: 1.25 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute hidden lg:block z-[1] lg:h-[20px] lg:bottom-[260px] lg:right-[120px]"
        style={{
          rotate: "-30deg"
        }}
      />
      {/* Profile Card */}
      <motion.div
        className="bg-[#ffdad7] flex flex-col lg:flex-row md:p-[200px] rounded-[30px] z-[4] border border-[#a52f4c] w-[95%] max-w-5xl min-h-[400px] p-4 lg:p-0 shadow-lg"
        whileHover={{ scale: 1.02, boxShadow: "0px 8px 24px rgba(128, 0, 32, 0.5)" }}
        transition={{ duration: 0.25 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Left Panel */}
        <div className="flex items-center justify-center flex-col border-b lg:border-b-0 lg:border-r border-[#a52f4c] p-6 gap-6 flex-none">
          
            <img src={images} alt="" className="h-[150px] w-[225px] rounded-full"/>
          <div className="flex flex-col items-center text-center">
            <div className="text-base sm:text-lg font-semibold">{name}</div>
            <div className=" text-base sm:text-lg font-semibold">{mail}</div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-center p-4 sm:p-6 lg:p-10 flex-grow gap-6">
          <div className="flex flex-col gap-6 bg-[#ecc1be] p-4 sm:p-6 rounded-lg">
            <div className="text-xs sm:text-sm md:text-base font-bold text-[#a52f4c]">
              USER DETAILS
            </div>

            <motion.div
              whileHover={{ borderBottomWidth: "1px", borderColor: "#800020", backgroundColor: "#FADADD" }}
              className="text-sm sm:text-lg md:text-xl text-[#800020] p-2 flex justify-between rounded-md"
            >
              <span>Name</span> <span>{name}</span>
            </motion.div>

            <motion.div
              whileHover={{ borderBottomWidth: "1px", borderColor: "#800020", backgroundColor: "#FADADD" }}
              className="text-sm sm:text-lg md:text-xl text-[#800020] p-2 flex justify-between rounded-md"
            >
              <span>Email</span> <span>{mail}</span>
            </motion.div>

            <motion.div
              whileHover={{ borderBottomWidth: "1px", borderColor: "#800020", backgroundColor: "#FADADD" }}
              className="text-sm sm:text-lg md:text-xl text-[#800020] p-2 flex justify-between rounded-md"
            >
              <span>Date</span> <span>{date}</span>
            </motion.div>
          </div>

          <button className="px-4 py-2 bg-[#ff948b] text-white rounded-lg hover:bg-[#e75480] transition">
            Sign out
          </button>
        </div>
      </motion.div>
    </div>
  );
}
