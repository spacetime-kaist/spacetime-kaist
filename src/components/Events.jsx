import React from 'react';
import ReactMarkdown from 'react-markdown';
import eventsData from '../uploads/eventsData';

const EventCard = ( event ) => (
  <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
    <h2 className="text-2xl font-bold">{event.title}</h2>
    <p className="text-sm text-gray-500 mb-2">{event.date}</p>
    <p className="text-sm text-sky-600 mb-1"><span className='font-bold'>Participants: </span>{event.participants}</p>
    <p className="text-sm text-sky-500 mb-4">Keywords: {event.keywords}</p>

  <div className="prose prose-gray break-all overflow-auto max-w-none mb-6 text-gray-700 text-lg p">
      <ReactMarkdown className='markdown'>{event.desc}</ReactMarkdown>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {event.youtube && 
        <iframe
          src={`${event.youtube}&origin=https://spacetime.kaist.ac.kr/`}
          alt={`${event.title} youtube`}
          className="w-full aspect-video rounded-md"
        />
      }
      {event.photos && event.photos.map((photo, idx) => (
        <img
          key={idx}
          src={`${photo}`}
          alt={`${event.title} photo ${idx + 1}`}
          className="w-full rounded-md"
        />
      ))}
    </div>
  </article>
);

const EventGridCard = ( event ) => (
  <article id={event.id} className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
    <h2 className="text-2xl font-bold">{event.title}</h2>
    <p className="text-sm text-gray-500 mb-2">{event.date}</p>
    <p className="text-sm text-sky-600 mb-1"><span className='font-bold'>Participants: </span>{event.participants}</p>
    <p className="text-sm text-sky-500 mb-4">Keywords: {event.keywords}</p>

  <div className="prose prose-gray break-all overflow-auto max-w-none mb-6 text-gray-700 text-lg p">
      <ReactMarkdown className='markdown'>{event.desc}</ReactMarkdown>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {event.youtube ? ( 
        <iframe
          src={`${event.youtube}&origin=https://spacetime.kaist.ac.kr/`}
          alt={`${event.title} youtube`}
          className="w-full aspect-video rounded-md col-span-2 row-span-2 object-cover"
        />
      ) : (
      event.photos && <img src={`/${event.photos[0]}`} className="col-span-2 row-span-2 object-cover rounded-md" />
      )}
      {event.photos && event.photos.slice(1).map((photo, idx) => (
        <img
          key={idx}
          src={`${photo}`}
          alt={`${event.title} photo ${idx + 1}`}
          className="object-cover rounded-lg"
        />
      ))}
    </div>
  </article>
);

const EventMasonryCard = ( event ) => (
  <article id={event.id} className="p-5 lg:p-16 bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
    <h2 className="text-2xl sm:text-3xl font-semibold pb-2">{event.title}</h2>
    <p className="text-sm text-gray-500 mb-2">{event.date}</p>
    <p className="text-sm text-sky-600 mb-1"><span className='font-bold'>Participants: </span>{event.participants}</p>
    <p className="text-sm text-sky-500 mb-4">Keywords: {event.keywords}</p>

  <div className="prose prose-gray overflow-auto max-w-6xl mb-6 text-gray-700 text-lg p">
      <ReactMarkdown className='markdown'>{event.desc}</ReactMarkdown>
    </div>
    <div className='flex justify-center'>
      {event.youtube && 
        <iframe
          src={`${event.youtube}&origin=https://spacetime.kaist.ac.kr/`}
          alt={`${event.title} youtube`}
          className="w-4xl aspect-video rounded-md object-cover border border-gray-300"
        />
      }
      {event.photos && 
      <div className={`columns-1 ${event.photos.length>1?'md:columns-2':null} gap-4`}>
      {event.photos.map((photo, idx) => (
        <img
          key={idx}
          src={`${photo}`}
          alt={`${event.title} photo ${idx + 1}`}
          className={`mb-2 ${event.photos.length>1?'w-full':'w-4xl'} rounded-md`}
        />))}
      </div>
      }
    </div>
  </article>
);


export default function EventsPage() {
  return (
    <>
      <header className="py-5">
        <div className='container'>
          <h1 className="pagetitle">Events</h1>
          <p className="flex justify-center text-gray-600">
            Explore our past events, conferences, and workshops.
          </p>
        <div className='divider' />
        </div>
      </header>
 
      <main className="py-1">
        <div className="container">
          {eventsData.map((event) => (
            <EventMasonryCard key={event.id} {...event} />
          ))}
        </div>
      </main>
    </>
  );
}
