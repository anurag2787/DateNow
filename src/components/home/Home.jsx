import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import img from "../../assets/img1.svg";
import { useNavigate } from "react-router-dom";

function Home() {
  const [text] = useTypewriter({
    words: [
      "Love",
      "Partner",
      "Wife",
      "Friends",
      "Companion",
      "Soulmate",
      "Connection",
      "Romance",
      "Happiness",
      "Chemistry",
      "Bond",
      "Trust",
      "Support",
    ],
    loop: {},
    typeSpeed: 200,
    deleteSpeed: 80,
  });

  const navigate = useNavigate();
  const press = () => {
    navigate("/details"); // Navigate to the /details route
  };

  return (
    <div className="flex items-center justify-center my-32">
      <div className="bg-[#ffdad7] md:pt-24 pt-8 rounded-xl shadow-2xl flex flex-col md:flex-row px-10 items-center mx-5 md:mx-0">
        {/* Left side (Text) */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-mono font-bold text-black text-center md:text-left">
            Find Your <br className="md:hidden" />
            <span className="text-red-500 font-extrabold mx-0">{text}</span>
            <span className="text-green-800">
              <Cursor cursorStyle="❤️" />
            </span>
          </h1>
          <h3 className="text-xl md:text-xl mt-4 max-w-lg font-semibold text-red-500 text-center md:text-left">
            Where hearts meet and relationships blossom.
            <br /> Connect with someone special and create lasting memories.
          </h3>
          <button
            type="submit"
            onClick={press}
            className="md:w-32 bg-orange-700 text-white font-bold p-3 px-3 md:px-6 md:py-3 mb-8 rounded-lg mt-8 ml-auto hover:bg-orange-600 transition ease-in-out duration-300"
          >
            Find Here
          </button>
        </div>

        {/* Right side (Image) */}
        <div className="hidden md:block ml-8">
          <img src={img} alt="SVG Graphic" className="w-[320px] h-[320px]" />
        </div>
      </div>
    </div>
  );
}

export default Home;
