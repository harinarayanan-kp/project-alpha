"use client";
import React,{useState} from 'react'

const Navbar = () => {
  const[isClick,setisClick] =useState(false)

  const toggleNavbar =() =>{
    setisClick(!isClick);

  };
  return (
    <>
      <nav className='bg-gray-900'>
        <div className='
        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <a href="/" className='text-white'>Logo</a>
              </div>
            </div>
            <div className=' md:black'>
              <div className='ml-4 flex items-center space-x-4'>
                <a href="/" className='text-white hover:bg-white hover:text-black rounded-lg p-2'>Clubs</a>
                <a href="/" className='text-white hover:bg-white hover:text-black rounded-lg p-2'>Events</a>
                <a href="/" className='text-white hover:bg-white hover:text-black rounded-lg p-2'>About</a>
                <a href="/" className='text-white hover:bg-white hover:text-black rounded-lg p-2'>Home</a>

              </div>
            </div>
            
          </div>

        </div>
      </nav>
    </>
  )
}

export default Navbar
