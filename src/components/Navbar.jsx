import { Link } from 'react-router-dom';
import { React,useState } from 'react';

import stil_logo from '../assets/stil_logo.png'
import { IoIosSearch } from "react-icons/io"
import { IoMenuSharp } from "react-icons/io5"




function Navbar() {
  const menuTextStyle = "hover:underline text-md md:text-lg font-medium text-gray-700"
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  return (
      <div className='w-full py-2 bg-white/80 backdrop-blur-sm shadow-sm'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <Link to="/" className='no-tracking-tight basis-1/8'>
                <img src={stil_logo} alt="STIL Logo" className='min-w-24' /></Link>
            <div className="flex items-center gap-4">

              {/* Menu */}
              <div className='hidden md:flex gap-6 items-center text-md md:text-lg font-medium text-gray-700'>
                <Link to="/" className={menuTextStyle}>Home</Link>
                <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!isDropdownOpen)}
                      className="hover:underline focus:outline-none menuTextStyle"
                    >
                      Publications
                    </button>
                    {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
                        <Link to="/publications" className="block px-4 py-2 hover:bg-gray-100">Journal Publications</Link>
                        <Link to="/conference" className="block px-4 py-2 hover:bg-gray-100">Conference Papers</Link>
                      </div>
                    )}
                </div>
                <Link to="/people" className={menuTextStyle}>People</Link>
                <Link to="/research" className={menuTextStyle}>Research</Link>
                <Link to="/projects" className={menuTextStyle}>Projects</Link>
                <Link to="/events" className={menuTextStyle}>Events</Link>
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