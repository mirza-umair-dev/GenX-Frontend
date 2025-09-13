import React from 'react'
import PricingCard from '../components/Cards/PricingCard'
import Navbar from '../components/Navbar'

const BuyCredits = () => {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <Navbar />
     <div>
      <article>
        <h1 className='text-3xl font-bold text-center'>Out of Credits</h1>
        <p className='text-center'>You have run out of credits.I am sorry for Inconvenience.These Cards are Demo cards.Please come from another email for further generations.
          I am working on it.
        </p>
      </article>
       <div className="w-1/2 max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8 h-[60vh]">
          <PricingCard plan='Basic' price={20} description='For personal use to create images and startups' credits='200 Credits' bgColor='bg-green-500' />
          <PricingCard plan='Advanced' price={50} description='For advanced users to create more complex images and Businesses' credits='500 Credits' bgColor='bg-blue-700' />
        </div>
     </div>
    </div>
  )
}

export default BuyCredits