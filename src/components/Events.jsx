import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useDataLoader } from '../hooks/useDataLoader';

const formatDate = (start, end) => {
  if (!start) return null;
  const daySuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  const startDate = new Date(start);
  const startDay = startDate.getDate();
  const startDaySuffix = daySuffix(startDay);
  const startMonth = startDate.toLocaleDateString('en-US', { month: 'long' });
  const startYear = startDate.getFullYear();

  if (!end || start === end) {
    return `${startMonth} ${startDay}${startDaySuffix}, ${startYear}`;
  }
  const endDate = new Date(end);
  if (startDate.getTime() === endDate.getTime()) {
    return `${startMonth} ${startDay}${startDaySuffix}, ${startYear}`;
  }
  const endDay = endDate.getDate();
  const endDaySuffix = daySuffix(endDay);
  const endMonth = endDate.toLocaleDateString('en-US', { month: 'long' });
  const endYear = endDate.getFullYear();
  if (startYear !== endYear) {
    return `${startMonth} ${startDay}${startDaySuffix}, ${startYear} – ${endMonth} ${endDay}${endDaySuffix}, ${endYear}`;
  }
  if (startMonth !== endMonth) {
    return `${startMonth} ${startDay}${startDaySuffix} – ${endMonth} ${endDay}${endDaySuffix}, ${startYear}`;
  }
  return `${startMonth} ${startDay}${startDaySuffix}–${endDay}${endDaySuffix}, ${startYear}`;
};

const categoryStyles = {
  presentation: 'bg-sky-100 text-sky-800',
  conference: 'bg-violet-100 text-violet-800',
  workshop: 'bg-emerald-100 text-emerald-800',
  exhibition: 'bg-amber-100 text-amber-800',
  meeting: 'bg-slate-100 text-slate-700',
  award: 'bg-rose-100 text-rose-800',
};
const getCategoryStyle = (category) => categoryStyles[category] || 'bg-slate-100 text-slate-600';

const EventCard = ( event ) => (
  <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
    <h2 className="text-2xl font-bold">{event.title}</h2>
    <p className="text-sm text-gray-500 mb-2">{event.place}</p>
    <p className="text-sm text-sky-600 mb-1"><span className="font-bold">Participants: </span>{event.participants}</p>
    {event.keyword?.length > 0 && (
      <p className="text-sm text-sky-500 mb-4">Keywords: {event.keyword.map((k, idx) => <span key={idx}>#{k}</span>)}</p>
    )}

    <div className="prose prose-gray break-all overflow-auto max-w-none mb-6 text-gray-700 text-lg p">
      <ReactMarkdown className="markdown">{event.desc}</ReactMarkdown>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {event.youtube && (
        <iframe
          src={`${event.youtube}&origin=https://spacetime.kaist.ac.kr/`}
          title={`${event.title} youtube`}
          className="w-full aspect-video rounded-md"
        />
      )}
      {event.photos?.map((photo, idx) => (
        <img
          key={idx}
          src={photo}
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
    <p className="text-sm text-gray-500 mb-2">{event.place}</p>
    <p className="text-sm text-sky-600 mb-1"><span className="font-bold">Participants: </span>{event.participants}</p>
    {event.keyword?.length > 0 && (
      <p className="text-sm text-sky-500 mb-4">Keywords: {event.keyword.map((k, idx) => <span key={idx}>#{k}</span>)}</p>
    )}

    <div className="prose prose-gray break-all overflow-auto max-w-none mb-6 text-gray-700 text-lg p">
      <ReactMarkdown className="markdown">{event.desc}</ReactMarkdown>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {event.youtube ? (
        <iframe
          src={`${event.youtube}&origin=https://spacetime.kaist.ac.kr/`}
          title={`${event.title} youtube`}
          className="w-full aspect-video rounded-md col-span-2 row-span-2 object-cover"
        />
      ) : event.photos?.[0] && (
        <img src={event.photos[0]} alt="" className="col-span-2 row-span-2 object-cover rounded-md" />
      )}
      {event.photos?.slice(1).map((photo, idx) => (
        <img
          key={idx}
          src={photo}
          alt={`${event.title} photo ${idx + 2}`}
          className="object-cover rounded-lg"
        />
      ))}
    </div>
  </article>
);

const EventMasonryCard = (event) => (
  <article
    id={event.id}
    className="mb-6 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition-shadow hover:shadow-md"
  >
    {/* Hero image */}
    {/* {event.photos?.[0] && (
      <div className="aspect-[3/1] max-h-40 w-full overflow-hidden bg-slate-100">
        <img
          src={event.photos[0]}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    )} */}

    <div className="p-4 sm:p-5">
      {/* Category, award, date & place */}
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        {event.category && (
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${getCategoryStyle(event.category)}`}>
            {event.category}
          </span>
        )}
        {event.award && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
            🏆 {event.award}
          </span>
        )}
      </div>
      <div className="mb-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-0 text-xs text-slate-500">
        {formatDate(event.start, event.end) && (
          <time className="font-medium">{formatDate(event.start, event.end)}</time>
        )}
        {event.place && (
          <span className="flex items-center gap-1">
            <span className="text-slate-400">·</span>
            <span>{event.place}</span>
          </span>
        )}
      </div>

      <h2 className="mb-2 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
        {event.title}
      </h2>

      {/* Participants */}
      {event.participants && (
        <div className="mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Participants</span>
          <p className="mt-0.5 text-sm text-slate-600 line-clamp-2">{event.participants}</p>
        </div>
      )}

      {/* Keywords as tags */}
      {event.keyword?.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {event.keyword.map((k, idx) => (
            <span
              key={idx}
              className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
            >
              #{k}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <div className="prose prose-slate prose-sm max-w-none overflow-auto mb-3 text-slate-700">
        <ReactMarkdown className="markdown">{event.desc}</ReactMarkdown>
      </div>

      {/* Links */}
      {event.links?.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {event.links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-700"
            >
              {link.label || link.source}
              <span aria-hidden>→</span>
            </a>
          ))}
        </div>
      )}

      {/* Media: YouTube then photo gallery */}
      <div className="space-y-4">
      {event.youtube && (
        <iframe
          src={`${event.youtube}&origin=https://spacetime.kaist.ac.kr/`}
          title={`${event.title} youtube`}
          className="w-full max-w-4xl aspect-video rounded-md object-cover border border-gray-300"
        />
      )}
        {event.photos && event.photos.length > 0 && (
          <div>
            <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Photos</span>

        <div className={`columns-1 ${event.photos.length > 1 ? 'sm:columns-2 lg:columns-3' : ''} gap-4 w-full max-w-6xl`}>
          {event.photos.map((photo, idx) => (
            <img
              key={idx}
              src={photo}
              alt={`${event.title} photo ${idx + 1}`}
              className={`mb-2 ${event.photos.length > 1 ? 'w-full' : 'w-full max-w-4xl'} rounded-md`}
            />
          ))}
        </div>
          </div>
        )}
      </div>
    </div>
  </article>
);


export default function EventsPage() {
  const { data: eventsData, loading } = useDataLoader('eventsData');

  if (loading) {
    return (
      <div className="container pt-32 text-center">
        <p className="text-gray-600">Loading events data...</p>
      </div>
    );
  }

  if (!eventsData || eventsData.length === 0) {
    return (
      <div className="container pt-32 text-center">
        <p className="text-gray-600">No events data available.</p>
      </div>
    );
  }
  
  

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
