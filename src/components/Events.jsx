import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useLocation, useSearchParams } from 'react-router-dom';
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
  seminar: 'bg-teal-100 text-teal-800',
  hackathon: 'bg-orange-100 text-orange-800',
};
const getCategoryStyle = (category) => categoryStyles[category] || 'bg-slate-100 text-slate-600';
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
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [keywordSearch, setKeywordSearch] = useState('');
  const [expandedYears, setExpandedYears] = useState([]);

  const { categories, keywords, filteredEvents, eventsByYear } = useMemo(() => {
    if (!eventsData?.length) {
      return { years: [], categories: [], keywords: [], filteredEvents: [], eventsByYear: {} };
    }
    const yearSet = new Set();
    const catSet = new Set();
    const kwSet = new Set();
    eventsData.forEach((e) => {
      if (e.start) yearSet.add(new Date(e.start).getFullYear());
      if (e.category) catSet.add(e.category);
      (e.keyword || []).forEach((k) => kwSet.add(k));
    });
    const years = Array.from(yearSet).sort((a, b) => b - a);
    const categories = Array.from(catSet).sort();
    const keywords = Array.from(kwSet).sort();

    const filtered = eventsData.filter((event) => {
      const matchCategory =
        selectedCategories.length === 0 || (event.category && selectedCategories.includes(event.category));
      const matchKeyword =
        selectedKeywords.length === 0 ||
        (event.keyword && event.keyword.some((k) => selectedKeywords.includes(k)));
      return matchCategory && matchKeyword;
    });

    const byYear = {};
    filtered.forEach((event) => {
      const y = event.start ? new Date(event.start).getFullYear() : 'Unknown';
      if (!byYear[y]) byYear[y] = [];
      byYear[y].push(event);
    });
    const sortedByYear = {};
    years.forEach((y) => {
      if (byYear[y]?.length) sortedByYear[y] = byYear[y];
    });

    return {
      years,
      categories,
      keywords,
      filteredEvents: filtered,
      eventsByYear: sortedByYear,
    };
  }, [eventsData, selectedCategories, selectedKeywords]);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };
  const toggleKeyword = (kw) => {
    setSelectedKeywords((prev) =>
      prev.includes(kw) ? prev.filter((k) => k !== kw) : [...prev, kw]
    );
  };
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedKeywords([]);
    setKeywordSearch('');
  };

  const sortedYears = useMemo(
    () => Object.keys(eventsByYear).sort((a, b) => Number(b) - Number(a)),
    [eventsByYear]
  );

  const sortedYearKey = useMemo(
    () => Object.keys(eventsByYear).sort((a, b) => Number(b) - Number(a)).join(','),
    [eventsByYear]
  );

  useEffect(() => {
    if (!sortedYearKey) return;
    const sorted = sortedYearKey.split(',');
    const latest = sorted[0];
    setExpandedYears((prev) => {
      const hasLatest = prev.includes(latest);
      const stillValid = prev.every((y) => sorted.includes(y));
      if (!hasLatest || !stillValid) return [latest];
      return prev.filter((y) => sorted.includes(y));
    });
  }, [sortedYearKey]);

  const toggleYearExpanded = (year) => {
    setExpandedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const scrollToYear = (year) => {
    const el = document.getElementById(`year-${year}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onSidebarYearClick = (year) => {
    if (!expandedYears.includes(year)) setExpandedYears((prev) => [...prev, year]);
    scrollToYear(year);
  };

  // Scroll to event by id (from hash or ?scroll=id) after data is loaded and rendered
  useEffect(() => {
    if (!eventsData?.length) return;
    const id = searchParams.get('scroll') || (location.hash ? location.hash.slice(1) : null);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      const t = setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(t);
    }
  }, [eventsData, searchParams, location.hash]);

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
  
  

  const keywordsFiltered = keywordSearch
    ? keywords.filter((k) => k.toLowerCase().includes(keywordSearch.toLowerCase()))
    : keywords;
  const hasActiveFilters = selectedCategories.length > 0 || selectedKeywords.length > 0;

  return (
    <>
      <header className="py-5">
        <div className="container">
          <h1 className="pagetitle">Events</h1>
          <p className="flex justify-center text-gray-600">
            Explore our past events, conferences, and workshops.
          </p>
          <div className="divider" />
        </div>
      </header>

      <main className="py-1">
        <div className="container flex flex-col lg:flex-row gap-8">
          {/* Sidebar: sticks and follows scroll; recent year on top */}
          <aside className="lg:w-64 shrink-0 lg:self-start">
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto space-y-6 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-lg shadow-slate-200/80">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  By year
                </h2>
                <nav className="flex flex-wrap gap-1 lg:flex-col">
                  {sortedYears.map((year) => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => onSidebarYearClick(year)}
                      className="text-left px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-200 font-medium transition-colors"
                    >
                      {year}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Category
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wider transition-colors ${getCategoryStyle(cat)} ${selectedCategories.includes(cat) ? 'ring-2 ring-slate-600 ring-offset-1' : 'opacity-80 hover:opacity-100'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Keywords
                </h2>
                <input
                  type="text"
                  placeholder="Search keywords..."
                  value={keywordSearch}
                  onChange={(e) => setKeywordSearch(e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                  {keywordsFiltered.map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => toggleKeyword(kw)}
                      className={`rounded bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-700 hover:bg-slate-300 transition-colors ${selectedKeywords.includes(kw) ? 'ring-2 ring-sky-500 ring-offset-1 bg-sky-100' : ''}`}
                    >
                      #{kw}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          </aside>

          {/* Main content: events grouped by year */}
          <div className="min-w-0 flex-1">
            {filteredEvents.length === 0 ? (
              <p className="text-slate-500 py-8">No events match the current filters.</p>
            ) : (
              sortedYears.map((year) => {
                const events = eventsByYear[year] || [];
                const isExpanded = expandedYears.includes(year);
                return (
                  <section
                    key={year}
                    id={`year-${year}`}
                    className="scroll-mt-24 mb-6"
                  >
                    <button
                      type="button"
                      onClick={() => toggleYearExpanded(year)}
                      className="flex w-full items-center justify-between gap-2 text-left text-2xl font-bold text-slate-800 mb-2 pb-2 border-b border-slate-200 hover:bg-slate-50 -mx-1 px-1 rounded transition-colors"
                    >
                      <span>{year}</span>
                      <span className="text-slate-400 shrink-0" aria-hidden>
                        {isExpanded ? '▼' : '▶'}
                      </span>
                    </button>
                    {isExpanded && (
                      <div className="space-y-6 pt-2">
                        {events.map((event) => (
                          <EventMasonryCard key={event.id} {...event} />
                        ))}
                      </div>
                    )}
                  </section>
                );
              })
            )}
          </div>
        </div>
      </main>
    </>
  );
}
