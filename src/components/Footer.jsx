import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import img7 from '../assets/img7.jpeg'

const Footer = () => {
    const [email, setemail] = useState('')
    const submitHandler = () => {
       setemail('');
    }
    return (
        <div className='w-full h-[100vh] flex items-end justify-center '>
            <div className='block lg:relative w-4/3 h-2/3 bg-white/10 border border-white/20 p-4'>
                <div className=' hidden lg:absolute  lg:flex items-center justify-between top-0 left-[50%] -translate-x-[50%] -translate-y-[40%] w-3/4 h-3/4 bg-white/10 rounded-lg border border-white/20 px-8 py-6 backdrop-blur-lg'>
                    <article className='py-6 w-1/2 flex flex-col gap-6'>
                        <h1 className='text-4xl font-semibold '>Create Your First Masterpiece Now</h1>
                        <p className='text-sm text-white/40 '>Get started with our free plan and upgrade as you grow.</p>
                        <div>
                            <Link to='/' className='bg-white text-black px-6 py-2 rounded-full inline-block hover:bg-white/40' >Create Now</Link>
                        </div>
                    </article>
                    <div>
                        <div className='w-75 h-75 overflow-hidden shadow shadow-white/10 rounded-lg'>
                            <img src={img7} alt="" className='w-full h-full object-cover object-center rounded-lg' />
                        </div>
                    </div>
                </div>
                <div className='flex lg:justify-between justify-center gap-6 lg:flex-row flex-col lg:items-end h-full p-2'>
                    <div className='flex flex-col gap-2'>
                        <Link to='/' className='text-sm text-white/40 hover:text-white' >Pricing</Link>
                        <Link to='/' className='text-sm text-white/40 hover:text-white'>How it Works</Link>
                        <Link to='/' className='text-sm text-white/40 hover:text-white' >Faqs</Link>
                        <Link to='/' className='text-sm text-white/40 hover:text-white' >Contact Us</Link>
                        <div className='flex gap-2 mt-4'>
                            <h1 className='twxt-xl font-semibold '>GENX.</h1>
                            <p className='border-l border-white/20 px-4 text-sm text-white/40'>All Right Reserved</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 '>
                        <h1 className='text-2xl font-semibold'>GENX.</h1>
                        <label className='text-sm text-white/40'> Subscribe to our newsletter</label>
                        <div className='flex items-center gap-4'>
                            <input type="email" placeholder='Enter Your Email' className='px-4 py-2 rounded-full outline-none border border-white/20  placeholder:text-sm'
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            required
                            />
                            <button className='bg-white text-black px-6 py-2 rounded-full inline-block hover:bg-white/40' 
                            onClick={submitHandler}
                            >Submit</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer