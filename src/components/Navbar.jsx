import { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../context/AppContext";
import { Link } from 'react-router-dom';
import { CircleStar, ChevronDown, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, loading, clearUser } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [])

  const toggleDropdown = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsOpen(!isOpen);
      setTimeout(() => setIsAnimating(false), 200);
    }
  }

  if (loading) {
    return (
      <nav className='fixed z-10 top-0 left-0 mx-auto flex justify-between items-center w-full px-4 sm:px-8 lg:px-12 h-16 bg-black/20 backdrop-blur-md border-b border-white/10'>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-3"></div>
          <h1 className='text-xl font-semibold text-blue-400'>GENX.</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white/20 rounded animate-pulse"></div>
          <span className="text-white/60 text-sm">Loading...</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className='fixed z-50 top-0 left-0 mx-auto flex justify-between items-center w-full px-4 sm:px-8 lg:px-12 h-16 bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-lg'>
      {/* Logo */}
      <div className="flex items-center group cursor-pointer">
        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
        <h1 className='text-xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-300'>
          GENX.
        </h1>
      </div>

      {user ? (
        <div className='flex gap-3 items-center'> 
          {/* Credits Display */}
          <div className='flex text-white/70 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 px-4 py-2 rounded-full gap-2 items-center backdrop-blur-sm hover:from-white/15 hover:to-white/10 transition-all duration-300 group'>
            <CircleStar 
              size='16' 
              className="text-yellow-400 group-hover:rotate-12 transition-transform duration-300" 
            />
            <span className='text-sm font-medium'>
              {user?.CreditBalance} <span className="text-white/50">credits</span>
            </span>
          </div>
          
         
          
          {/* User Profile Dropdown */}
          <div className='relative' ref={dropdownRef}>
            <button 
              onClick={toggleDropdown}
              className='flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-all duration-300 group'
            >
              <div className='w-9 h-9 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 border border-white/20 flex items-center justify-center text-white font-semibold text-sm hover:scale-105 transition-transform duration-300'>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <ChevronDown 
                size='16' 
                className={`text-white/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} hidden sm:block`}
              />
            </button>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-14 right-0 w-64 bg-white/10 backdrop-blur-2xl z-20 border border-white/20 rounded-xl shadow-2xl transition-all duration-200 origin-top-right ${
              isOpen 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}>
              {/* User Info Header */}
              <div className='p-4 border-b border-white/10'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 border border-white/20 flex items-center justify-center text-white font-semibold'>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className='text-white font-medium text-sm truncate'>{user?.name}</h2>
                    <p className='text-white/50 text-xs truncate'>{user?.email}</p>
                  </div>
                </div>
              </div>
              
              {/* Credits Info (Mobile) */}
              <div className='sm:hidden px-4 py-3 border-b border-white/10'>
                <div className='flex items-center justify-between'>
                  <span className='text-white/70 text-sm'>Credits</span>
                  <div className='flex items-center gap-1'>
                    <CircleStar size='14' className="text-yellow-400" />
                    <span className='text-white font-medium text-sm'>{user?.CreditBalance}</span>
                  </div>
                </div>
              </div>
              
              {/* Logout Button */}
              <div className='p-2'>
                <button 
                  onClick={clearUser}
                  className='w-full flex items-center gap-3 px-3 py-2 text-white/70 hover:text-white hover:bg-red-500/10 rounded-lg transition-all duration-200 group'
                >
                  <LogOut size='16' className="group-hover:text-red-400 transition-colors duration-200" />
                  <span className='text-sm font-medium'>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Link 
          to='/register'
          className='group relative px-6 py-2 bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-full text-sm font-medium text-white/80 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/10 hover:border-blue-400/30 overflow-hidden'
        >
          <span className="relative z-10">Get Started</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;