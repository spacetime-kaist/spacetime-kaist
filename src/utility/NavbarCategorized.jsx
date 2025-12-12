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
function NavbarCategorized() {
  const menuTextStyle = "hover:bg-blue-300 hover:text-white p-3 m-1 rounded-xl text-md font-medium text-gray-700 transition-colors duration-200"
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isPublicationsOpen, setPublicationsOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const menuRef = useRef(null);
  const megaMenuRef = useRef(null);

  // Load data from JSON files
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
    research: {
      title: "Research",
      categories: [
        { categoryTitle: "Research",
        link: "/research",
        items: (researchData || []).map(r => ({
              title: (r.menuTitle !== '') ? r.menuTitle : r.title,
              link: `/research/${r.id}`,
              desc: r.desc || ""
        }))},
        { categoryTitle: "Projects",
        link: "/projects",
        items: (projectsData || []).filter(p => p.link && !p.pagetitle).map(p => ({
            title: p.title,
            link: p.type === "internal" ? `/projects${p.link}` : p.link,
            desc: "",
            external: p.type === "external"
            }))},
    ]},
    publications: {
        title: "Publications",
        link: "/publications",
        categories: [
            {
            categoryTitle: "Publications",
            link: "/publications",
            items: [
                { title: "Journal Publications", link: "/publications", desc: "Browse our journal publications" },
                { title: "International Conference Proceedings", link: "/publications#international", desc: "View international conference proceedings" },
                { title: "National Conference Presentation", link: "/publications#national", desc: "View national conference presentations" },  
            ]
            }
        ]
    },
    newsEvents: {
      title: "News",
      items: [
        { title: "Press", link: "/press", desc: "Latest press releases", icon: "📰" },
        { title: "Events", link: "/events", desc: "Upcoming events and conferences", icon: "📅" },
      ]
    },
    people: {
      title: "Members",
      link: "/people",
      categories: [
          {
          categoryTitle: "Members",
          link: "/people",
          items: [
            { title: "Professor", link: "/people#professor"},
            { title: "Lab Members", link: "/people#labmembers"},
            { title: "Alumni", link: "/people#alumni"}
          ]
          }
      ]
  },
  };

  const renderMegaMenu = (menuKey) => {
    const config = menuConfigs[menuKey];
    if (!config) return null;
    return (
        <div 
          ref={megaMenuRef}
          className="fixed left-0 right-0 bg-white border-t-2 border-blue-300 shadow-2xl z-50 animate-[slideDown_0.3s_ease-out] w-100vw top-16 lg:top-24"
          onMouseEnter={() => setHoveredMenu(menuKey)}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          <div className="container py-8">
        {config.categories? 
            config.categories.map((category, catIdx) => (
                <div key={catIdx} className={catIdx > 0 ? "mt-10 pt-10 border-t border-gray-200" : ""}>
                    <div className="flex gap-8">
                        {category.link? <Link
                            to={category.link || '#'}
                            className="flex-shrink-0 w-48 p-4 rounded-lg hover:bg-blue-50 transition-all duration-200 group cursor-pointer"
                            onClick={() => setHoveredMenu(null)}
                        >
                            <h2 className="text-xl font-bold text-gray-800 mb-0 group-hover:text-blue-600 animate-[fadeIn_0.3s_ease-out] transition-colors duration-200">
                                {category.categoryTitle}
                            </h2>
                            <div className="text-sm text-gray-600 group-hover:text-blue-600 mt-2 transition-colors duration-200">
                                View All →
                            </div>
                        </Link>
                        :
                        <h2 className="text-xl font-bold text-gray-800 mb-0 group-hover:text-blue-600 animate-[fadeIn_0.3s_ease-out] transition-colors duration-200">
                                {category.categoryTitle}
                        </h2>}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {category.items.map((item, idx) => (
                            item.external ? (
                                <a
                                key={idx}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 ease-out animate-[fadeInUp_0.4s_ease-out]"
                                style={{ 
                                    animationDelay: `${idx * 40}ms`,
                                    animationFillMode: 'both'
                                }}
                                >
                                <h3 className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 mb-1">
                                    {item.title}
                                </h3>
                                <span className="text-xs text-blue-500">External Link →</span>
                                </a>
                            ) : (
                                <Link
                                key={idx}
                                to={item.link}
                                className="group p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 ease-out animate-[fadeInUp_0.4s_ease-out]"
                                style={{ 
                                    animationDelay: `${idx * 40}ms`,
                                    animationFillMode: 'both'
                                }}
                                onClick={() => setHoveredMenu(null)}
                                >
                                <h3 className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">
                                    {item.title}
                                </h3>
                                </Link>
                            )
                            ))}
                        </div>
                    </div>
              </div>   
            ))
        :
        (
        <div className="flex gap-8 justify-between items-center">
        <div className="flex-shrink-0 w-48">
            <h2 className="text-xl font-bold text-gray-800 mb-0 animate-[fadeIn_0.3s_ease-out]">
                {config.title}
            </h2>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.items&&config.items.map((item, idx) => (
              item.external ? (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center group p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 ease-out animate-[fadeInUp_0.4s_ease-out]"
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
                  className="text-center flex flex-col items-center justify-center group p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 ease-out animate-[fadeInUp_0.4s_ease-out]"
                  style={{ 
                    animationDelay: `${idx * 40}ms`,
                    animationFillMode: 'both'
                  }}
                  onClick={() => setHoveredMenu(null)}
                >
                  {item.icon && (
                    <span className="text-3xl mb-2">{item.icon}</span>
                  )}
                  <h3 className="text-center text-lg font-semibold text-gray-800 group-hover:text-blue-600 mb-2">
                    {item.title}
                  </h3>
                  {item.desc && item.desc.trim() && (
                    <p className="text-center text-sm text-gray-600 line-clamp-2">{item.desc}</p>
                  )}
                </Link>
              )
            ))}
          </div>
          </div>
      )}
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
              <div 
                className="relative"
                onMouseEnter={() => setHoveredMenu(null)}
              >
                <Link to="/" className={`${menuTextStyle} hidden lg:block`}>Home</Link>
              </div>

              {/* Publications - Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setHoveredMenu('publications')}
              >
                <Link to="/publications" className={`${menuTextStyle} flex items-center gap-1`}>
                  Publications
                </Link>
              </div>

              {/* Research - Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setHoveredMenu('research')}
              >
                <Link to="/research" className={`${menuTextStyle} flex items-center gap-1`}>
                  Research
                  <IoIosArrowForward size={20} className={`transition-transform duration-200 ${hoveredMenu === 'research' ? 'rotate-90' : ''}`} />
                </Link>
              </div>

              {/* News&Events - Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setHoveredMenu('newsEvents')}
              >
                <button onClick={() => setHoveredMenu('newsEvents')} className={`${menuTextStyle} flex items-center gap-1 focus:outline-none`}>
                  News
                  <IoIosArrowForward size={20} className={`transition-transform duration-200 ${hoveredMenu === 'newsEvents' ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* People - Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setHoveredMenu('people')}
              >
                <Link to="/people" className={`${menuTextStyle} flex items-center gap-1`}>
                  Lab Members
                </Link>
              </div>
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
                  <Link to="/events" className={menuTextStyle} onClick={() => setDropdownOpen(false)}>Events</Link>
                  <Link to="/press" className={menuTextStyle} onClick={() => setDropdownOpen(false)}>Press</Link>
                  <Link to="/people" className={menuTextStyle} onClick={() => setDropdownOpen(false)}>People</Link>
                  {/* <Link to="/apply" className='hover:bg-blue-300 hover:text-white p-3 m-1 rounded-xl text-md font-medium text-blue-500' onClick={() => setDropdownOpen(false)}>Apply</Link> */}
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

export default NavbarCategorized;

