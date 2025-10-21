import { Link } from 'react-router-dom';
import { React,useState, useRef, useEffect } from 'react';

import stil_logo from '../assets/stil_logo.png'
import { IoIosSearch, IoIosArrowForward, IoIosArrowDown } from "react-icons/io"
import { IoMenuSharp } from "react-icons/io5"

import researchData from '../uploads/researchData';




function Navbar() {
  const menuTextStyle = "hover:bg-blue-300 hover:text-white p-3 m-1 rounded-xl md:text-lg font-medium text-gray-700"
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isPublicationsOpen, setPublicationsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setDropdownOpen(false);
      setPublicationsOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("touchstart", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("touchstart", handleClickOutside);
  };
  }, []);

  return (
      <div className='fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-80'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <Link to="/" className='no-tracking-tight basis-1/8'>
                <img src={stil_logo} alt="STIL Logo" className='min-w-24' /></Link>
            <div className="flex items-center gap-4">
             
              {/* -------------- Desktop Menu -------------- */}
              <div className='hidden md:flex gap-6 items-center text-md md:text-lg font-medium text-gray-700'>

                {/*Home*/}
                <Link to="/" className={`${menuTextStyle} hidden lg:block`} >Home</Link>

                {/* Publications - Desktop hover dropdown */}
                  <div className="relative group hidden md:block ">
                    <button className="focus:outline-none menuTextStyle">
                      Publications &#x25BC;
                    </button>
                    <div className="absolute left-0 top-full w-50 bg-white border border-gray-200 rounded shadow-md z-50 hidden group-hover:block">
                      <Link to="/publications" className="block px-4 py-2 text-gray-500 hover:bg-gray-100">
                        Journal Publications
                      </Link>
                      <Link to="/conference" className="block px-4 py-2 text-gray-500 hover:bg-gray-100">
                        Conference Papers
                      </Link>
                    </div>
                  </div>

                {/*People*/}
                <Link to="/people" className={menuTextStyle}>People</Link>
                
                {/* Research - Desktop hover dropdown */}
                  <div className="relative group hidden md:block ">
                    <Link to="/research" className={menuTextStyle}>Research &#x25BC;</Link>
                    <div className="absolute left-0 top-full w-60 bg-white border border-gray-200 rounded shadow-md z-50 hidden group-hover:block">
                      {researchData.map((item) => (
                        <Link key={item.id} to={`/research/${item.id}`} className="block px-4 py-2 text-gray-500 hover:bg-gray-100">
                          {(item.menuTitle !== '') ? item.menuTitle : item.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                {/*Projects*/}
                <Link to="/projects" className={menuTextStyle}>Projects</Link>
                {/*Events*/}
                <Link to="/events" className={menuTextStyle}>Events</Link>
              </div>

              {/* -------------- Mobile Menu -------------- */}            
              <div ref={menuRef} className="relative md:hidden">
                    <button
                      onClick={() => {
                        setDropdownOpen(!isDropdownOpen)
                        setPublicationsOpen(false)}}
                      className="focus:outline-none transition smooth"
                    >
                      <div className="bg-sky-600 text-xl text-white hover:bg-blue-700 inline-block px-4 py-2 rounded-md text-sm font-medium"><IoMenuSharp /></div>
                    </button>
                    {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-50 p-2 flex flex-col bg-white border border-gray-200 rounded shadow-md z-50">
                        <Link to="/" className={menuTextStyle}>Home</Link>
                        {/* Publications - Mobile click dropdown */}
                        <div>
                        <div className="relative md:hidden flex items-center">
                            {isPublicationsOpen ? (
                              <IoIosArrowDown className="inline-block text-md"/>
                            ) : (
                              <IoIosArrowForward className="inline-block text-md mr-1"/>  
                            )}
                            <button
                              onClick={() => setPublicationsOpen(!isPublicationsOpen)}
                              className={`focus:outline-none flex items-right pl-0 ${menuTextStyle}`}
                            >
                              Publications
                            </button>
                            </div>
                            {isPublicationsOpen && (
                                <>
                                <div className='border-t border-slate-300'></div>
                                <Link to="/publications" className="block pl-7 py-2 text-gray-500 hover:bg-gray-100">Journal Publications</Link>
                                <Link to="/conference" className="block pl-7 py-2 text-gray-500 hover:bg-gray-100">Conference Papers</Link>
                              </>
                            )}
                        </div>
                      <Link to="/people" className={menuTextStyle}>People</Link>
                      <Link to="/research" className={menuTextStyle}>Research</Link>
                      {/* Research - Desktop hover dropdown */}
                        {/* <div className="relative group hidden md:block ">
                          <Link to="/research" className={menuTextStyle}>Research</Link>
                          <span className="ml-1">&#x25BC;</span>
                          <div className="absolute left-0 top-full w-60 bg-white border border-gray-200 rounded shadow-md z-50 hidden group-hover:block">
                            {researchData.map((item) => (
                              <Link key={item.id} to={`/research#${item.navTitle}`} className="block px-4 py-2 text-gray-500 hover:bg-gray-100">
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        </div> */}
                      <Link to="/projects" className={menuTextStyle}>Projects</Link>
                      <Link to="/events" className={menuTextStyle}>Events</Link>
                      </div>
                    )}
              </div>

              {/* ------ Search ------ */}
              {/* <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-300 hover:bg-blue-400 cursor-pointer">
                <div className="text-xl hover:text-white inline-block px-4 py-2 rounded-md text-sm font-medium"><IoIosSearch /></div>
              </div> */}
               </div>
              
            </div>
            </div>
          </div>
      )
}
export default Navbar;