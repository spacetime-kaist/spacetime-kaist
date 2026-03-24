import { Link } from 'react-router-dom';
// Import Data
import eventsData from '../uploads/eventsData';
import pressData from '../uploads/pressData';
import researchData from '../uploads/researchData';
// Import UI
import SeeMoreButton from './ui/SeeMoreButton';
import ScrollUpBt from '../utility/ScrollUpButton';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"
// Import assets
import mainImg from '../assets/mainImg.jpg';
import stilLogo from '../assets/stil_logo.png';
import Navbar from '../utility/Navbar';
import ReactMarkdown from 'react-markdown';
import { useEffect, useRef } from 'react';


// to reduce cost, events in the same order
// const eventsMap = Object.fromEntries(eventsData.map(event=>[event.id, event]));
// const homeEventsData = homeEventsList.map(id => eventsMap[id])

const EventsSlideCard = (event) =>(
    <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className='col-span-3'>
                <a href='https://news.kaist.ac.kr/news/html/news/?mode=V&mng_no=53650'>
                  <div className={`relative w-full pb-[56.25%]
                                   rounded-md shadow-lg overflow-hidden
                                   flex flex-col text-bottom `}
                        style={{
                          backgroundImage:
                          `url('${event.photos && event.photos[0]}')`,
                          backgroundColor: "rgba(153, 181, 197, 1)",
                          transform: "translate3d(0,0,0)",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundBlendMode: "multiply",
                        }}>
                    <h3 className="absolute bottom-15 text-2xl sm:text-4xl text-white font-bold drop-shadow-xl px-4 text-bottom">
                      {event.title}
                    </h3>
                    <div className="w-full absolute bottom-4 left-4 text-sm sm:text-lg font-bold flex flex-row justify-start items-start text-start">
                      <p className="mt-6 px-5 ">{event.participants}</p>
                      <p className="mt-6 text-slate-300 px-5">{event.place}</p>
                    </div>
                  </div>
                </a>
              </div>
              <div className='col-span-2'>
              <ReactMarkdown className="m-6 text-md lg:text-xl text-black border-l-4 border-black p-6">{event.desc}</ReactMarkdown>
              </div>
            </div>
)

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


