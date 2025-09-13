import React, { useContext, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import {WandSparkles,Sparkles} from 'lucide-react'
import img1 from '../assets/ai images/img1.jpeg'
import img2 from '../assets/ai images/img2.jpeg'
import img3 from '../assets/ai images/img3.jpeg'
import img4 from '../assets/ai images/img4.jpeg'
import img5 from '../assets/ai images/img5.jpeg'
import img6 from '../assets/ai images/img6.jpeg'
import AppContext from '../context/AppContext'
const GenerateImg = () => {
  const {generateImage} = useContext(AppContext);
  const images =[img1,img2,img3,img4,img5,img6];
  const [value, setvalue] = useState('');
  const textareaRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
 
   

   const samplePrompts = [
    "A futuristic cityscape at sunset",
    "Magical forest with glowing mushrooms",
    "Cyberpunk cat with neon glasses",
    "Abstract geometric art in purple tones",
    "Vintage space explorer portrait"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    
    setIsGenerating(true);
    try {
      await generateImage(value);
    } finally {
      setIsGenerating(false);
    }
  }



  const changeHandler = (e) => {
    setvalue(e.target.value);

    textareaRef.current.style.height='auto';
    textareaRef.current.style.height=textareaRef.current.scrollHeight + 'px';
  }
  const insertSamplePrompt = (prompt) => {
    setvalue(prompt);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      textareaRef.current.focus();
    }
  }

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  }


  return (
    <div className='flex items-center justify-center h-[100vh]'>
      <div>
        <Navbar />
      </div>
     <div className='flex items-center flex-col gap-6 w-full'>
       <div >
        <div className='flex gap-4 items-center justify-center w-full text-center'>
          <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
        <h1 className='text-4xl text-center font-semibold text-white/80' >
        {getCurrentGreeting()}
        </h1>
        <Sparkles className="w-8 h-8 text-purple-400 animate-pulse delay-500" />
        </div>
         <h3 className='lg:text-2xl text-lg mt-4 text-center text-white/80 line-height-10'>Enter your prompt and let the magic happen</h3>
       </div>
        <div className='grid lg:grid-cols-5 grid-cols-3 gap-2'>
          {images.slice(0,5).map((item,index) => (
            <div key={index} className='w-20 h-20 sm:w-28 sm:h-28 overflow-hidden rounded-lg'>
              <img src={item} alt="image" className='object-cover object-center hover:scale-105 transition duration-300'/>
            </div>
          ))}
        </div>
        <div>
          <div className='flex flex-wrap gap-2 justify-center'>
            {samplePrompts.slice(0,3).map((prompt, index) => (
              <button
                key={index}
                onClick={() => insertSamplePrompt(prompt)}
                className='bg-white/10 text-sm text-white/60 px-4 py-2 rounded-full hover:bg-white/20 transition duration-300 border border-blue-500'
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
        
        <div className='w-full lg:w-1/2  px-8 py-4 flex flex-col gap-4'>
          <div className='flex w-full items-center justify-center min-h-10 max-h-80 '>
            <textarea  type="text" placeholder='Enter Prompt Here ' 
            className='w-full h-full bg-white/5  py-3 px-4 min-h-10 max-h-80 resize-none outline-none border border-blue-500 rounded-2xl overflow-hidden hover:bg-white/10 transition duration-300'
            onChange={changeHandler}
            value={value}
            ref={textareaRef}
            />
          </div>
          <div className='flex items-center justify-center w-full'>
           <button 
                type="submit"
                disabled={!value.trim() || isGenerating}
                onClick={handleSubmit}
                className={`group relative px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 overflow-hidden ${
                  !value.trim() || isGenerating 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/25 active:scale-95'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className='relative flex items-center gap-3'>
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Magic...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate</span>
                      <WandSparkles size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                    </>
                  )}
                </div>
              </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default GenerateImg





