import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <section className="bg-[#f8fafc] text-[#0F172A]">
      {/* Title Section */}
      <div className="text-2xl text-center pt-10">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* About Content */}
      <div className="my-12 px-6 sm:px-10 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-[450px] rounded-md shadow-md" src={assets.about_img} alt="About" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4">
          <p className="leading-relaxed">
            At <strong>Lederdorf</strong>, we design contemporary watches that blend precise engineering with refined aesthetics. Every piece is crafted to be reliable, versatile, and timeless.
          </p>
          <p className="leading-relaxed">
            Our collections focus on quality materials, clean silhouettes, and everyday comfort. Whether for work or weekend, our timepieces are built to perform.
          </p>
          <h3 className="text-lg font-semibold text-[#D4AF37]">Our Promise</h3>
          <p className="leading-relaxed">
            We stand behind every watch with attentive service and a commitment to craftsmanship—so you can wear yours with confidence.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-2xl py-4 text-center">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 sm:px-10 mb-16">
        {[
          { title: 'Reliable Movements', desc: 'Accurate timekeeping powered by trusted mechanisms' },
          { title: 'Premium Materials', desc: 'Stainless steel, sapphire options, and durable straps' },
          { title: 'Elevated Service', desc: 'Sizing, care, and warranty support made simple' }
        ].map((item, index) => (
          <div key={index} className="bg-white border border-[#e5e7eb] rounded-lg shadow-sm px-8 py-10 hover:shadow-md transition duration-300">
            <h4 className="font-semibold mb-3 text-[#0F172A] text-base">{item.title}</h4>
            <p className="text-sm text-[#0F172A] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <NewsletterBox />
    </section>
  )
}

export default About
