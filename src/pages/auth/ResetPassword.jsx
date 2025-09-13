import React from 'react'
import { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye,EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [email, setemail] = useState('');
    const [isEmailSent, setisEmailSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [resetOtp, setresetOtp] = useState('');
    const [isOtpSubmitted, setisOtpSubmitted] = useState(false);
    const [newPassword, setnewPassword] = useState('');
    const [error, seterror] = useState(null);
    const inputRef = useRef([]);
    const navigate = useNavigate();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }
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

    const otpHandler = async (e) => {
        e.preventDefault();
        const otpArray = inputRef.current.map(e => e.value);
        const resetOtp = otpArray.join('');
        setresetOtp(resetOtp);
        

        try {
            const { data } = await axiosInstance.post(API_PATHS.AUTH.verifyResetOtp, {email,resetOtp });
            if (data.success) {
                setisOtpSubmitted(true);
                console.log("success");
                seterror('')
            } else {
                seterror(data.message || "Invalid Otp");
                console.log(data.message);
                toast.error(data.message || "Invalid Otp");
            }

        } catch (error) {
            console.error(error);
            seterror(error.response?.data?.message || "Something went wrong, please try again.");
            toast.error(error.response?.data?.message || "Something went wrong, please try again.");
        }
        console.log(resetOtp);
    }

    const emailHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post(API_PATHS.AUTH.resetOtp, { email })
            if (data.success) {
                setisEmailSent(true);
                toast.success('OTP sent successfully');
            } else {
                toast.error(data.message || 'Something went wrong');
            }
        } catch (error) {
            console.log(error);
        }

    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post(API_PATHS.AUTH.resetPassword, { email, newPassword });
            if (data.success) {
                navigate('/login');
                toast.success('Password reset successful');
            } else {
               toast.error(data.message || 'Something went wrong');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong, please try again.");
        }
    }
    return (
        <div className="w-full h-screen flex items-center justify-center p-3">
            {/* Email Component */}

            {!isEmailSent && !isOtpSubmitted &&
            <div className=" w-full lg:w-1/3 p-8 flex flex-col items-center justify-center space-y-6 bg-white/10 backdrop-blur-md rounded-md lg:rounded-2xl shadow-lg">

                <h1 className="text-3xl font-bold text-white tracking-wide">
                    Reset Password
                </h1>
                <p className="text-white/70 text-sm text-center">
                    Enter your email and we'll send you an OTP to reset your password
                </p>

                <form className="w-full space-y-4" onSubmit={emailHandler}>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-white/80">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            placeholder="xyz@gmail.com"
                            className="w-full px-4 py-2 rounded-md  text-white placeholder-white/70 outline-none border-2 border-white/30 hover:border-blue-600 focus:border-blue-600 transition duration-300"
                        />
                    </div>

                    <div className='text-center'>
                        <button
                            type="submit"
                            className=" px-5 py-2 bg-white/10 rounded text-white  transition duration-300  hover:bg-blue-800  border border-white/20 hover:border-blue-600 " > Send OTP
                        </button>
                    </div>
                </form>
            </div>
}
            {/* Otp Componenet */}
            {isEmailSent && !isOtpSubmitted &&
            <div className=' w-full lg:w-1/3 p-8 flex flex-col items-center justify-center space-y-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg'>
                <div className='text-center'>
                    <h1 className='text-3xl font-semibold text-white/80'>Verify Reset OTP</h1>
                    <p className='mt-2 text-sm text-white/70'>Enter resetOtp sent to your email</p>
                </div>
                <form className='text-center' onSubmit={e => otpHandler(e)}>
                    <div className='flex items-center justify-center gap-2' onPaste={handlePaste}>
                        {Array(4).fill(0).map((_, index) => (
                            <input key={index} type="text" maxLength={1} className='w-14 h-14 text-center text-blue-600 rounded border-2 outline-none p-2 border-white/20 focus:border-blue-600 transition duration-300'
                                ref={e => inputRef.current[index] = e}
                                onInput={(e) => handleInput(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>
                    {error && <p className='text-sm mt-4 text-red-500 animate-shake'>*{error}</p>}
                    <button type="submit" className='mt-6 px-5 py-2 bg-white/10 rounded text-white  transition duration-300  hover:bg-blue-800 border border-white/20 hover:border-blue-600 '>Verify</button>
                </form>
            </div>
}

            {/* Password Component */}
            {isEmailSent && isOtpSubmitted &&

            <div className=" w-full lg:w-1/3 p-8 flex flex-col items-center justify-center space-y-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg">

                <h1 className="text-3xl font-bold text-white tracking-wide">
                    Change Password
                </h1>
                <p className="text-white/70 text-sm text-center">
                    Enter your new Password that you can remember
                </p>

                <form className="w-full space-y-4" onSubmit={submitHandler}>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-white/80">
                            Password
                        </label>
                       <div className=' flex items-center  relative border-2 rounded-md border-white/30 hover:border-blue-600 focus:border-blue-600 transition duration-300'>
                         <input
                            type={showPassword ? 'text' : 'password'}
                            id="email"
                            value={newPassword}
                            onChange={(e) => setnewPassword(e.target.value)}
                            placeholder="********"
                            className="w-full px-4 py-2 rounded-md  text-white placeholder-white/70 outline-none transition duration-300 "
                        />
                        {showPassword ? (
                            <Eye className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 cursor-pointer transition duration-300' onClick={togglePassword} />
                        ) : (
                            <EyeOff className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 cursor-pointer transition duration-300' onClick={togglePassword} />
                        )}
                       </div>
                    </div>

                    <div className='text-center'>
                        <button
                            type="submit"
                            className=" px-5 py-2 bg-white/10 rounded text-white  transition duration-300  hover:bg-blue-800  border border-white/20 hover:border-blue-600 " > Submit
                        </button>
                    </div>
                </form>
            </div>
}
        </div>
    )
}

export default ResetPassword
