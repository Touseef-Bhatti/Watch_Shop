import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="relative w-full bg-[#f8fafc]">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px] lg:min-h-[640px]">
        <div className="flex flex-col justify-center px-8 md:px-16 py-12 text-[#0F172A]">
          <p className="text-sm font-medium text-[#D4AF37] tracking-wider mb-2">
            Swiss-inspired Craft
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight prata-regular">
            Precision In Every Second
          </h1>
          <p className="mt-4 text-base md:text-lg text-[#374151] max-w-md">
            Discover contemporary timepieces engineered for accuracy and designed for everyday elegance.
          </p>
          <Link to="/collection">
            <button className="mt-6 w-fit bg-[#0F172A] hover:bg-[#0b1220] text-white px-7 py-3 rounded-full transition-all duration-300 text-sm md:text-base font-semibold shadow-lg">
              Shop Watches
            </button>
          </Link>
        </div>
        <div className="relative">
          <img src={assets.hero_img} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
