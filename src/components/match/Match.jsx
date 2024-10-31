import React, { useState, useEffect } from 'react';
import img from './match.png';
import profile from './profile.png';
import { useNavigate } from 'react-router-dom';

function Match() {
    const [user, setUser] = useState(null); // Random user state
    const navigate = useNavigate(); // For navigation

    // Fetch random user with error handling
    const fetchRandomUser = () => {
        fetch('https://randomuser.me/api/?results=1')
            .then(response => response.json())
            .then(data => setUser(data.results[0]))
            .catch(error => console.error('Error fetching user:', error));
    };

    useEffect(() => {
        fetchRandomUser(); // Fetch random user on component mount
    }, []);

    // Local user data from localStorage
    const namevalue = localStorage.getItem('name');
    const agevalue = localStorage.getItem('age');
    const gendervalue = localStorage.getItem('gender');

    // Set gender preference for matching
    const preferredGender = gendervalue === 'Male' ? 'female' : 'male';
    const localUserAge = parseInt(agevalue, 10); // Convert agevalue to integer

    // Fetch new random user if the gender or age doesn't match
    useEffect(() => {
        if (user && (user.gender != preferredGender || user.dob.age > localUserAge + 10)) {
            fetchRandomUser();
        }
    }, [user]);
    
    

    // Handle navigation on button click
    const press = () => {
        navigate('/chat');
    };

    // Loading state if user is not fetched yet
    if (!user) {
        return (
            <div className="h-screen w-full grid place-content-center text-5xl md:text-8xl">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className='h-screen w-full md:grid place-content-center mx-0 my-0'>
            <div className='bg-[#ffdad7] md:p-11 md:pt-12 pt-12 rounded-xl shadow-2xl mx-5 md:mx-0 max-h-[580px] overflow-auto'>
                <div className='flex justify-center'>
                    <h1 className='text-3xl font-bold'>Your Partner</h1>
                </div>
                <div className='flex flex-col md:flex-row md:justify-between items-center mt-3'>
                    {/* Local User's Profile */}
                    <div className='sm:rounded-lg mt-14 md:shadow-2xl h-[100px] md:h-[300px] w-[300px] flex flex-col items-center justify-center'>
                        <img src={profile} alt='profile' className='rounded-full w-20 md:w-32' />
                        <h1 className='font-semibold text-xl md:text-2xl'>{namevalue}</h1>
                        <h2 className='font-medium text-base md:text-xl'>Age: {agevalue}</h2>
                        <h2 className='font-medium text-base md:text-xl'>Gender: {gendervalue}</h2>
                    </div>

                    {/* Match Image */}
                    <div className='my-0 md:my-0 w-52 md:h-48'>
                        <img src={img} alt="Match" className='w-h-60 h-60 object-cover rounded-full' />
                    </div>

                    {/* Random User's Profile */}
                    <div className='sm:rounded-lg md:shadow-2xl mb-14 h-[100px] md:h-[300px] w-[300px] flex flex-col items-center justify-center'>
                        <img src={user.picture.large} alt='profile' className='rounded-full w-20 md:w-32' />
                        <h1 className='font-semibold text-xl md:text-2xl'>{user.name.first} {user.name.last}</h1>
                        <h2 className='font-medium text-base md:text-lg'>Age: {user.dob.age}</h2>
                        <h2 className='font-medium text-base md:text-lg'>Gender: {user.gender}</h2>
                    </div>
                </div>

                {/* Chat Button */}
                <div className='flex justify-center'>
                    <button
                        type="button" onClick={press}
                        className="md:text-base md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold p-3 px-7 md:px-6 md:py-3 mb-8 rounded-lg mt-8 hover:bg-orange-600 transition ease-in-out duration-300"
                    >
                        Chat
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Match;
