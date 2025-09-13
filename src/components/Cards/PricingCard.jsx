import React from 'react'

const PricingCard = ({ plan, price, description, credits, bgColor }) => {
    return (
        <div className='bg-white/10 p-4 rounded-lg flex justify-between flex-col relative overflow-hidden border-2 border-transparent gap-2 backdrop-blur-2xl'>
            <div className={`w-50 h-50 rounded-full blur-3xl ${bgColor} absolute opacity-40 -top-14 -left-14 z-10`}></div>
            <div className='w-7 h-7 transparent backdrop-blur-2xl rounded'></div>
            <h3 className='text-2xl'>{plan} Plan</h3>
            <article className='flex'>
                <h1 className='text-4xl font-bold'>${price}</h1>
                <span className='mt-4 text-sm text-white/40'>/month</span>
            </article>
            <span className='text-white/40 '>{credits}</span>
            <p className='text-white/40 text-sm'>{description}</p>
            <button className={`px-6 mt-6 py-2 bg-white/5 border-white/20 border rounded-lg text-sm hover:bg-white hover:text-black  transition duration-500`}>Get Started</button>

        </div>
    )
}

export default PricingCard