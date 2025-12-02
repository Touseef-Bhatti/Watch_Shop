import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <section className="bg-[#fafaf7] text-[#5C4033]">
      {/* Title Section */}
      <div className="text-2xl text-center pt-10 border-[#e2dcd5]">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* About Content */}
      <div className="my-12 px-6 sm:px-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[450px] rounded-md shadow-md"
          src={assets.about_img}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4">
          <p className="text-justify leading-relaxed">
            At <strong>Lederdorf</strong>, we are dedicated to providing high-quality products that meet the diverse needs of our customers. Our team is passionate about innovation, sustainability, and customer satisfaction.
          </p>
          <p className="text-justify leading-relaxed">
            Since our inception, we have focused on delivering exceptional value through a commitment to excellence and continuous improvement in every aspect of our business.
          </p>
          <h3 className="text-lg font-semibold text-[#b97111]">Our Mission</h3>
          <p className="text-justify leading-relaxed">
            Our mission is to empower our customers by offering reliable products and outstanding service that inspire trust and loyalty. We strive to create a positive impact on the community and environment through responsible business practices.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-2xl py-4 text-center">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 sm:px-10 mb-16">
        {[
          {
            title: 'Quality Assurance',
            desc:
              'We maintain rigorous quality control processes to ensure that every product exceeds industry standards and meets your expectations for durability and performance.'
          },
          {
            title: 'Convenience',
            desc:
              'Our user-friendly shopping experience and responsive customer support make it easy for you to find, order, and receive the products you need without hassle.'
          },
          {
            title: 'Exceptional Customer Service',
            desc:
              'We are committed to your satisfaction, offering personalized assistance and timely responses to ensure your shopping experience is seamless and enjoyable.'
          }
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white border border-[#e2dcd5] rounded-lg shadow-sm px-8 py-10 hover:shadow-md transition duration-300"
          >
            <h4 className="font-semibold mb-3 text-[#5C4033] text-base">
              {item.title}
            </h4>
            <p className="text-sm text-[#5C4033] text-justify leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <NewsletterBox />
    </section>
  )
}

export default About