import { Link } from 'react-router-dom';
import { React, useState, useRef, useEffect } from 'react';

import stil_logo from '../assets/stil_logo.png'
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io"
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5"

import { useDataLoader } from '../hooks/useDataLoader';

function NavbarCategorized() {
  const menuTextStyle =
    "hover:bg-blue-300 hover:text-white px-3 py-2 m-1 rounded-xl text-sm font-medium text-gray-700 transition-colors duration-200";

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isPublicationsOpen, setPublicationsOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const menuRef = useRef(null);
  const navbarRef = useRef(null);
  const megaMenuRef = useRef(null);

  const { data: researchData } = useDataLoader('researchData');
  const { data: projectsData } = useDataLoader('projectsData');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setPublicationsOpen(false);
      }
      // Mega menu lives outside `navbarRef`, so exclude it from "outside click".
      const clickInsideMegaMenu =
        megaMenuRef.current && megaMenuRef.current.contains(event.target);
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        !clickInsideMegaMenu
      ) {
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

  const menuConfigs = {
    research: {
      title: "Research",
      categories: [
        {
          categoryTitle: "Research",
          link: "/research",
          items: (researchData || []).slice(0, 6).map(r => ({
            title: (r.menuTitle !== '') ? r.menuTitle : r.title,
            link: `/research/${r.id}`,
            desc: r.desc || ""
          }))
        }
      ]
    },
    projects: {
      title: "Projects",
      link: "/projects"
      // categories: [
      //   {
      //     categoryTitle: "Projects",
      //     link: "/projects",
      //     items: (projectsData || []).filter(p => p.active===true).map(p => ({
      //       title: p.title,
      //       link: p.type === "internal" ? `/projects${p.link}` : p.link,
      //       desc: "",
      //       external: p.type === "external"
      //     }))
      //   }
      // ]
    },
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
      title: "People",
      link: "/people",
      categories: [
        {
          categoryTitle: "People",
          link: "/people",
          items: [
            { title: "Professor", link: "/people#professor" },
            { title: "Lab People", link: "/people#labpeople" },
            { title: "Alumni", link: "/people#alumni" }
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
        className="fixed left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-xl z-40 top-16 lg:top-[4.5rem]"
        style={{ animation: 'megaFadeIn 0.18s ease-out both' }}
        onMouseEnter={() => setHoveredMenu(menuKey)}
        onMouseLeave={() => setHoveredMenu(null)}
      >
        {/* top accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400" />

        <div className="container py-7">
          {config.categories ? (
            config.categories.map((category, catIdx) => (
              <div
                key={catIdx}
                className={catIdx > 0 ? "mt-8 pt-8 border-t border-gray-100" : ""}
              >
                <div className="flex gap-8">
                  {/* Category header */}
                  {category.link ? (
                    <Link
                      to={category.link}
                      className="flex-shrink-0 w-44 group"
                      onClick={() => setHoveredMenu(null)}
                    >
                      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                        Section
                      </h2>
                      <p className="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-150">
                        {category.categoryTitle}
                      </p>
                      <span className="text-xs text-blue-500 group-hover:text-blue-700 mt-1 inline-flex items-center gap-0.5 transition-colors duration-150">
                        View All <IoIosArrowForward size={12} />
                      </span>
                    </Link>
                  ) : (
                    <div className="flex-shrink-0 w-44">
                      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                        Section
                      </h2>
                      <p className="text-base font-bold text-gray-800">
                        {category.categoryTitle}
                      </p>
                    </div>
                  )}

                  {/* Items grid */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                    {category.items.map((item, idx) =>
                      item.external ? (
                        <a
                          key={idx}
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors duration-150"
                          style={{ animationDelay: `${idx * 30}ms`, animationFillMode: 'both' }}
                        >
                          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-150">
                            {item.title}
                          </span>
                          <span className="text-xs text-blue-400 mt-0.5">External →</span>
                        </a>
                      ) : (
                        <Link
                          key={idx}
                          to={item.link}
                          className="group flex flex-col px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors duration-150"
                          style={{ animationDelay: `${idx * 30}ms`, animationFillMode: 'both' }}
                          onClick={() => setHoveredMenu(null)}
                        >
                          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-150">
                            {item.title}
                          </span>
                          {/* {item.desc && item.desc.trim() && (
                            <span className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                              {item.desc}
                            </span>
                          )} */}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-44">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                  Section
                </h2>
                <p className="text-base font-bold text-gray-800">{config.title}</p>
              </div>
              <div className="flex-1 flex flex-wrap gap-3">
                {config.items && config.items.map((item, idx) =>
                  item.external ? (
                    <a
                      key={idx}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-150 min-w-36"
                    >
                      {/* {item.icon && <span className="text-2xl">{item.icon}</span>} */}
                      <div>
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-150">
                          {item.title}
                        </p>
                        {item.desc && (
                          <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                        )}
                      </div>
                    </a>
                  ) : (
                    <Link
                      key={idx}
                      to={item.link}
                      className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-150 min-w-36"
                      onClick={() => setHoveredMenu(null)}
                    >
                      {/* {item.icon && <span className="text-2xl">{item.icon}</span>} */}
                      <div>
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-150">
                          {item.title}
                        </p>
                        {item.desc && (
                          <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                        )}
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        <style>{`
          @keyframes megaFadeIn {
            from { opacity: 0; transform: translateY(-6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  };

  return (
    <>
      <div ref={navbarRef} className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="no-tracking-tight" onClick={() => setHoveredMenu(null)}>
              <img src={stil_logo} alt="STIL Logo" className="min-w-16 h-18" />
            </Link>

            <div className="flex items-center gap-2">
              {/* -------------- Desktop Menu -------------- */}
              <div className="hidden md:flex gap-1 items-center">

                <div
                  className="relative"
                  onMouseEnter={() => setHoveredMenu(null)}
                >
                  <Link to="/" className={menuTextStyle}>Home</Link>
                </div>

                <div
                  className="relative"
                  onMouseEnter={() => setHoveredMenu('publications')}
                >
                  <Link to="/publications" className={`${menuTextStyle} inline-flex items-center gap-1`}>
                    Publications
                    <IoIosArrowDown
                      size={14}
                      className={`transition-transform duration-200 ${hoveredMenu === 'publications' ? 'rotate-180' : ''}`}
                    />
                  </Link>
                </div>

                <div
                  className="relative"
                  onMouseEnter={() => setHoveredMenu('research')}
                >
                  <Link to="/research" className={`${menuTextStyle} inline-flex items-center gap-1`}>
                    Research
                    <IoIosArrowDown
                      size={14}
                      className={`transition-transform duration-200 ${hoveredMenu === 'research' ? 'rotate-180' : ''}`}
                    />
                  </Link>
                </div>

                <div
                  className="relative"
                >
                  <Link to="/projects" className={`${menuTextStyle} inline-flex items-center gap-1`}>
                    Projects

                  </Link>
                </div>

                <div
                  className="relative"
                  onMouseEnter={() => setHoveredMenu('newsEvents')}
                >
                  <button
                    className={`${menuTextStyle} inline-flex items-center gap-1 focus:outline-none`}
                  >
                    News
                    <IoIosArrowDown
                      size={14}
                      className={`transition-transform duration-200 ${hoveredMenu === 'newsEvents' ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>

                <div
                  className="relative"
                >
                  <Link to="/people" className={`${menuTextStyle} inline-flex items-center gap-1`}>
                    People
                  </Link>
                </div>

                {/* <Link
                  to="/apply"
                  className={`text-blue-600 ${menuTextStyle} ml-2 px-4 py-2 rounded-xl  text-sm font-medium transition-colors duration-200`}
                  onMouseEnter={() => setHoveredMenu(null)}
                >
                  Apply
                </Link> */}
              </div>

              {/* -------------- Mobile Menu -------------- */}
              <div ref={menuRef} className="relative md:hidden">
                <button
                  onClick={() => {
                    setDropdownOpen(!isDropdownOpen);
                    setPublicationsOpen(false);
                  }}
                  className="focus:outline-none"
                >
                  <div className="bg-sky-600 text-white hover:bg-blue-700 inline-flex items-center justify-center w-10 h-10 rounded-md transition-colors duration-200">
                    {isDropdownOpen ? <IoCloseSharp size={20} /> : <IoMenuSharp size={20} />}
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 p-2 flex flex-col bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl z-50">
                    <Link to="/" className={menuTextStyle} onClick={() => setDropdownOpen(false)}>Home</Link>

                    <div>
                      <div className="flex items-center">
                        <button
                          onClick={() => setPublicationsOpen(!isPublicationsOpen)}
                          className={`${menuTextStyle} flex items-center gap-1 w-full`}
                        >
                          {isPublicationsOpen
                            ? <IoIosArrowDown size={14} />
                            : <IoIosArrowForward size={14} />}
                          Publications
                        </button>
                      </div>
                      {isPublicationsOpen && (
                        <div className="ml-4 border-l-2 border-blue-200 pl-3 mb-1">
                          <Link to="/publications" className="block py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setDropdownOpen(false)}>
                            Journal Publications
                          </Link>
                          <Link to="/conference" className="block py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setDropdownOpen(false)}>
                            Conference Proceedings
                          </Link>
                        </div>
                      )}
                    </div>

                    <Link to="/research" className={menuTextStyle} onClick={() => setDropdownOpen(false)}>Research</Link>
                    <Link to="/projects" className={menuTextStyle}>Projects</Link>
                    <Link to="/events" className={menuTextStyle} onClick={() => setDropdownOpen(false)}>Events</Link>
                    <Link to="/press" className={menuTextStyle} onClick={() => setDropdownOpen(false)}>Press</Link>
                    <Link to="/people" className={menuTextStyle}>People</Link>
                    <div className="mt-1 pt-1 border-t border-gray-100">
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mega Menus */}
      {hoveredMenu && renderMegaMenu(hoveredMenu)}
    </>
  );
}

export default NavbarCategorized;
