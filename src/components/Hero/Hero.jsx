import React from "react";

import hero1 from "../../assets/landingpage.png"; // Adjust paths based on your folder structure
import hero2 from "../../assets/hero2.png";
import hero3 from "../../assets/hero3.png";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 bg-white">
      {/* Text Section */}
      <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
        <p className="text-sm font-medium text-gray-500 mb-5">WELCOME TO</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
          SajiloBihe Let’s Make Your <br /> Event Special!
        </h1>
        <p className="text-gray-600 mb-8 max-w-lg">
          Explore a variety of venues, check availability, and book with
          confidence.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700">
          Get Started
        </button>
      </div>

      {/* Image Section */}
      <div className="flex-1 md:grid hidden gap-8 grid-cols-1">
        {/* Hero-1 Image */}
        <div className="rounded-2xl overflow-hidden h-56"> {/* Increased height */}
          <img
            src={hero1} 
            alt="hero-1"
            className="w-full h-full object-cover scale-animation"
          />
        </div>

        {/* Hero-2 and Hero-3 Images */}
        <div className="grid grid-cols-2 gap-8 h-48">
          <div className="rounded-2xl overflow-hidden">
            <img
              src={hero2} 
              alt="hero-2"
              className="w-full h-full object-cover scale-animation"
            />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img
              src={hero3} 
              alt="hero-3"
              className="w-full h-full object-cover scale-animation"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;




