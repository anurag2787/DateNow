import img from "../../assets/error404image.png";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#F8A199] p-6">
      <div className="w-full max-w-4xl m-6 flex flex-col md:flex-row items-center justify-center bg-[#FFE0D9] rounded-xl shadow-2xl overflow-hidden">
        <img src={img} alt="404 Error" className="w-48 md:w-64 lg:w-80 p-6 object-contain" />
        <div className="flex-1 md:pr-12 box-border flex flex-col items-center md:items-start text-center md:text-left p-6 md:p-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-600">
            404 — Page Not Found
          </h1>
          <h2 className="text-lg md:text-2xl text-[#010E23] mt-3 md:mt-4 font-semibold">
            We couldn’t find what you were looking for.
          </h2>
          <p className="text-sm md:text-md text-[#010E23] mt-3 max-w-xl">
            The page may have been moved, renamed, or might never have existed. Try returning to the home page or go back to the previous screen.
          </p>

          <div className="mt-5 flex gap-3">
            <button
              className="bg-rose-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-rose-500 transition ease-in-out duration-200"
              onClick={() => navigate('/')}
              aria-label="Go to Home"
            >
              Go Home
            </button>

            <button
              className="border border-rose-300 text-rose-700 bg-white px-4 py-2 rounded-lg hover:bg-rose-50 transition"
              onClick={() => navigate(-1)}
              aria-label="Go back to previous page"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;

