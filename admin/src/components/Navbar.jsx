import React from 'react'
import { assets } from "../assets/assets"
import { Link } from 'react-router-dom'

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center py-2 px-4 sm:px-[4%] justify-between'>
      <Link to='/'>
        <img
          className='w-[max(15vw, 80px)] max-w-[150px] mt-2'
          src={assets.logo}
          alt="Logo"
        />
      </Link>
      <button
        onClick={() => setToken('')}
        className='bg-[#5C4033] text-white px-4 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm active:bg-[#b97111] cursor-pointer mt-2 whitespace-nowrap'
      >
        LOGOUT
      </button>
    </div>
  )
}

export default Navbar