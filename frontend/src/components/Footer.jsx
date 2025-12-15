import React from 'react'
import { assets } from '../assets/assets'
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-[#fafaf7] text-[#5C4033] pt-20 px-6 sm:px-12 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
        {/* Logo & Message */}
        <div>
          <img src={assets.logo} alt="Lederdorf Logo" className="w-36 mb-4" />
          <p className="text-sm leading-relaxed max-w-md text-justify">
            Every order means the world to us. We're here to bring you thoughtfully made styles you’ll love.
            Your support helps us grow, create, and keep dreaming bigger.
            <br /><br />
            <span className="italic">With gratitude,</span> <br />
            <strong>The Lederdorf Team</strong>
          </p>
        </div>

        {/* Company Navigation */}
        <div>
          <h4 className="text-xl font-semibold mb-5">COMPANY</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#b97111] transition cursor-pointer">Home</li>
            <li className="hover:text-[#b97111] transition cursor-pointer">About</li>
            <li className="hover:text-[#b97111] transition cursor-pointer">Delivery</li>
            <li className="hover:text-[#b97111] transition cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold mb-5">GET IN TOUCH</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#b97111]" />
              <span>+92 307 6258937</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#b97111]" />
              <span>leder.dorf@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-[#e2dcd5] pt-6 pb-4 text-center text-xs sm:text-sm text-[#7a5a3c]">
        © 2025 lederdorf.com — All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
