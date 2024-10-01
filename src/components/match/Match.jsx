import React from 'react'
import img from './match.png'
import profile from './profile.png'
import { useNavigate } from 'react-router-dom'

function Match() {
    const navigate=useNavigate();
    const press = () => {
        navigate('/chat'); // Navigate to the /details route
    };
  return (
    <div className='h-screen w-full grid place-content-center mx-0 my-0'> 
        <div className=' bg-[#ffdad7] p-11 md:pt-12 pt-12 rounded-xl shadow-2xl mx-5 md:mx-0 max-h-[580px] overflow-auto'>
            <div className='flex justify-center'>
                <h1 className='text-3xl font-bold'>Your Partner</h1>
            </div>
            <div className='flex flex-col md:flex-row md:justify-between items-center mt-3'>
                <div className=' sm:rounded-lg md:shadow-2xl h-[300px] w-[300px] flex flex-col items-center justify-center '>
                    <img src={profile} alt='profile' className='rounded-full w-20 md:w-32' />
                    <h1 className='font-semibold text-xl md:text-2xl'>Anurag Yadav</h1>
                    <h2 className='font-medium text-base md:text-xl'>Age : 18</h2>
                    <h2 className='font-medium text-base md:text-xl'>Gender : Male</h2>
                </div>
                <div className='my-0 md:my-0 w-52'>
                    <img src={img} alt="Match" className='w-h-60 h-60 object-cover rounded-full'/>
                </div>
                <div className=' sm:rounded-lg md:shadow-2xl h-[300px] w-[300px] flex flex-col items-center justify-center'>
                    <img src={profile} alt='profile' className='rounded-full w-20 md:w-32' />
                    <h1 className='font-semibold text-xl md:text-2xl'>Shreya Yadav</h1>
                    <h2 className='font-medium text-base md:text-lg'>Age : 18</h2>
                    <h2 className='font-medium text-base md:text-lg'>Gender : Female</h2>
                </div>
            </div>
            <div className='flex justify-center'>
                <button
                        type="submit" onClick={press}
                        className="md:text-base md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold p-3  px-7 md:px-6 md:py-3 mb-8 rounded-lg mt-8 hover:bg-orange-600 transition ease-in-out duration-300"
                >
                    Chat
                </button>
            </div>
            
        </div>
    </div>
  )
}

export default Match
