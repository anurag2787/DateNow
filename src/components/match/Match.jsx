import React, { useState, useEffect } from "react";
import img from "../../assets/match.png";
import profile from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";

function Match() {
  const [user, setUser] = useState(null); // Random user state
  const [click, setClick] = useState(false);
  const navigate = useNavigate(); // For navigation
  const [mname, msetName] = useState("");
  const [mgender, setGender] = useState("");
  const [mage, setAge] = useState("");
  const [mdob, setDob] = useState("");
  const [mlocation, setLocation] = useState("");

  // Fetch random user with error handling
  const fetchRandomUser = () => {
    fetch("https://randomuser.me/api/?results=1")
      .then((response) => response.json())
      .then((data) => setUser(data.results[0]))
      .catch((error) => console.error("Error fetching user:", error));
  };

  useEffect(() => {
    fetchRandomUser(); // Fetch random user on component mount
  }, []);

  // Local user data from localStorage
  const namevalue = localStorage.getItem("name");
  const agevalue = localStorage.getItem("age");
  const gendervalue = localStorage.getItem("gender");

  // Set gender preference for matching
  const preferredGender = gendervalue === "Male" ? "female" : "male";
  const localUserAge = parseInt(agevalue, 10); // Convert agevalue to integer

  // Fetch new random user if the gender or age doesn't match
  useEffect(() => {
    if (user) {
      if (user.gender !== preferredGender || user.dob.age > localUserAge + 10) {
        fetchRandomUser();
      } else {
        // setting button display value
        setClick(true);

        // Update state and local storage with user data
        const fullName = `${user.name.first} ${user.name.last}`;
        const age = user.dob.age;
        const dob = user.dob.date;
        const location = `${user.location.city}, ${user.location.state}, ${user.location.country}`;

        msetName(fullName);
        setAge(age);
        setDob(dob);
        setGender(user.gender);
        setLocation(location);

        // Store data in localStorage
        localStorage.setItem("mname", fullName);
        localStorage.setItem("mage", age);
        localStorage.setItem("mgender", user.gender);
        localStorage.setItem("mdob", dob);
        localStorage.setItem("mlocation", location);
      }
    }
  }, [user, preferredGender, localUserAge]);

  // Handle navigation on button click
  const press = () => {
    navigate("/chat");
  };

  // Loading state if user is not fetched yet
  if (!user) {
    return (
      <h1></h1>
    );
  }

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center my-11">
      <div className="bg-[#ffdad7] p-11 md:pt-12 pt-12 rounded-xl shadow-2xl mx-5 md:mx-0  h-full overflow-auto">
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold">Your Partner</h1>
        </div>
        <div className="text-black flex flex-col md:flex-row md:justify-between items-center mt-3">
          {/* Local User's Profile */}
          <div className="sm:rounded-lg md:shadow-2xl mt-12 md:mt-0 h-[100px] md:h-[300px] w-[300px] flex flex-col items-center justify-center">
            <img
              src={profile}
              alt="profile"
              className="rounded-full w-20 md:w-32 mb-4"
            />
            <h1 className="font-semibold text-xl md:text-2xl">{namevalue}</h1>
            <h2 className="font-medium text-base md:text-xl">
              Age: {agevalue}
            </h2>
            <h2 className="font-medium text-base md:text-xl">
              Gender: {gendervalue}
            </h2>
          </div>

          {/* Match Image */}
          <div className="my-0 md:my-0 w-52 h-48">
            <img
              src={img}
              alt="Match"
              className="w-h-60 h-60 object-cover rounded-full"
            />
          </div>

          {/* Random User's Profile */}
          <div className="sm:rounded-lg md:shadow-2xl mb-12 mt-12 md:mt-0 md:mb-0 h-[100px] md:h-[300px] w-[300px] flex flex-col items-center justify-center">
            <img
              src={user.picture.large}
              alt="profile"
              className="rounded-full w-20 md:w-32 mb-4"
            />
            <h1 className="font-semibold text-xl md:text-2xl">
              {user.name.first} {user.name.last}
            </h1>
            <h2 className="font-medium text-base md:text-lg">
              Age: {user.dob.age}
            </h2>
            <h2 className="font-medium text-base md:text-lg">
              Gender: {user.gender}
            </h2>
          </div>
        </div>

        {/* Chat Button */}
        <div className="flex justify-center">
          {click ? (
            <button
              type="submit"
              onClick={press}
              className="md:text-base md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold p-3 px-7 md:px-6 md:py-3 rounded-lg mt-8 hover:bg-orange-600 transition ease-in-out duration-300"
            >
              Chat
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Match;
