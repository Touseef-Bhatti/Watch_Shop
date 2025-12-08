import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <section className="bg-[#f8fafc] text-[#0F172A]">
      <div className="text-center text-2xl pt-10">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className="my-12 px-6 sm:px-12 flex flex-col md:flex-row items-center md:items-start gap-12 mb-20">
        <img className="w-full md:max-w-[480px] rounded-lg shadow-md" src={assets.contact_img} alt="Contact" />
        <div className="flex flex-col gap-5 md:w-1/2">
          <div>
            <h3 className="text-xl font-semibold mb-1 text-[#D4AF37]">Boutique</h3>
            <p className="leading-relaxed">
              52250 Satellite Town,
              <br /> Main Block, Gujranwala
            </p>
          </div>
          <div>
            <p className="leading-relaxed">
              Tel: (92) 307-6258937
              <br /> Email: lederdorf@gmail.com
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1 text-[#D4AF37]">Service & Careers</h3>
            <p className="leading-relaxed">For repairs, sizing, and roles—reach us anytime.</p>
          </div>
          <button className="w-fit border border-[#0F172A] text-sm px-8 py-3 rounded-full hover:bg-[#0F172A] hover:text-white transition-all duration-300">
            Get In Touch
          </button>
        </div>
      </div>
      <NewsletterBox />
    </section>
  )
}

export default Contact
