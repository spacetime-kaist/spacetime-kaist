import React, { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDataLoader } from '../hooks/useDataLoader';
import NavbarCategorized from '../utility/NavbarCategorized';
import ScrollUpBt from '../utility/ScrollUpButton';

const parseYear = (v) => { const n = Number.parseInt(v, 10); return Number.isNaN(n) ? 0 : n; };
const fmtDate  = (raw) => {
  if (!raw) return '';
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};
const stripMd = (s = '') => s.replace(/\*\*/g, '').replace(/#+\s/g, '').replace(/\n/g, ' ').trim();

export default function LandingPageV3() {
  const { data: researchData,      loading: rL  } = useDataLoader('researchData');
  const { data: publicationsData,  loading: pL  } = useDataLoader('publicationsData');
  const { data: internationalData, loading: iL  } = useDataLoader('internationalData');
  const { data: pressData,         loading: prL } = useDataLoader('pressData');
  const { data: eventsData,        loading: eL  } = useDataLoader('eventsData');

  const loading = rL || pL || iL || prL || eL;

  const recentPubs = useMemo(() => {
    const j = (publicationsData  || []).map(i => ({ ...i, _src: 'Journal'    }));
    const c = (internationalData || []).map(i => ({ ...i, _src: 'Conference' }));
    return [...j, ...c].sort((a, b) => parseYear(b.date) - parseYear(a.date)).slice(0, 8);
  }, [publicationsData, internationalData]);

  const allNews = useMemo(() =>
    (pressData || []).slice(0, 5).map(p => ({
      id:       p.id,
      title:    p.title,
      desc:     p.desc?.split('\n').filter(Boolean)[0] || '',
      date:     p.date,
      image:    p.image,
      link:     p.link_en || p.link_kr || '#',
      keywords: p.keyword || [],
    })),
  [pressData]);

  const featuredNews = allNews[0] || null;
  const sideNews     = allNews.slice(1);

  const recentEvents = useMemo(() =>
    (eventsData || []).slice(0, 6).map(ev => ({
      id:    ev.id,
      title: ev.title,
      date:  ev.start,
      place: ev.place,
      photo: ev.photos?.[0] || null,
      desc:  stripMd(ev.desc || '').slice(0, 100),
    })),
  [eventsData]);

  const pubTotal = (publicationsData?.length || 0) + (internationalData?.length || 0);

  const carouselRef = useRef(null);
  const scrollCarousel = (dir) => carouselRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });

  if (loading) {
    return (
      <div id="top" className="font-display w-screen min-h-screen bg-white">
        <div className="w-full h-16" /><NavbarCategorized />
        <div className="max-w-6xl mx-auto px-6 pt-28 text-gray-400">Loading…</div>
      </div>
    );
  }

  return (
    <div id="top" className="font-display flex flex-col items-center overflow-hidden">
      <div className="w-screen min-w-[320px]">
        <div className="w-full h-16" />
        <NavbarCategorized />
        <ScrollUpBt />

        {/* ══════════════════════════════════════════
            HERO  (DeepMind: dark, large text, pill CTAs)
        ══════════════════════════════════════════ */}
        <header style={{ background: 'linear-gradient(135deg, #060a17 0%, #0d1b3e 60%, #091530 100%)' }}>
          <div className="max-w-6xl mx-auto px-6 pt-16 pb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400 mb-6">
              KAIST · Civil and Environmental Engineering · Data Science
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-[4.5rem] font-bold leading-[1.02] tracking-tight text-white max-w-5xl">
              Spacetime Intelligence Laboratory
            </h1>
            <p className="mt-7 text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Spacetime Intelligence Laboratory develops rigorous, data-driven AI methods
              for urban mobility, traffic systems, airspace management, and public safety — 
              grounded in real-world urban context at KAIST.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/research"
                className="px-5 py-2.5 bg-white text-gray-900 text-sm font-bold rounded-full hover:bg-gray-100 transition-colors">
                Explore research
              </Link>
              <Link to="/publications"
                className="px-5 py-2.5 border border-gray-500 text-white text-sm font-bold rounded-full hover:border-gray-300 transition-colors">
                {pubTotal}+ publications
              </Link>
              <Link to="/people"
                className="px-5 py-2.5 border border-gray-500 text-white text-sm font-bold rounded-full hover:border-gray-300 transition-colors">
                People
              </Link>
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════════
            RESEARCH HIGHLIGHTS  (DeepMind: "Breakthroughs" horizontal carousel)
        ══════════════════════════════════════════ */}
        <section className="bg-white border-b border-gray-100 py-16">
          <div className="max-w-6xl mx-auto px-6">

            {/* Section header */}
            <div className="flex items-end justify-between mb-8 gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Research Highlights</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight max-w-lg">
                  Explore some of our key research directions
                </h2>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => scrollCarousel(-1)}
                  aria-label="Previous"
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors text-xl leading-none"
                >‹</button>
                <button
                  onClick={() => scrollCarousel(1)}
                  aria-label="Next"
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors text-xl leading-none"
                >›</button>
              </div>
            </div>

            {/* Cards */}
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#e5e7eb transparent' }}
            >
              {(researchData || []).map(item => (
                <Link
                  key={item.id}
                  to={`/research/${item.id}`}
                  className="snap-start flex-none w-[260px] rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 group flex flex-col"
                >
                  {item.thumbnail ? (
                    <div className="h-36 bg-gray-200 overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-36 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                      <span className="text-blue-200 text-xs uppercase tracking-wider">Research</span>
                    </div>
                  )}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1">
                      {item.desc}
                    </p>
                    <p className="mt-3 text-xs font-bold text-blue-600">Learn more →</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <Link to="/research" className="text-sm font-semibold text-blue-600 hover:underline">
                View all {researchData?.length || 0} research areas →
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            LATEST NEWS + PUBLICATIONS  (DeepMind: two side-by-side lists)
        ══════════════════════════════════════════ */}
        <section className="bg-gray-50 border-b border-gray-200 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16">

              {/* ── NEWS (left, wider) ── */}
              <div>
                <div className="flex items-baseline justify-between mb-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Latest News</p>
                  <Link to="/press" className="text-xs font-bold text-blue-600 hover:underline">View news →</Link>
                </div>

                {/* Featured item */}
                {featuredNews && (
                  <article className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex gap-4">
                      {featuredNews.image && (
                        <div className="w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                          <img src={featuredNews.image} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          <span className="text-[10px] text-gray-400">{fmtDate(featuredNews.date)}</span>
                          {featuredNews.keywords.slice(0, 2).map(k => (
                            <span key={k} className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                              {k}
                            </span>
                          ))}
                        </div>
                        <a
                          href={featuredNews.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-bold text-gray-900 hover:text-blue-700 hover:underline leading-snug"
                        >
                          {featuredNews.title}
                        </a>
                        <p className="mt-1.5 text-xs text-gray-500 leading-relaxed line-clamp-2">
                          {featuredNews.desc}
                        </p>
                      </div>
                    </div>
                  </article>
                )}

                {/* Secondary news items — title-only list like DeepMind */}
                <div className="divide-y divide-gray-200">
                  {sideNews.map(item => (
                    <article key={item.id} className="py-4">
                      <div className="flex items-baseline gap-3 flex-wrap mb-1">
                        <span className="text-[10px] text-gray-400 shrink-0">{fmtDate(item.date)}</span>
                        {item.keywords.slice(0, 1).map(k => (
                          <span key={k} className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {k}
                          </span>
                        ))}
                      </div>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-gray-900 hover:text-blue-700 hover:underline leading-snug"
                      >
                        {item.title}
                      </a>
                    </article>
                  ))}
                </div>
              </div>

              {/* ── PUBLICATIONS (right) ── */}
              <div>
                <div className="flex items-baseline justify-between mb-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Publications</p>
                  <Link to="/publications" className="text-xs font-bold text-blue-600 hover:underline">
                    View all →
                  </Link>
                </div>

                <div className="divide-y divide-gray-200">
                  {recentPubs.map((item, idx) => (
                    <article key={`${item.id}-${idx}`} className="py-4 first:pt-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          item._src === 'Journal'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-violet-100 text-violet-700'
                        }`}>
                          {item._src}
                        </span>
                        {item.date && <span className="text-[10px] text-gray-400">{item.date}</span>}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-gray-900 hover:text-blue-700 hover:underline leading-snug"
                        >
                          {item.title}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-gray-900 leading-snug">{item.title}</p>
                      )}
                      <p className="mt-0.5 text-xs text-gray-500">{item.authors}</p>
                      <p className="text-xs text-gray-400 italic">{item.journal || item.conference}</p>
                    </article>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-400 mb-1">{pubTotal} total papers</p>
                  <Link to="/publications" className="text-sm font-semibold text-blue-600 hover:underline">
                    View all publications →
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FROM THE LAB  (DeepMind: editorial grid with images)
        ══════════════════════════════════════════ */}
        <section className="bg-white border-b border-gray-100 py-16">
          <div className="max-w-6xl mx-auto px-6">

            <div className="flex items-baseline justify-between mb-2 gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">From the Lab</p>
              <Link to="/events" className="text-xs font-bold text-blue-600 hover:underline shrink-0">
                All events →
              </Link>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 max-w-xl">
              Uncover what is happening inside the laboratory
            </h2>

            {/* First event featured large, rest in a row */}
            {recentEvents.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-4">

                {/* Large featured event */}
                {recentEvents[0] && (
                  <article className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 group hover:shadow-md transition-shadow row-span-2 flex flex-col">
                    {recentEvents[0].photo ? (
                      <div className="h-56 bg-gray-200 overflow-hidden">
                        <img
                          src={recentEvents[0].photo}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-gray-300 text-xs uppercase tracking-wider">Event</span>
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
                        {fmtDate(recentEvents[0].date)}{recentEvents[0].place ? ` · ${recentEvents[0].place}` : ''}
                      </p>
                      <Link
                        to={`/events?scroll=${recentEvents[0].id}`}
                        className="text-base font-bold text-gray-900 hover:text-blue-700 leading-snug mb-2 group-hover:text-blue-700"
                      >
                        {recentEvents[0].title}
                      </Link>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-4 flex-1">
                        {recentEvents[0].desc}
                      </p>
                    </div>
                  </article>
                )}

                {/* Smaller events */}
                {recentEvents.slice(1, 5).map(ev => (
                  <article key={ev.id} className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 group hover:shadow-md transition-shadow flex flex-col">
                    {ev.photo ? (
                      <div className="h-28 bg-gray-200 overflow-hidden">
                        <img
                          src={ev.photo}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-28 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-gray-300 text-[10px] uppercase tracking-wider">Event</span>
                      </div>
                    )}
                    <div className="p-4 flex-1 flex flex-col">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5">
                        {fmtDate(ev.date)}{ev.place ? ` · ${ev.place}` : ''}
                      </p>
                      <Link
                        to={`/events?scroll=${ev.id}`}
                        className="text-sm font-bold text-gray-900 hover:text-blue-700 leading-snug"
                      >
                        {ev.title}
                      </Link>
                      <p className="mt-1.5 text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1">
                        {ev.desc}
                      </p>
                    </div>
                  </article>
                ))}

              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            STATS  (dark strip like DeepMind footer area)
        ══════════════════════════════════════════ */}
        <section style={{ background: 'linear-gradient(135deg, #060a17 0%, #0d1b3e 100%)' }}>
          <div className="max-w-6xl mx-auto px-6 py-14">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              {[
                { value: researchData?.length || 0,       label: 'Research Areas'      },
                { value: `${pubTotal}+`,                  label: 'Publications'        },
                { value: `${eventsData?.length || 0}+`,   label: 'Events & Activities' },
                { value: '2011',                          label: 'Established at KAIST' },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-4xl sm:text-5xl font-bold text-white">{s.value}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-blue-300">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            QUICK NAV  (DeepMind: clean link list at bottom)
        ══════════════════════════════════════════ */}
        <section className="bg-white border-b border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">
              {[
                { to: '/people',       label: 'People',       sub: 'Lab members & alumni'     },
                { to: '/projects',     label: 'Projects',     sub: 'Funded research projects'  },
                { to: '/events',       label: 'Events',       sub: 'Talks & conferences'       },
                { to: '/publications', label: 'Publications', sub: `${pubTotal}+ papers`       },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-6 py-7 hover:bg-gray-50 transition-colors group"
                >
                  <p className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {link.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{link.sub}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════ */}
        <footer style={{ background: '#060a17' }} className="text-gray-400">
          <div className="max-w-6xl mx-auto px-6 py-14">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm leading-relaxed mb-12">
              <div>
                <p className="font-bold text-white text-base mb-1">
                  Spacetime Intelligence Laboratory
                </p>
                <p className="text-xs text-gray-500">
                  KAIST · Civil and Environmental Engineering
                </p>
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-3">Address</h3>
                <p>
                  W16 #410, KAIST<br />
                  291 Daehak-ro, Yuseong-gu<br />
                  Daejeon, Republic of Korea
                </p>
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-3">Contact</h3>
                <p>
                  TEL: +82-42-350-3615<br />
                  yoonjin@kaist.ac.kr
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-gray-600">
                © {new Date().getFullYear()} Spacetime Intelligence Laboratory, KAIST. All rights reserved.
              </span>
              <div className="flex flex-wrap gap-5 text-xs text-gray-500">
                <Link to="/research"      className="hover:text-gray-300 transition-colors">Research</Link>
                <Link to="/publications"  className="hover:text-gray-300 transition-colors">Publications</Link>
                <Link to="/people"        className="hover:text-gray-300 transition-colors">People</Link>
                <Link to="/projects"      className="hover:text-gray-300 transition-colors">Projects</Link>
                <Link to="/events"        className="hover:text-gray-300 transition-colors">Events</Link>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
