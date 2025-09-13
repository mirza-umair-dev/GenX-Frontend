import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import img6 from '../../assets/ai images/img6.jpeg'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import AppContext from '../../context/AppContext';

const SignUp = () => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const {setuser} = useContext(AppContext);
  const navigate = useNavigate();
  const [error, seterror] = useState(null);

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      seterror('Please fill out all fields');
      return;
    } else if (formData.password.length < 8) {
      seterror('Password must be at least 8 characters');
      return;
    } else {
      seterror(null);
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.SIGN_UP,{
        name:formData.name,
        email:formData.email,
        password:formData.password
      });
      
       console.log('User registered successfully');
        console.log(response.data);
        setuser(response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/verify');
        
      return response;
     
    }
    catch(error){
      seterror(error.response.data.message);
      console.log(error.response.data.message);
    }
    
    
    
  }

  return (
    <div className='w-full h-screen flex items-center justify-between p-4 lg:p-0 '>
      
    
      <div className='lg:w-1/2 w-full bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl grid lg:grid-cols-2 grid-cols-1 gap-4 lg:ml-8'>
        
       
        <div className='flex flex-col gap-4 pr-6'>
          <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600'>GENX.</h1>
          <article>
            <h3 className='text-white/70 text-xl font-semibold'>Create Account</h3>
            <p className='text-white/50 text-sm'>Sign up to unlock all premium features.</p>
          </article>
        </div>

        {/* Form */}
        <div className='flex flex-col gap-4 w-full'>
          <input
            type="text"
            placeholder='Enter your name'
            className='px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/40 outline-none hover:border-blue-400 focus:border-blue-400 transition'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder='Enter your email'
            className='px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/40 outline-none hover:border-blue-400 focus:border-blue-400 transition'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder='Enter a strong password'
            className='px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/40 outline-none hover:border-blue-400 focus:border-blue-400 transition'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />

         
          {error && <p className='text-red-400 text-sm mt-1'>* {error}</p>}

        
          <div className='flex items-center justify-between mt-6'>
           
              <Link to='/login' className='text-blue-400 hover:text-blue-500 transition'>
                Login
              </Link>
           
            <button
              onClick={handleSubmit}
              className='px-6 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-gradient-to-r hover:bg-blue-900 transition duration-300'
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

     
      <div className='w-1/3 hidden h-full lg:flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm shadow-inner gap-6 p-6'>
        <div className='w-72 h-72 rounded-xl overflow-hidden shadow-lg border border-white/10'>
          <img src={img6} alt="Illustration" className='w-full h-full object-cover' />
        </div>
        <div className='text-center'>
          <h1 className='text-2xl text-white/80 font-semibold'>You are one step away </h1>
          <p className='text-white/60 text-sm mt-2 max-w-sm'>
            Sign up today and explore all the tools to supercharge your workflow.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
