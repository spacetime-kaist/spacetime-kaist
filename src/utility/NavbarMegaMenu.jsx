import { Link } from 'react-router-dom';
import { React, useState, useRef, useEffect } from 'react';

import stil_logo from '../assets/stil_logo.png'
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io"
import { IoMenuSharp } from "react-icons/io5"

import { useDataLoader } from '../hooks/useDataLoader';

/**
 * Navbar with Screen-Wide Mega Menus
 * This version shows full-width dropdown menus when hovering over menu items
 */
function NavbarMegaMenu() {
  const menuTextStyle = "hover:bg-blue-300 hover:text-white p-3 m-1 rounded-xl text-md font-medium text-gray-700 transition-colors duration-200"
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isPublicationsOpen, setPublicationsOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const menuRef = useRef(null);
  const megaMenuRef = useRef(null);
  const { data: researchData } = useDataLoader('researchData');
  const { data: projectsData } = useDataLoader('projectsData');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setPublicationsOpen(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setHoveredMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Menu configurations for mega menus
  const menuConfigs = {
    publications: {
      title: "Publications",
      items: [
        { title: "Journal Publications", link: "/publications", desc: "Browse our journal publications" },
        { title: "Conference Proceedings", link: "/conference", desc: "View conference proceedings" },
      ]
    },
    projects: {
      title: "Projects",
      items: (projectsData || []).filter(p => p.link && !p.pagetitle).map(p => ({
        title: p.title,
        link: p.type === "internal" ? `/projects${p.link}` : p.link,
        desc: "",
        external: p.type === "external"
      }))
    },
    research: {
      title: "Research",
      items: (researchData || []).map(r => ({
        title: (r.menuTitle !== '') ? r.menuTitle : r.title,
        link: `/research/${r.id}`,
        desc: r.desc || ""
      }))
    },
    newsEvents: {
      title: "News & Events",
      items: [
        { title: "News", link: "/press", desc: "Latest news and press releases" },
        { title: "Events", link: "/events", desc: "Upcoming events and conferences" },
      ]
    }
  };

  const renderMegaMenu = (menuKey) => {
    const config = menuConfigs[menuKey];
    if (!config) return null;

    return (
      <div 
        ref={megaMenuRef}
        className="fixed left-0 right-0 bg-white border-t-2 border-blue-300 shadow-2xl z-50 animate-[slideDown_0.3s_ease-out]"
        style={{ 
          top: '64px', 
          width: '100vw'
        }}
        onMouseEnter={() => setHoveredMenu(menuKey)}
        onMouseLeave={() => setHoveredMenu(null)}
      >
        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200 animate-[fadeIn_0.3s_ease-out]">
            {config.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {config.items.map((item, idx) => (
              item.external ? (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 ease-out animate-[fadeInUp_0.4s_ease-out]"
                  style={{ 
                    animationDelay: `${idx * 40}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 mb-2">
                    {item.title}
                  </h3>
                  {item.desc && item.desc.trim() && (
                    <p className="text-sm text-gray-600 line-clamp-2">{item.desc}</p>
                  )}
                  <span className="text-xs text-blue-600 mt-2 inline-block">External Link →</span>
                </a>
              ) : (
                <Link
                  key={idx}
                  to={item.link}
                  className="group p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 ease-out animate-[fadeInUp_0.4s_ease-out]"
                  style={{ 
                    animationDelay: `${idx * 40}ms`,
                    animationFillMode: 'both'
                  }}
                  onClick={() => setHoveredMenu(null)}
                >
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 mb-2">
                    {item.title}
                  </h3>
                  {item.desc && item.desc.trim() && (
                    <p className="text-sm text-gray-600 line-clamp-2">{item.desc}</p>
                  )}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
    <div className='fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-80'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <Link to="/" className='no-tracking-tight basis-1/8'>
            <img src={stil_logo} alt="STIL Logo" className='min-w-24' />
          </Link>
          <div className="flex items-center gap-4">
           
            {/* -------------- Desktop Menu -------------- */}
            <div className='hidden md:flex gap-6 items-center text-md md:text-lg font-medium text-gray-700'>

              {/* Home */}
              <Link to="/" className={`${menuTextStyle} hidden lg:block`}>Home</Link>

              {/* Publications - Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setHoveredMenu('publications')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link to="/publications" className={`${menuTextStyle} flex items-center gap-1`}>
                  Publications
                  <IoIosArrowDown size={20} className={`transition-transform duration-200 ${hoveredMenu === 'publications' ? 'rotate-180' : ''}`} />
                </Link>
              </div>

              {/* Projects - Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setHoveredMenu('projects')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link to="/projects" className={`${menuTextStyle} flex items-center gap-1`}>
                  Projects
                  <IoIosArrowDown size={20} className={`transition-transform duration-200 ${hoveredMenu === 'projects' ? 'rotate-180' : ''}`} />
                </Link>
              </div>
              
              {/* Research - Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setHoveredMenu('research')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link to="/research" className={`${menuTextStyle} flex items-center gap-1`}>
                  Research
                  <IoIosArrowDown size={20} className={`transition-transform duration-200 ${hoveredMenu === 'research' ? 'rotate-180' : ''}`} />
                </Link>
              </div>

              {/* News&Events - Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setHoveredMenu('newsEvents')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button className={`${menuTextStyle} flex items-center gap-1 focus:outline-none`}>
                  News&Events
                  <IoIosArrowDown size={20} className={`transition-transform duration-200 ${hoveredMenu === 'newsEvents' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* People */}
              <Link to="/people" className={menuTextStyle}>People</Link>
            </div>

            {/* -------------- Mobile Menu -------------- */}            
            <div ref={menuRef} className="relative md:hidden">
              <button
                onClick={() => {
                  setDropdownOpen(!isDropdownOpen)
                  setPublicationsOpen(false)
                }}
                className="focus:outline-none transition smooth"
              >
                <div className="bg-sky-600 text-xl text-white hover:bg-blue-700 inline-block px-4 py-2 rounded-md text-sm font-medium">
                  <IoMenuSharp />
                </div>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-50 p-2 flex flex-col bg-white border border-gray-200 rounded shadow-md z-50">
                  <Link to="/" className={menuTextStyle} onClick={() => setDropdownOpen(false)}>Home</Link>
                  
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
                        <Link to="/publications" className="block pl-7 py-2 text-gray-500 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>Journal Publications</Link>
                        <Link to="/conference" className="block pl-7 py-2 text-gray-500 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>Conference Proceedings</Link>
                      </>
                    )}
                  </div>
                  
                  <Link to="/research" className={menuTextStyle} onClick={() => setDropdownOpen(false)}>Research</Link>
                  <Link to="/projects" className={menuTextStyle} onClick={() => setDropdownOpen(false)}>Projects</Link>
                  <Link to="/events" className={menuTextStyle} onClick={() => setDropdownOpen(false)}>Events</Link>
                  <Link to="/press" className={menuTextStyle} onClick={() => setDropdownOpen(false)}>Press</Link>
                  <Link to="/people" className={menuTextStyle} onClick={() => setDropdownOpen(false)}>People</Link>
                  <Link to="/apply" className='hover:bg-blue-300 hover:text-white p-3 m-1 rounded-xl text-md font-medium text-blue-500' onClick={() => setDropdownOpen(false)}>Apply</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Mega Menus - Rendered outside container for full-width */}
    {hoveredMenu && renderMegaMenu(hoveredMenu)}
    </>
  )
}

export default NavbarMegaMenu;

