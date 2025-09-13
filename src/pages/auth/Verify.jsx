import React, { useRef, useState } from 'react'
import { BookKey,Info } from 'lucide-react';
import AppContext from '../../context/AppContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const [error, seterror] = useState(null);
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRef.current[index - 1].focus();
    }
  }


  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const otpArray = inputRef.current.map(e => e.value);
    const otp = otpArray.join('');

    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.verifyOtp, { otp });
      if (data.success) {
        navigate('/generate-img')
        console.log("success");
        seterror('')
      }else{
        seterror(data.message || "Invalid Otp");
        console.log(data.message);
      }
      
    } catch (error) {
      console.error(error);
      seterror(error.response?.data?.message || "Something went wrong, please try again.");
    }
    console.log(otp);
  }
  return (
    <div className='flex items-center justify-center h-screen flex-col gap-8'>
      <div className='p-5 bg-white/10 rounded-full border border-white/20'>
        {error ? (<Info size='60' className='text-red-500 animate-shake' />):(<BookKey size='60' className='text-blue-400' />)}
      </div>
      <div className='text-center'>
        <h1 className='text-3xl font-semibold text-white/80'>Verify OTP</h1>
        <p className='mt-2 text-sm text-white/40'>Enter Otp sent to your email</p>
      </div>
      <form className='text-center' onSubmit={e => submitHandler(e)}>
        <div className='flex items-center justify-center gap-2' onPaste={handlePaste}>
          {Array(4).fill(0).map((_, index) => (
            <input key={index} type="text" maxLength={1} className='w-14 h-14 text-center text-blue-400 rounded border-2 outline-none p-2 border-blue-400 focus:border-blue-400 transition duration-300'
              ref={e => inputRef.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        {error && <p className='text-sm mt-4 text-red-500 animate-shake'>*{error}</p>}
        <button type="submit" className='mt-6 px-5 py-2 bg-white/10 rounded text-white  transition duration-300  hover:bg-blue-800 '>Verify</button>
      </form>
    </div>
  )
}

export default Verify

