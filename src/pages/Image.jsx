import React, { useContext } from 'react'
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Image = () => {
  const { image, loading } = useContext(AppContext);
  const navigate = useNavigate();
  const handleRegenerate = () => {
    navigate('/generate-img');
  }
  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
  <div className='flex items-center justify-center h-screen'>
    {loading ? (
      <div className="flex items-center justify-center h-full">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-ping"></div>
          <div className="absolute inset-0 border-4 border-blue-700 rounded-full"></div>
        </div>
      </div>
    ) : (
      <div>
        <div className=' w-60 h-60 lg:w-100 lg:h-100 rounded-lg overflow-hidden'>
          <img src={image} alt="" className='w-full h-full object-cover object-center' />
        </div>
        <div className='mt-4 flex items-center justify-between p-4'>
          <button
            className='transition duration-300 text-blue-700 hover:text-blue-950 cursor-pointer'
            onClick={handleRegenerate}

          >
            Regenerate
          </button>
          <button
            className='bg-blue-600 hover:bg-blue-900 text-sm text-white px-4 py-2 rounded-full transition duration-300'
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </div>
    )}
  </div>
);
};

export default Image;
