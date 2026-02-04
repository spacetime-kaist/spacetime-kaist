import React, { useEffect, useRef, useState, version } from 'react';
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

// image and txt
const EventsCard = (event) => (
  <figure className="bg-white hover:bg-white/90 border border-slate-200 shadow shadow-sm hover:shadow-2xl transition-transform duration-500 hover:scale-120 ">
    <div className=" m-7 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center">
      <div className="flex flex-col gap-2">
        {event.photos ? event.photos.slice(0,1).map((photo, idx) => (
          <img
            key={idx}
            src={`${photo}`}
            alt={`${event.title} photo ${idx + 1}`}
            className="w-full object-fill"
          />
          ))
        :
          <img
            src={stilLogo}
            alt={'default photo'}
            className="w-full h-48 object-cover"
          />
        }
      </div>
    </div>
    <figcaption className="p-4 bg-white ">
      <div className="text-lg sm:text-2xl text-slate-900">{event.title}</div>
      <div className="text-md text-blue-400 mt-1">{event.place}</div>
      {/* <div className="text-sm text-blue-500 mt-1">{event.keywords}</div> */}
    </figcaption>
  </figure>
);


export default function HomePage() {
  const { data: eventsDataObj, loading: eventsLoading } = useDataLoader('eventsData');
  const { data: pressData, loading: pressLoading } = useDataLoader('pressData');
  const { data: researchData, loading: researchLoading } = useDataLoader('researchData');
  
  const eventsData = eventsDataObj?.eventsData || [];
  const homeEventsList = eventsDataObj?.homeEventsList || [];
  const loading = eventsLoading || pressLoading || researchLoading;

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

  const scrollRef = useRef(null);
  const handleWheel = (e) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY*5;
    }
  };
  const scroll = (direction) => {
  if (!scrollRef.current) return;
  scrollRef.current.scrollBy({ left: direction === "left" ? -900 : 900, behavior: "smooth" });
};



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

        

        {/* Events Section */}
        <section id="events" className="py-20 bg-slate-400 ">
          <div className="container">
            <h2 className="text-white text-center font-serif text-5xl md:text-7xl ">Events</h2>
            {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 gap-6"> */}
            <p className="pb-20 pt-5 flex justify-center text-gray-300 "> Explore our past events, conferences, and workshops.</p>
            <div className="mt-6 columns-1 md:columns-2 lg:columns-3 gap-6">
              {eventsData && eventsData.length > 0 && eventsData.slice(0,20).map((event) => (
                <div key={event.id} className='break-inside-avoid mb-3'>
                <Link to={`/events#${event.id}`}>
                <EventsCard {...event} className="min-w-[300px]" />
                </Link>
                </div>
              ))}
            </div>
            <SeeMoreButton linkto="/events" />
          </div>
        </section>
        
        {/* Events Section2 */}
        {/* <section id="events" className="py-20 bg-slate-400 ">
          <div className="container">
            <h2 className="text-white text-center font-serif text-5xl md:text-7xl ">Events</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 gap-6">
            <p className="pb-15 pt-5 flex justify-center text-gray-300 "> Explore our past events, conferences, and workshops.</p>
            <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <div variant="ghost" size="icon" onClick={() => scroll("left")}>
              {'<'}
            </div>
            <div variant="ghost" size="icon" onClick={() => scroll("right")}>
              {'>'}
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          onWheel = {handleWheel}
          className="flex overflow-x-scroll overflow-y-hidden gap-6 scroll-smooth scrollbar-hide snap-x snap-mandatory [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)"
        >
          {eventsData && eventsData.length > 0 && eventsData.slice(0,20).map((ev, i) => (
            <div
              key={i}
              className="min-w-[400px] max-w-[400px] flex-shrink-0 rounded-2xl shadow-md hover:shadow-lg transition-all bg-white"
            >
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{ev.date}</p>
                <h3 className="text-xl font-semibold mb-2">{ev.title}</h3>
                <p className="text-gray-700 text-sm">{ev.desc}</p>
              </div>
              <div className="max-w-[300px] flex flex-col gap-2">
                {ev.photos ? ev.photos.slice(0,1).map((photo, idx) => (
                  <img
                    key={idx}
                    src={`${photo}`}
                    alt={`${ev.title} photo ${idx + 1}`}
                    className="w-full object-fill"
                  />
                  ))
                :
                  <img
                    src={stilLogo}
                    alt={'default photo'}
                    className="w-full h-48 object-cover"
                  />
                }
            </div>
            </div>
          ))}
        </div>
            <SeeMoreButton linkto="/events" />
          </div>
        </section> */}

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
