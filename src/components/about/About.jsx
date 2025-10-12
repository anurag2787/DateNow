import React from 'react'
import img from '../../assets/abc.jpg';



export default function About() {
    return (
        <div className="py-20 bg-[#F8A199] px-6 md:px-12 lg:px-28">
            <div className="max-w-6xl mx-auto bg-white/95 p-10 md:p-14 rounded-3xl shadow-xl">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
                    <div className="w-full lg:w-5/12 flex justify-center">
                        <img
                            src={img}
                            alt="Couple illustration"
                            className="w-[320px] sm:w-[360px] md:w-[420px] lg:w-[460px] rounded-2xl shadow-2xl object-cover"
                        />
                    </div>

                    <div className="w-full lg:w-7/12 text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                            Where meaningful connections become lasting relationships
                        </h2>

                        <p className="mt-6 text-gray-700 text-base sm:text-lg leading-relaxed">
                            At DateNow we believe great relationships start with honest
                            conversation and shared values. Our platform helps people meet
                            thoughtfully — matching on what matters so sparks can turn into
                            something real.
                        </p>

                        <p className="mt-4 text-gray-600 text-sm sm:text-base">
                            Whether you’re here for friendship, a serious partnership, or
                            simply to meet new people, we guide you with respect, privacy,
                            and a human-centered approach.
                        </p>

                        <div className="mt-6 flex justify-center lg:justify-start gap-3">
                            <button className="px-6 py-2 bg-[#F77A63] hover:bg-[#ef6b55] text-white rounded-full font-semibold shadow">
                                Get Started
                            </button>
                            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}