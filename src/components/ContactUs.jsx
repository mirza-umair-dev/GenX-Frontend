import React, { useState } from 'react'
import emailjs from "emailjs-com";

const ContactUs = () => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const InputHandler = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_7of5lyy",   
      "template_ne532ec",  
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        title: "New Contact Form"
      },
      "icOf2bpV-mi3-SOGJ"
    )
      .then(() => {
        alert("Message sent successfully!");
        setformData({ name: "", email: "", message: "" }); 
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send message.");
      });
  }

  return (
    <div className='flex items-center justify-center gap-8 flex-col'>
      <h1 className='text-3xl'>Contact Us</h1>

      <form
        onSubmit={submitHandler}
        className='w-full lg:w-1/2 flex flex-col justify-between items-center gap-4 px-4 py-4'
      >
        <div className='flex items-center justify-between gap-4 w-full'>
          <input
            type="text"
            name='name'
            value={formData.name}
            onChange={InputHandler}
            placeholder='Enter your name'
            className='w-1/2 px-4 py-2 border border-white/40 outline-none rounded-full hover:bg-white/10 transition duration-500'
            required
          />
          <input
            type="email"
            name='email'
            value={formData.email}
            onChange={InputHandler}
            placeholder='Enter your email'
            className='w-1/2 px-4 py-2 border border-white/40 outline-none rounded-full hover:bg-white/10 transition duration-500'
            required
          />
        </div>

        <textarea
          name="message"
          value={formData.message}
          onChange={InputHandler}
          placeholder='Enter your message'
          className='w-full min-h-40 resize-none px-4 py-2 border border-white/40 outline-none rounded-xl hover:bg-white/10 transition duration-500'
          required
        ></textarea>

        <button
          type="submit"
          className='w-full px-4 py-2 bg-white/10 text-white/60 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors duration-300'
        >
          Send Message
        </button>
      </form>
    </div>
  )
}

export default ContactUs
