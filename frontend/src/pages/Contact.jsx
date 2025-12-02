import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <section className="bg-[#fafaf7] text-[#5C4033]">
      {/* Section Title */}
      <div className="text-center text-2xl pt-10 border-[#e2dcd5]">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Content */}
      <div className="my-12 px-6 sm:px-12 flex flex-col md:flex-row items-center md:items-start gap-12 mb-20">
        <img
          className="w-full md:max-w-[480px] rounded-lg shadow-md"
          src={assets.contact_img}
          alt="Contact"
        />

        <div className="flex flex-col gap-5 md:w-1/2">
          <div>
            <h3 className="text-xl font-semibold mb-1 text-[#b97111]">Our Store</h3>
            <p className="leading-relaxed">
              52250 Satellite Town, <br />
              Main Block, Gujranwala
            </p>
          </div>

          <div>
            <p className="leading-relaxed">
              Tel: (92) 307-6258937 <br />
              Email: lederdorf@gmail.com
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-1 text-[#b97111]">Careers at Lederdorf</h3>
            <p className="leading-relaxed">Learn more about our teams and job openings.</p>
          </div>

          <button className="w-fit border border-[#5C4033] text-sm px-8 py-3 rounded-full hover:bg-[#5C4033] hover:text-white transition-all duration-300">
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsletterBox />
    </section>
  )
}

export default Contact
