import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { Eye, WandSparkles, Download } from 'lucide-react'
import WorkComponent from '../Testimonials/WorkComponent'
import img1 from '../../assets/ai images/img1.jpeg'
import img2 from '../../assets/ai images/img2.jpeg'
import img3 from '../../assets/ai images/img3.jpeg'
import img4 from '../../assets/ai images/img4.jpeg'
import img5 from '../../assets/ai images/img5.jpeg'
import img6 from '../../assets/ai images/img6.jpeg'
import PricingCard from '../Cards/PricingCard'
import Faqs from '../Faqs'
import ContactUs from '../ContactUs'
import Footer from '../Footer'
import Navbar from '../Navbar'

const PublicPage = () => {
  const [position, setposition] = useState({ x: 0, y: 0 })
  const images = [img1, img2, img3, img4, img5]

  useEffect(() => {
    const handleMouseMove = (e) => {
      setposition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Cursor Circle — desktop only & fixed to viewport */}
      <div
        className="hidden lg:block lg:fixed w-10 h-10 bg-transparent border-2 border-white rounded-full mix-blend-difference z-20 pointer-events-none transition duration-200"
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Hero / Home Page */}
      <section className="relative w-full min-h-[85vh] sm:min-h-screen flex flex-col items-center justify-center gap-3 px-4 text-center">
        {/* soft glow background */}
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[80vw] max-w-[800px] h-[240px] sm:h-[500px] bg-blue-600 opacity-5 rounded-full blur-3xl" />
        </div>

        <img src={logo} alt="Brand logo" className="w-36 sm:w-60 md:w-72 h-auto mt-6" loading="lazy" />
        <h1 className="text-2xl sm:text-4xl font-bold">Transform Text Into Art</h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl">
          Unlock a new dimension of visual content and bring your stories to life like never before
        </p>

        <Link
          to="/generate-img"
          className="px-5 sm:px-6 py-2 mt-3 bg-white/5 border border-white/20 rounded-full inline-flex items-center justify-center gap-2 hover:bg-white/10 transition duration-500 text-sm sm:text-base"
        >
          Generate <WandSparkles size={18} />
        </Link>

        {/* Images grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 mt-6">
          {images.map((src, index) => (
            <div key={index} className="w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-lg">
              <img
                src={src}
                alt={`gallery-${index + 1}`}
                className="object-cover w-full h-full object-center hover:scale-110 transition duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Page */}
      <section className="w-full py-16 sm:py-24 flex flex-col items-center gap-8 px-4">
        <div className="w-full relative h-[1px] bg-white/10">
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 py-1 border border-white/20 rounded-full text-white/60 text-xs sm:text-sm md:text-base">
            How It Works
          </h2>
        </div>

        <div className="w-full flex items-center justify-center">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h3 className="px-1 text-base sm:text-lg text-white/60">Transform Text into stunning Images</h3>
            <WorkComponent icon={<Eye />} title="Describe Your Vision" description="Type a phrase sentence or paragraph to describe what you want to create" />
            <WorkComponent icon={<WandSparkles />} title="Let The Magic Happen" description="Our AI will transform your text into High Quality, stunning Images in seconds" />
            <WorkComponent icon={<Download />} title="Download The Image" description="Instantly download your generated masterpiece in one click." />
          </div>
        </div>
      </section>

      {/* Create AI Images Page */}
      <section className="w-full py-16 sm:py-24 flex flex-col items-center gap-8 px-4">
        <div className="w-full relative h-[1px] bg-white/10">
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 py-1 border border-white/20 rounded-full text-white/60 text-xs sm:text-sm md:text-base">
            Create Ai Images
          </h2>
        </div>

        <h3 className="px-2 text-xl sm:text-3xl text-white/60 text-center">Turn Your Imagination into Visuals</h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full md:w-3/4 mt-6">
          <div className="w-full md:w-1/2 flex justify-center">
            <img src={img6} alt="AI generated example" className="object-cover w-full h-auto max-h-[320px] sm:max-h-[420px] rounded-lg" loading="lazy" />
          </div>
          <article className="w-full md:w-1/2 md:px-6">
            <h4 className="text-xl sm:text-3xl font-semibold">Introducing the AI Powered text to Image Generator</h4>
            <p className="text-white/40 mt-4 text-sm sm:text-base">
              Our AI powered text-to-image generator is a revolutionary tool that allows you to create stunning images from simple text descriptions. Whether you want to generate images for your business, personal project, or just for fun, our generator has got you covered.
            </p>
          </article>
        </div>
      </section>

      {/* Pricing Page */}
      <section className="w-full  flex flex-col items-center gap-8 px-4">
        <div className="w-full relative h-[1px] bg-white/10">
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 py-1 border border-white/20 rounded-full text-white/60 text-xs sm:text-sm md:text-base">
            Pricing Plans
          </h2>
        </div>

        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 h-[60vh]">
          <PricingCard plan='Free' price={0} description='For beginners to explore our program and start their journey' credits='5 Credits'  />
          <PricingCard plan='Basic' price={20} description='For personal use to create images and startups' credits='200 Credits' bgColor='bg-green-500' />
          <PricingCard plan='Advanced' price={50} description='For advanced users to create more complex images and Businesses' credits='500 Credits' bgColor='bg-blue-700' />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-24 px-4">
        <div className="w-full relative h-[1px] bg-white/10">
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 py-1 border border-white/20 rounded-full text-white/60 text-xs sm:text-sm md:text-base">
            Faqs
          </h2>
        </div>
        <Faqs />
      </section>

      {/* Contact Us */}
      <section className="py-16 sm:py-24 px-4">
        <div className="w-full relative h-[1px] bg-white/10">
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 py-1 border border-white/20 rounded-full text-white/60 text-xs sm:text-sm md:text-base">
            Contact Us
          </h2>
        </div>
        <div className='mt-10'>
          <ContactUs />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default PublicPage
