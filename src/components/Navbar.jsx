import React from 'react';
import { Link } from 'react-router-dom';

import stil_logo from '../assets/stil_logo.png'
import { IoIosSearch } from "react-icons/io"
import { IoMenuSharp } from "react-icons/io5"


function Navbar() {
  return (
      <div className='w-full py-2 bg-white/80 backdrop-blur-sm shadow-sm'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <Link to="/" className='no-tracking-tight basis-1/8'>
                <img src={stil_logo} alt="STIL Logo" className='min-w-24' /></Link>
            <div className="flex items-center gap-4">
              <div className='hidden md:flex gap-6 items-center text-md'>
                <Link to="/" className='hover:underline'>Home</Link>
                <Link to="/publications" className='hover:underline'>Publications</Link>
                <Link to="/people" className='hover:underline'>People</Link>
                <Link to="/research" className='hover:underline'>Research</Link>
                <Link to="/projects" className='hover:underline'>Projects</Link>
                <Link to="/events" className='hover:underline'>Events</Link>
              </div>
            <div className="block md:hidden">
              <div className="bg-sky-600 text-xl text-white hover:bg-blue-700 inline-block px-4 py-2 rounded-md text-sm font-medium"><IoMenuSharp /></div>
            </div>
            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-300 hover:bg-blue-400 cursor-pointer">
              <div className="text-xl hover:text-white inline-block px-4 py-2 rounded-md text-sm font-medium"><IoIosSearch /></div>
            </div>
            </div>
          </div>
        </div>
      </div>
      )
}
export default Navbar;