export default function Test() {


const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = 300 + 16; // card width + gap in px
    let isScrolling = false;

    const handleWheel = (e) => {
      e.preventDefault(); // block vertical scroll

      if (isScrolling) return; // prevent multiple triggers
      isScrolling = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      el.scrollBy({
        left: direction * cardWidth*3,
        behavior: "smooth",
      });

      // allow next scroll after animation (~300ms)
      setTimeout(() => {
        isScrolling = false;
      }, 300);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => el.removeEventListener("wheel", handleWheel);
  }, []);


  return (
    <div id='top' className="font-display flex flex-col justify-center items-center overflow-hidden">
    <div className="w-screen min-h-[100vh] min-w-[320px] bg-welcomeHome lg:bg-cover bg-contain bg-no-repeat">
    {/* Invisible div to fix navbar overlapping content */}
    <div className="w-full h-16"/>
    <Navbar />
    <ScrollUpBt />
    <div className="min-h-screen bg-gray-50 text-gray-900">
    <main>

        {/* Events Section */}
        <section id="events" className="py-20 bg-slate-400 ">
        <>
      <img
        className='w-full h-[440px] object-cover'
        src='https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2607&q=80'
        alt=''
      />
      <div className='relative flex items-center'>
        <IoIosArrowBack className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
        <div
          className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'
        >
          {eventsData.slice(0,20).map((event) => (<div key={event.id} className='break-inside-avoid mb-3 w-[620px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'>
                <Link to={`/events#${event.id}`}>
                <EventsCard {...event} className="min-w-[300px]" />
                </Link>
                </div>
          ))}
        </div>
        <IoIosArrowForward className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
      </div>
    </>

        </section>
        {/* Events Section2 */}
        <section id="events" className="py-20 bg-slate-400 ">
          <div className="container">
            <h2 className="text-white text-center font-serif text-5xl md:text-7xl ">Events2</h2>
            {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 gap-6"> */}
            <p className="pb-15 pt-5 flex justify-center text-gray-300 "> Explore our past events, conferences, and workshops.</p>
            <div className="flex justify-between items-center mb-6">
        </div>
        <div className='relative flex items-center'>
        <IoIosArrowBack className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
        <div
          id='slider'
          className='w-full  overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'
        >
          {eventsData.slice(0,20).map((event) => (<div key={event.id} className='break-inside-avoid mb-3 h-[620px] max-w-[500px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'>
                <Link to={`/events#${event.id}`}>
                <EventsCard {...event} className="min-w-[300px]" />
                </Link>
                </div>
          ))}
        </div>
        <IoIosArrowForward className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
      </div>
      
      <div className='relative flex items-center'>
        <IoIosArrowBack className='opacity-50 m-3 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
        <div
       
          className="flex overflow-x-scroll overflow-y-hidden gap-6 scroll-smooth scrollbar-hide"
        >
          {eventsData && eventsData.slice(0,20).map((ev, i) => (
            <div
              key={i}
              className="min-w-[300px] max-w-[400px] flex-shrink-0 rounded-2xl shadow-md hover:shadow-lg transition-all bg-white"
            >
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{ev.date}</p>
                <h3 className="text-xl font-semibold mb-2">{ev.title}</h3>
                <p className="text-gray-700 text-sm">{ev.desc}</p>
              </div>
              <div className="flex flex-col gap-2">
        {ev.photos ? ev.photos.slice(0,1).map((photo, idx) => (
          <img
            key={idx}
            src={`${photo}`}
            alt={`${ev.title} photo ${idx + 1}`}
            className="w-full object-cover"
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
        <IoIosArrowForward className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
      </div>
            <SeeMoreButton linkto="/events" />
          </div>
        </section>

        {/* Events Section2 */}
        <section id="events" className="py-20 bg-slate-400 ">
          <div className=" justify-self-center max-w-[96rem] mask-x-from-99% mask-x-to-100%">
            <h2 className="text-white text-center font-serif text-5xl md:text-7xl ">Events3</h2>
            {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 gap-6"> */}
            <p className="pb-15 pt-5 flex justify-center text-gray-300 "> Explore our past events, conferences, and workshops.</p>
            <div className="flex justify-between items-center mb-6">
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-scroll overflow-y-hidden gap-6 scroll-smooth scrollbar-hide snap-x snap-mandatory [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)"
        >
          {eventsData && eventsData.slice(0,20).map((ev, i) => (
            <div
              key={i}
              className="snap-center min-w-[400px] max-w-[400px] flex-shrink-0 rounded-2xl shadow-md hover:shadow-lg transition-all bg-white"
            >
                <img
                    src={ev.photos?ev.photos[0]:stilLogo}
                    alt={ev.title}
                    className="w-full h-[300px] object-cover rounded-2xl"
                    />
              <div className="p-6">
                
                <h3 className="text-xl font-semibold mb-2">{ev.title}</h3>
                <div className='mb-5'>
                {ev.desc && <ReactMarkdown>{ev.desc.split(" ").slice(0, 20).join(` `) + "…"}</ReactMarkdown>}
                </div>
                <p className="justify-end text-sm text-gray-500 mb-2">{ev.place}</p>
                <p className="text-sm text-gray-500 mb-2">{ev.keywords}</p>
              </div>
              
            </div>
          ))}
        </div>
            <SeeMoreButton linkto="/events" />
          </div>
        </section>

        {/* Events Section2 */}
        <section id="events" className="py-20 bg-slate-400 ">
          <div className="container">
            <h2 className="text-white text-center font-serif text-5xl md:text-7xl ">Events4</h2>
            {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 gap-6"> */}
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
        //   ref={scrollRef}
          className="snap-x flex overflow-x-scroll overflow-y-hidden gap-6 scroll-smooth scrollbar-hide snap-x snap-mandatory [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)"
        >
          {eventsData && eventsData.slice(0,20).map((event, i) => (
            <div
              key={i}
              className="snap-center w-full flex-shrink-0 rounded-2xl shadow-md hover:shadow-lg transition-all bg-white"
            >
                <EventsSlideCard {...event} className="min-w-[300px]" />
            </div>
          ))}
        </div>
            <SeeMoreButton linkto="/events" />
          </div>
        </section>

        

        {/* Events Section */}
        <section id="events" className="py-20 bg-slate-400 ">
          <div className="container">
            <h2 className="text-white text-center font-serif text-5xl md:text-7xl ">Events</h2>
            {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 gap-6"> */}
            <p className="pb-20 pt-5 flex justify-center text-gray-300 "> Explore our past events, conferences, and workshops.</p>
            <div className="mt-6 columns-1 md:columns-2 lg:columns-3 gap-6">
              {eventsData && eventsData.slice(0,20).map((event) => (
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
          
    </main>
    </div>
    </div>
    </div>
  );
}
