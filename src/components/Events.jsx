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
      <ReactMarkdown>{event.desc}</ReactMarkdown>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {event.youtube && 
        <iframe
          src={event.youtube}
          alt={`${event.title} youtube`}
          className="w-120 h-70 rounded-md"
        />
      }
      {event.photos && event.photos.map((photo, idx) => (
        <img
          key={idx}
          src={`${import.meta.env.VITE_PUBLIC_URL}${photo}`}
          alt={`${event.title} photo ${idx + 1}`}
          className="w-full rounded-md"
        />
      ))}
    </div>
  </article>
);

const EventGridCard = ( event ) => (
  <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
    <h2 className="text-2xl font-bold">{event.title}</h2>
    <p className="text-sm text-gray-500 mb-2">{event.date}</p>
    <p className="text-sm text-sky-600 mb-1"><span className='font-bold'>Participants: </span>{event.participants}</p>
    <p className="text-sm text-sky-500 mb-4">Keywords: {event.keywords}</p>

  <div className="prose prose-gray break-all overflow-auto max-w-none mb-6 text-gray-700 text-lg p">
      <ReactMarkdown>{event.desc}</ReactMarkdown>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {event.youtube ? ( 
        <iframe
          src={event.youtube}
          alt={`${event.title} youtube`}
          className="w-200 h-100 rounded-md col-span-2 row-span-2 object-cover"
        />
      ) : (
      event.photos && <img src={`${import.meta.env.VITE_PUBLIC_URL}/${event.photos[0]}`} className="col-span-2 row-span-2 object-cover rounded-md" />
      )}
      {event.photos && event.photos.slice(1).map((photo, idx) => (
        <img
          key={idx}
          src={`${import.meta.env.VITE_PUBLIC_URL}${photo}`}
          alt={`${event.title} photo ${idx + 1}`}
          className="object-cover rounded-lg"
        />
      ))}
    </div>
  </article>
);

const EventMasonryCard = ( event ) => (
  <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
    <h2 className="text-2xl font-bold">{event.title}</h2>
    <p className="text-sm text-gray-500 mb-2">{event.date}</p>
    <p className="text-sm text-sky-600 mb-1"><span className='font-bold'>Participants: </span>{event.participants}</p>
    <p className="text-sm text-sky-500 mb-4">Keywords: {event.keywords}</p>

  <div className="prose prose-gray overflow-auto max-w-none mb-6 text-gray-700 text-lg p">
      <ReactMarkdown>{event.desc}</ReactMarkdown>
    </div>

    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {event.youtube && 
        <iframe
          src={event.youtube}
          alt={`${event.title} youtube`}
          className="w-120 h-70 rounded-md object-cover"
        />
      }
      {event.photos && event.photos.map((photo, idx) => (
        <img
          key={idx}
          src={`${import.meta.env.VITE_PUBLIC_URL}${photo}`}
          alt={`${event.title} photo ${idx + 1}`}
          className="mb-2 w-full rounded-md object-cover"
        />
      ))}
    </div>
  </article>
);

export default function EventsPage() {
  return (
    <>
      <header className="py-5">
        <div className='container'>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Explore our past and upcoming events, conferences, and workshops.
          </p>
        </div>
      <div className='divider' />
      </header>
 
      <main className="py-1">
        <div className="container">
          {eventsData.map((event, idx) => (
            <EventGridCard key={idx} {...event} />
          ))}
        </div>
      </main>
    </>
  );
}
