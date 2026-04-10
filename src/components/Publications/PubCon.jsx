import React, { useEffect, useMemo, useState } from "react";
import { useDataLoader } from "../../hooks/useDataLoader";
import { Link } from "react-router-dom";

const TYPES = [
  { id: 'journal', label: 'Journal' },
  { id: 'international', label: 'International' },
  { id: 'national', label: 'National' },
];

function blogPath(slug) {
  return `/publications/${slug}`;
}

function PubConCard({ slug, title, href, journal, conference, authors, date, podcast, podcast_status }) {
  const [isPodcastOpen, setIsPodcastOpen] = useState(false);

  const venueLine =
    journal != null && String(journal).trim()
      ? date ? `${journal}, ${date}` : journal
      : conference != null && String(conference).trim()
        ? date ? `${conference}, ${date}` : conference
        : date || null;

  return (
    <div className="bg-white px-4 py-2 rounded-sm border-l-4 border-slate-600 hover:shadow-md transition">
      <div className="flex flex-col">
        <h2 className="text-lg sm:text-xl font-semibold">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline hover:underline">
              {title}
            </a>
          ) : title}
        </h2>
        {venueLine && <p className="text-gray-500 italic">{venueLine}</p>}
        <p className="text-gray-600">{authors}</p>

        <div className="flex flex-row gap-3 items-center mt-2">
          {slug && (
            <Link to={blogPath(slug)} className="text-blue-600 no-underline hover:underline">Blog</Link>
          )}
          {podcast && (
            podcast_status ? (
              <button
                type="button"
                onClick={() => setIsPodcastOpen(p => !p)}
                className="text-blue-600 hover:underline"
              >
                {isPodcastOpen ? "Hide Podcast" : "Podcast"}
              </button>
            ) : (
              <div className="text-blue-500">Podcast</div>
            )
          )}
        </div>

        {podcast && isPodcastOpen && (
          <audio controls preload="none" className="w-full mt-3">
            <source src={podcast} type="audio/mp4" />
            <source src={podcast} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
}

export default function PubCon() {
  const { data: publicationsData, loading: pubLoading } = useDataLoader('publicationsData');
  const { data: internationalData, loading: intLoading } = useDataLoader('internationalData');
  const { data: nationalData, loading: natLoading } = useDataLoader('nationalData');

  const [selectedType, setSelectedType] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [titleSearch, setTitleSearch] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const loading = pubLoading || intLoading || natLoading;

  const allData = useMemo(() => [
    ...(Array.isArray(publicationsData) ? publicationsData : []),
    ...(Array.isArray(internationalData) ? internationalData : []),
    ...(Array.isArray(nationalData) ? nationalData : []),
  ], [publicationsData, internationalData, nationalData]);

  const { years, keywords } = useMemo(() => {
    const yearSet = new Set();
    const authorSet = new Set();
    const kwSet = new Set();
    allData.forEach(item => {
      if (item.date) yearSet.add(String(item.date));
      const fa = item.authors?.split(',')[0]?.trim();
      if (fa) authorSet.add(fa);
      (item.keywords || []).forEach(k => kwSet.add(k));
    });
    return {
      years: Array.from(yearSet).sort((a, b) => Number(b) - Number(a)),
      firstAuthors: Array.from(authorSet).sort(),
      keywords: Array.from(kwSet).sort(),
    };
  }, [allData]);

  const { filteredJournal, filteredIntl, filteredNational } = useMemo(() => {
    const filter = (items) => items.filter(item => {
      if (selectedYear && String(item.date) !== selectedYear) return false;
      if (titleSearch && !item.title?.toLowerCase().includes(titleSearch.toLowerCase())) return false;
      if (selectedAuthor) {
        const fa = item.authors?.split(',')[0]?.trim();
        if (fa !== selectedAuthor) return false;
      }
      if (selectedKeywords.length > 0) {
        if (!item.keywords || !selectedKeywords.some(k => item.keywords.includes(k))) return false;
      }
      return true;
    });
    return {
      filteredJournal: filter(Array.isArray(publicationsData) ? publicationsData : []),
      filteredIntl: filter(Array.isArray(internationalData) ? internationalData : []),
      filteredNational: filter(Array.isArray(nationalData) ? nationalData : []),
    };
  }, [publicationsData, internationalData, nationalData, selectedYear, titleSearch, selectedAuthor, selectedKeywords]);

  const hasActiveFilters = selectedType || selectedYear || titleSearch || selectedAuthor || selectedKeywords.length > 0;

  const clearFilters = () => {
    setSelectedType(null);
    setSelectedYear(null);
    setTitleSearch('');
    setSelectedAuthor(null);
    setSelectedKeywords([]);
  };

  const toggleKeyword = (kw) => {
    setSelectedKeywords(prev => prev.includes(kw) ? prev.filter(k => k !== kw) : [...prev, kw]);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (!selectedType) return;
    // Scroll after the filtered sections are rendered.
    const t = setTimeout(() => scrollToSection(selectedType), 0);
    return () => clearTimeout(t);
  }, [selectedType]);

  const showJournal = !selectedType || selectedType === 'journal';
  const showIntl = !selectedType || selectedType === 'international';
  const showNational = !selectedType || selectedType === 'national';

  if (loading) {
    return (
      <div className="container pt-32 text-center">
        <p className="text-gray-600">Loading publications data...</p>
      </div>
    );
  }

  return (
    <>
      <header className="py-5">
        <div className="container">
          <h1 className="pagetitle">Publications and Proceedings</h1>
          <div className="divider" />
        </div>
      </header>

      <main className="py-1">
        <div className="container flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0 lg:self-start lg:order-2">
          
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto space-y-6 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-lg shadow-slate-200/80">
            {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-full rounded-md border border-blue-300 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-slate-200 transition-colors"
                >
                  Reset filters
                </button>
              )}
              {/* Type */}
              <div>
                
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">Type</h2>
                <div className="flex flex-wrap gap-1.5">
                  {TYPES.map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setSelectedType(prev => prev === id ? null : id);
                      }}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors border ${
                        selectedType === id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year */}
              <div className="border-t border-slate-200 pt-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">Year</h2>
                <nav className="grid grid-cols-3 gap-1 lg:flex-col">
                  {years.map(year => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => setSelectedYear(prev => prev === year ? null : year)}
                      className={`text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        selectedYear === year
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Title search */}
              <div className="border-t border-slate-200 pt-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">Search Title</h2>
                <input
                  type="text"
                  placeholder="Search titles..."
                  value={titleSearch}
                  onChange={e => setTitleSearch(e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* First Author chips */}
              {/* <div className="border-t border-slate-200 pt-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">First Author</h2>
                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                  {firstAuthors.map(author => (
                    <button
                      key={author}
                      type="button"
                      onClick={() => setSelectedAuthor(prev => prev === author ? null : author)}
                      className={`rounded bg-slate-100 px-2 py-0.5 text-xs font-medium transition-colors ${
                        selectedAuthor === author
                          ? 'ring-2 ring-sky-500 ring-offset-1 bg-sky-100 text-sky-800'
                          : 'text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {author}
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Keywords */}
              <div className="border-t border-slate-200 pt-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">Keywords</h2>
                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                  {keywords.map(kw => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => toggleKeyword(kw)}
                      className={`rounded bg-slate-100 px-2 py-0.5 text-xs font-medium transition-colors ${
                        selectedKeywords.includes(kw)
                          ? 'ring-2 ring-sky-500 ring-offset-1 bg-sky-100 text-sky-800'
                          : 'text-slate-700 hover:bg-slate-300'
                      }`}
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
                  className="w-full rounded-md border border-blue-300 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-slate-200 transition-colors"
                >
                  Reset filters
                </button>
              )}
            </div>
          </aside>

          {/* Main content */}
          <div className="min-w-0 flex-1 lg:order-1">

            {showJournal && (
              <section id="journal" className="scroll-mt-24 mb-16">
                <h2 className="sectiontitle text-2xl mb-4">Journal Publications</h2>
                {filteredJournal.length === 0 ? (
                  <p className="text-slate-500 py-4">No results match the current filters.</p>
                ) : (
                  <div className="space-y-4">
                    {filteredJournal.map(item => <PubConCard key={item.id} {...item} />)}
                  </div>
                )}
              </section>
            )}

            {showIntl && (
              <section id="international" className="scroll-mt-24 mb-16">
                <h2 className="sectiontitle text-2xl font-bold mb-4">International Conference</h2>
                {filteredIntl.length === 0 ? (
                  <p className="text-slate-500 py-4">No results match the current filters.</p>
                ) : (
                  <div className="space-y-4">
                    {filteredIntl.map(item => <PubConCard key={item.id} {...item} />)}
                  </div>
                )}
              </section>
            )}

            {showNational && (
              <section id="national" className="scroll-mt-24 mb-16">
                <h2 className="sectiontitle text-2xl font-bold mb-4">National Conference Presentation</h2>
                {filteredNational.length === 0 ? (
                  <p className="text-slate-500 py-4">No results match the current filters.</p>
                ) : (
                  <div className="space-y-4">
                    {filteredNational.map(item => <PubConCard key={item.id} {...item} />)}
                  </div>
                )}
              </section>
            )}

          </div>
        </div>
      </main>
    </>
  );
}
