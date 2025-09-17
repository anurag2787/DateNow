import React from 'react'
import img from '../../assets/abc.jpg';



export default function About() {
    return (
        <div className="py-16 bg-[#F8A199] mx-5 md:mx-52">
            <div className="container m-auto pl-6 pr-6 xl:pl-6 xl:pr-0 mb-7  text-black bg-white p-8 rounded-3xl">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:5/12 lg:w-5/12">
                        <img
                            src={img}
                            alt="image"
                            className='shadow-2xl rounded-2xl'
                        />
                    </div>
                    <div className="md:7/12 lg:w-6/12 text-center">
                        <h2 className="text-2xl text-black font-bold md:text-4xl">
                        Where meaningful connections turn into lasting relationships
                        </h2>
                        <p className="mt-6 text-black">
                        Love is a powerful bond that brings hearts together. It fills us with joy, warmth, and comfort even in life s challenges. True love endures, growing stronger with trust and understanding.
                        </p>
                        <p className="mt-4 text-black">
                        It’s a journey of vulnerability, but within it, we find strength and beauty that make every moment special.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}