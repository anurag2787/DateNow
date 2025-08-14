import img from "../../assets/error404image.png";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex items-center justify-center mx-0 bg-[#F8A199]">
      <div className="m-16 flex flex-col md:flex-row items-center justify-center bg-[#FFE0D9] rounded-lg shadow-lg overflow-hidden ">
        <img src={img} alt="404 Error" className="w-[200px] md:w-[300px]" />
        <div className="md:pr-12 box-border flex flex-col items-center md:items-start text-center md:text-left p-5 md:p-6">
          <h1 className="text-3xl md:text-5xl font-bold text-red-600 md:mt-4">
            {`404💔- Love Not Found `}
          </h1>
          <h2 className="text-lg md:text-2xl text-[#010E23] mt-3 md:mt-6">
            {`Oops, looks like the page ghosted you!`}
          </h2>
          <p className="text-sm md:text-md text-[#010E23] mt-2 ">
            {`Don't worry, it's not you. It's the URL. Let's get you back to where love lives.`}
          </p>
          <button
            className="md:w-32 bg-orange-700 text-white font-bold p-3 px-3 md:px-6 md:py-3 rounded-lg mt-3 md:mt-8  hover:bg-orange-600 transition ease-in-out duration-300"
            onClick={() => navigate("/")}
          >
            <p className="text-md md:text-lg">{`Go back`}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error404;