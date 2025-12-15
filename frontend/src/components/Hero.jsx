import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'


const Hero = () => {
  return (
    <section className="relative w-full bg-[#fafaf7]">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px] lg:min-h-[600px]">

        {/* Left Content */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-12 text-[#5C4033]">
          <p className="text-sm font-medium text-[#b97111] tracking-wider mb-2">
            OUR BESTSELLERS
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight prata-regular">
            Latest Arrivals
          </h1>
          <p className="mt-4 text-justify text-base md:text-lg text-[#7c5d48] max-w-md">
            Discover timeless pieces that elevate your everyday style. Shop our freshest drops now.
          </p>

          <Link to ="/collection">
          <button className="mt-6 w-fit bg-[#5C4033] hover:bg-[#3c2a1c] text-white px-6 py-3 rounded-full transition-all duration-300 text-sm md:text-base font-semibold shadow-lg">
            Shop Now
          </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative">
          <img
            src={assets.hero_img}
            alt="Hero"
            className="w-full h-full object-cover"
          />

          {/* Optional Overlay (comment out if not needed) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
