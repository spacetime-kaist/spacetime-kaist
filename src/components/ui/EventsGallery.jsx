import React from 'react'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import stilLogo from '../../assets/stil_logo.png'

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

export default function EventsGallery({id,title,description,data,linkto}) {
  return (
    <section id={id} className="py-20 bg-slate-400 ">
          <div className="container">
            <h2 className="text-white text-center font-serif text-5xl md:text-7xl ">{title}</h2>
            {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 gap-6"> */}
            <p className="pb-20 pt-5 flex justify-center text-gray-300 ">{description}</p>
            <div className="mt-6 columns-1 md:columns-2 lg:columns-3 gap-6">
              {data && data.length > 0 && data.slice(0,20).map((event) => (
                <div key={event.id} className='break-inside-avoid mb-3'>
                <Link to={`${linkto}#${event.id}`}>
                <EventsCard {...event} className="min-w-[300px]" />
                </Link>
                </div>
              ))}
            </div>
            <SeeMoreButton linkto={linkto} /> 
          </div>
    </section>
  )
}