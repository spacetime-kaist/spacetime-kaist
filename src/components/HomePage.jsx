import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDataLoader } from '../hooks/useDataLoader';
// Import UI
import SeeMoreButton from './ui/SeeMoreButton';
import ScrollUpBt from '../utility/ScrollUpButton';
// Import assets
import mainImg from '../assets/mainImg.jpg';
import stilLogo from '../assets/stil_logo.png';
import pressImg from '../assets/images_20251029.jpg';
import ReactMarkdown from 'react-markdown';
import NavbarCategorized from '../utility/NavbarCategorized';

// to reduce cost, events in the same order
// const eventsMap = Object.fromEntries(eventsData.map(event=>[event.id, event]));
// const homeEventsData = homeEventsList.map(id => eventsMap[id])


export default function HomePage() {

  const { data: pressData, loading: pressLoading } = useDataLoader('pressData');
  const { data: researchData, loading: researchLoading } = useDataLoader('researchData');
  const { data: homeData, loading: homeLoading } = useDataLoader('homeData');
  const { data: eventsData, loading: eventsDataLoading } = useDataLoader('eventsData');
  
  const homeEventsList =  homeData?.homeEventsList || [];
  const loading = pressLoading || researchLoading || homeLoading || eventsDataLoading;
  const homeEventsData = loading?[]:eventsData.filter(event => homeEventsList.includes(event.id));

  // Slide Show
  const [slideIdx, setSlideIndex] = useState(0);

  useEffect(() => {
    if (!researchData || researchData.length === 0) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % researchData.length);
    }, 6000); // change every 7s
    return () => clearInterval(interval);
  }, [researchData]);

  const currentSlide = researchData?.[slideIdx];

  const [eventsIndex, setEventsIndex] = useState(0);
  const [eventsPerPage, setEventsPerPage] = useState(3);

  useEffect(() => {
    const mq1 = window.matchMedia('(max-width: 639px)');
    const mq2 = window.matchMedia('(min-width: 640px) and (max-width: 1023px)');
    const update = () => {
      if (mq1.matches) setEventsPerPage(1);
      else if (mq2.matches) setEventsPerPage(2);
      else setEventsPerPage(3);
      console.log('eventsPerPage', eventsPerPage);
    };
    update();
    mq1.addEventListener('change', update);
    mq2.addEventListener('change', update);
    
    return () => {
      
      mq1.removeEventListener('change', update);
      mq2.removeEventListener('change', update);
    };
  }, []);

  const eventsCount = homeEventsData?.length || 0;
  const totalPages = Math.max(1, Math.ceil(eventsCount / eventsPerPage));
  const lastStart = Math.max(0, eventsCount - eventsPerPage);

  useEffect(() => {
    setEventsIndex((i) => Math.min(i, lastStart));
  }, [eventsPerPage, lastStart]);

  const currentPage = totalPages > 1 ? Math.min(Math.floor(eventsIndex / eventsPerPage), totalPages - 1) : 0;
  const canGoLeft = totalPages > 1;
  const canGoRight = totalPages > 1;
  const goLeft = () => setEventsIndex((i) => (i <= 0 ? lastStart : i - eventsPerPage));
  const goRight = () => setEventsIndex((i) => (i >= lastStart ? 0 : i + eventsPerPage));
  const goToPage = (page) => setEventsIndex(Math.min(page * eventsPerPage, lastStart));

  const getEventDayMonth = (ev) => {
    if (!ev?.start) return { day: '', month: '', year: '' };
    const d = new Date(ev.start);
    return {
      day: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      year: d.getFullYear(),
    };
  };

  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const goRightOneCard = () => setEventsIndex((i) => (i >= eventsCount - 1 ? 0 : i + 1));
  const goLeftOneCard = () => setEventsIndex((i) => (i <= 0 ? Math.max(0, eventsCount - 1) : i - 1));
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const delta = touchStartX.current - endX;
    const threshold = 50;
    if (delta > threshold) goRightOneCard();
    else if (delta < -threshold) goLeftOneCard();
  };

  const carouselRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const update = () => setCarouselWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const CARD_WIDTH = 320;
  const CARD_GAP = 24;
  const CARD_STEP = CARD_WIDTH + CARD_GAP;
  const maxTranslate = carouselWidth / 2 - CARD_WIDTH / 2;
  const minTranslate = eventsCount > 0 ? carouselWidth / 2 - CARD_WIDTH / 2 - (eventsCount - 1) * CARD_STEP : 0;
  const translateX = carouselWidth > 0
    ? Math.min(maxTranslate, Math.max(minTranslate, carouselWidth / 2 - CARD_WIDTH / 2 - eventsIndex * CARD_STEP))
    : -eventsIndex * CARD_STEP;



  return (
    <div id='top' className="font-display flex flex-col justify-center items-center overflow-hidden">
    <div className="w-screen min-h-[100vh] min-w-[320px] bg-welcomeHome lg:bg-cover bg-contain bg-no-repeat">
    {/* Invisible div to fix navbar overlapping content */}
    <div className="w-full h-16"/>
    <NavbarCategorized />
    <ScrollUpBt />
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div
        className="relative h-[100vh] sm:h-[70vh] w-full bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{
          backgroundColor: "rgba(139, 161, 172, 1)",
          backgroundImage:
            `url('${mainImg}')`,
          transform: "translate3d(0,0,0)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
          // filter: "blur(5px)"
        }}
      >
        <h1 className="text-5xl sm:text-7xl text-white font-bold drop-shadow-xl px-4">
          Spacetime Intelligence Lab
        </h1>
        <p className="mt-6 text-sm sm:text-lg text-white px-5 sm:w-4xl">The research focus at Spacetime Intelligence Lab is spacetime Artificial Intelligence, and its implication in the urban context. The research scope ranges from traffic forecasting GNN models to autonomous driver workload assessment to urban air mobility feasibility study.</p>
              {/* <p className="mt-6 text-lg text-gray-600">Learn more about our research <a href="#" className='px-2 underline'>here</a>.</p> */}
        <div className="mt-8 flex flex-wrap gap-3 block sm:hidden">
          <a href="#projects" className="inline-flex items-center px-5 py-3 bg-black/70 text-white rounded-md text-sm font-semibold">Explore work</a>
          <a href="#people" className="inline-flex items-center px-5 py-3 bg-white/80 border border-gray-300 rounded-md text-sm">Contact us</a>
        </div>
      </div>
    <main>
        {/* DashBoard Section*/}
        <section id="research" className="p-3 mt-5 bg-white">
          <div className = "container">
            {/* <p className="mt-2 text-gray-600 max-w-2xl">Explanation of Research.</p> */}

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {id: 'urban-region', title: 'Urban Region Representation Learning', desc: 'Heterogeneity of diverse urban datasets by HUGAT.'},
                {id: 'uam',title: 'Urban Air Mobility', desc: 'UAM demand forecasting using existing helipads.'},
                {id: 'maritime', title: 'Maritime Transportation', desc: 'A novel deep learning-based vessel trajectory prediction framework for AIS data using AIS-ACNet.'},
                {id: 'traffic-forecasting', title: 'Traffic Forecasting', desc: 'A key technical enabler of the adaptive traffic management..'}
              ].map((f) => (
                <Link key={f.title} to={`/research/${f.id}`} className='no-underline text-inherit'>
                <article key={f.title} className="p-5 md:text-xl bg-gray-50 rounded-lg border border-gray-100 hover:shadow-xl">
                  <h3 className="font-semibold  md:text-xl">{f.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
                </article>
                </Link>
              ))}
              {/* {researchData.slice(0,4).map((f) => (
                <Link key={f.title} to={`/research/${f.id}`} className='no-underline text-inherit'>
                <article key={f.title} className="p-5 md:text-xl bg-gray-50 rounded-lg border border-gray-100 hover:shadow-xl">
                  <h3 className="font-semibold  md:text-xl">{f.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
                </article>
                </Link>
              ))} */}
            </div>
            <SeeMoreButton linkto="/research" />
          </div>
        </section>
        
        {/* Research (Slide) Section*/}
          <section id='slide' className="pt-25 pb-30 mt-40 mb-50 bg-gray-900/95 text-white will-change-contents">
          <div className = "container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{currentSlide?.title}</h1>
                {/* <h2 className="mt-4 text-2xl text-gray-700">Department of Civil and Environment Engineering, KAIST</h2> */}
                <p className="mt-6 text-lg text-gray-400">{currentSlide?.desc}</p>
                {/* <p className="mt-6 text-lg text-gray-600">Learn more about our research <a href="#" className='px-2 underline'>here</a>.</p> */}

                <div className="mt-8 w-90 text-xs text-gray-500">
                  {currentSlide?.research?.[0] && (
                  <div className='mb-5'>
                    <div className="font-semibold text-gray-300 mb-1">{currentSlide.research[0].title}</div>
                    <ReactMarkdown>{currentSlide.research[0].desc?.split(" ").slice(0, 12).join(` `) + "…"}</ReactMarkdown>
                  </div>
                  )}
                  {currentSlide?.research?.[1] && (
                  <div>
                    <div className="font-semibold text-gray-300 mb-1">{currentSlide.research[1].title}</div>
                    <ReactMarkdown>{currentSlide.research[1].desc?.split(" ").slice(0, 12).join(` `) + "…"}</ReactMarkdown>
                  </div>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to={`/research/${currentSlide?.id}`} className="inline-flex items-center px-5 py-3 bg-black text-white rounded-md text-sm font-semibold">Explore work</Link>
                  <a href="#people" className="inline-flex items-center px-5 py-3 border border-gray-300 rounded-md text-sm">Contact us</a>
                </div>

              </div>
              <div>
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-lg flex items-center justify-center py-5"> 
                    <img src={currentSlide?.thumbnail} alt="Main visual" className="relative object-cover h-full rounded-2xl brightness-90" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Press Section */}
        <section id="press" className="pt-20 pb-40">
          <div className="container">
            <h2 className="sectiontitle text-center font-serif">STIL in the Press</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className='col-span-3'>
                <a href='https://news.kaist.ac.kr/news/html/news/?mode=V&mng_no=53650'>
                  <div className={`relative w-full pb-[56.25%]
                                   rounded-md shadow-lg overflow-hidden
                                   flex flex-col text-bottom `}
                        style={{
                          backgroundImage:
                          `url('${pressData?.[0]?.image}')`,
                          backgroundColor: "rgba(153, 181, 197, 1)",
                          transform: "translate3d(0,0,0)",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundBlendMode: "multiply",
                        }}>
                    <h3 className="absolute bottom-15 text-2xl sm:text-4xl text-white font-bold drop-shadow-xl px-4 text-bottom">
                      {pressData?.[0]?.title}
                    </h3>
                    <div className="w-full absolute bottom-4 left-4 text-sm sm:text-lg font-bold flex flex-row justify-start items-start text-start">
                      <p className="mt-6 px-5 ">{pressData?.[0]?.writer}</p>
                      <p className="mt-6 text-slate-300 px-5">{pressData?.[0]?.date}</p>
                    </div>
                  </div>
                </a>
              </div>
              <div className='col-span-2'>
              <ReactMarkdown className="m-6 text-md lg:text-xl text-black border-l-4 border-black p-6">{pressData?.[0]?.desc}</ReactMarkdown>
              <div className="m-6 flex flex-wrap gap-3">
                  {pressData?.[0]?.link_kr &&<a href={pressData[0].link_kr} className="nline-flex hover:bg-slate-400 items-center px-5 py-3 border border-gray-300 rounded-md text-sm">KR</a>}
                  {pressData?.[0]?.link_en &&<a href={pressData[0].link_en} className="inline-flex hover:bg-slate-400 items-center px-5 py-3 border border-gray-300 rounded-md text-sm">EN</a>}
              </div>
              </div>
            </div>
            <div className=" my-8 text-blue-900/80"> 
                <strong>({pressData?.[0]?.date}) {pressData?.[0]?.title}</strong> -
                {pressData?.[0]?.link_others && pressData[0].link_others.map((link, index) => (
                      <><span className='pl-1'></span><a key={link.id} href={link.href} className="text-sm text-start hover:underline">{link.source}</a>{index < pressData[0].link_others.length - 1 && <span>,</span>}</> ))}
            </div>       
          </div>
        </section>

      
        
        {/* Events Section - carousel with date-led cards */}
        <section id="events" className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-600 to-slate-500" />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)' }} />
          <div className="container relative z-10">
            <h2 className="text-white text-center font-serif text-5xl md:text-7xl tracking-tight">Events</h2>
            <p className="pb-10 pt-4 flex justify-center text-slate-300 text-lg max-w-2xl mx-auto text-center">
              Explore our past events, conferences, and workshops.
            </p>

            <div className="relative flex items-center justify-center gap-3 px-2 sm:px-4">
              <button
                type="button"
                onClick={goLeft}
                disabled={!canGoLeft}
                className="hidden sm:flex shrink-0 w-12 h-12 rounded-full bg-white/20 text-white text-2xl font-light disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/30 transition-all border border-white/30 items-center justify-center"
                aria-label="Previous events"
              >
                ‹
              </button>

              <div
                ref={carouselRef}
                className="overflow-hidden w-full touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex gap-6 transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(${translateX}px)` }}
                >
                  {homeEventsData && homeEventsData.length > 0 && homeEventsData.map((ev, i) => {
                    const { day, month, year } = getEventDayMonth(ev);
                    const isActive = i === eventsIndex;
                    return (
                      <Link
                        key={ev.id ?? i}
                        to={`/events?scroll=${ev.id}`}
                        className={`group flex-shrink-0 w-[min(320px,85vw)] rounded-2xl bg-white shadow-lg overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent ${!isActive ? 'opacity-80 hover:opacity-90' : 'shadow-xl'}`}
                      >
                        <div className="p-5 pb-4">
                          <div className="mb-3">
                            <span className="block text-3xl font-bold leading-none text-slate-900">{day}</span>
                            <span className="block text-sm font-normal text-slate-700 mt-0.5">{month} {year}</span>
                            <div className="mt-2 h-px w-8 bg-slate-900" />
                          </div>
                          {/* {ev.category && (
                            <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-slate-500 bg-slate-100 rounded px-2 py-0.5 mb-2">
                              {ev.category}
                            </span>
                          )} */}
                          <h3 className="text-lg font-bold text-slate-900 mt-1 line-clamp-2 group-hover:text-slate-700">{ev.title}</h3>
                          {ev.place && (
                            <p className="text-xs text-sky-700 mt-1.5 line-clamp-1">{ev.place}</p>
                          )}
                          <ReactMarkdown className="text-sm text-slate-500 mt-2 line-clamp-3">{ev.desc?.replace(/\s+/g, ' ').trim()}</ReactMarkdown>
                          
                        </div>
                        <div className="aspect-[4/3] min-h-[140px] overflow-hidden bg-slate-100 rounded-b-2xl">
                          {ev.photos?.[0] ? (
                            <img src={ev.photos[0]} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <img src={stilLogo} alt="" className="h-full w-full object-contain p-6" />
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={goRight}
                disabled={!canGoRight}
                className="hidden sm:flex shrink-0 w-12 h-12 rounded-full bg-white/20 text-white text-2xl font-light disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/30 transition-all border border-white/30 items-center justify-center"
                aria-label="Next events"
              >
                ›
              </button>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => goToPage(p)}
                    className={`rounded-full transition-all ${
                      p === currentPage ? 'h-2.5 w-2.5 bg-white' : 'h-2 w-2 bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${p + 1}`}
                  />
                ))}
              </div>
            )}
            <div className="mt-8 flex justify-center">
              <SeeMoreButton linkto="/events" />
            </div>
          </div>
        </section>

        {/* <section id="contact" className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container">
            <div className="rounded-lg p-8 border border-gray-100 bg-white shadow-sm">
              <h3 className="text-2xl font-semibold">Get in touch</h3>
              <p className="mt-2 text-sm text-gray-600">For collaborations and inquiries send an email or use the form below.</p>

              <form className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                <input className="md:col-span-2 p-3 border rounded-md" placeholder="Your email" />
                <input className="p-3 border rounded-md" placeholder="Subject" />
                <textarea className="md:col-span-3 p-3 border rounded-md" rows={4} placeholder="Message" />
                <div className="md:col-span-3 text-right">
                  <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white">Send</button>
                </div>
              </form>
            </div>
          </div>
        </section> */}
    </main>
    <footer className="py-8 flex flex-col items-center bg-slate-800 text-slate-200 w-full">
        <div className="container">
        <div className='color-white p-8'>
        <h2 className='text-2xl font-bold text-sky-700 py-3'>Spacetime Intelligence Laboratory</h2>
        <h3 className='text-xl font-semibold text-slate-500 pb-2'>Contact</h3>
        <p>
          Address: W16 #410, KAIST, 291 Daehak-ro, Yuseong-gu, Daejeon, Republic
          of Korea
          <br />
          TEL: +82-42-350-3615
          <br />
          E-mail: yoonjin@kaist.ac.kr
        </p>
      </div>
        </div>
      </footer>
    </div>
    </div>
    </div>
  );
}
