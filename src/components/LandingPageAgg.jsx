import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDataLoader } from '../hooks/useDataLoader';
import ScrollUpBt from '../utility/ScrollUpButton';
import NavbarCategorized from '../utility/NavbarCategorized';

const parseYear = (v) => { const n = Number.parseInt(v, 10); return Number.isNaN(n) ? 0 : n; };

const fmtDate = (raw) => {
  if (!raw) return '';
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const stripMd = (s = '') =>
  s.replace(/\*\*/g, '').replace(/#+\s/g, '').replace(/\n/g, ' ').trim();

const byDateDesc = (a, b) => {
  const ta = new Date(a.date).getTime();
  const tb = new Date(b.date).getTime();
  return (Number.isNaN(tb) ? 0 : tb) - (Number.isNaN(ta) ? 0 : ta);
};

/**
 * Reference related items by data source + id only.
 * data sources: 'press' | 'outreach' | 'publications' | 'international' | 'national' | 'lablife'
 * id: the item's id field from the corresponding JSON file.
 */
const RESEARCH_RELATED = {
  'tda': [
    { data: 'publications', id: '10.1109/TNNLS.2025.3577202' },
    { data: 'publications',  id: 9 }
  ],
  'urban-simulation': [
    { data: 'international', id: '10.1145/3764921.3770151' },
    { data: 'outreach', id: '20251103' },
  ],
  'usr': [
    { data: 'international', id: 'i74' },
    { data: 'outreach',      id: '20251019' },
  ],
  'uhus': [
    { data: 'press',         id: 'press20251029' },
    { data: 'outreach',      id: '20250930' },
  ],
  'ure': [
    // { data: 'international', id: '' },
    { data: 'publications',  id: '10.1109/ACCESS.2025.3577202' },
    { data: 'international',  id: '3' },
  ],
  'uam': [
    { data: 'international', id: 'i75' },
    { data: 'international', id: 'i73' },
    { data: 'national', id: 'NODE11760070' },
  ],
  'utm':                    [
    { data: 'publications', id: 8 },
  ],
  'maritime':               [
    { data: 'publications',  id: 2 },
  ],
  'traffic-forecasting':    [
    { data: 'publications', id: '10.1109/TNNLS.2025.3577202' },
    { data: 'publications',  id: 3 }
  ],
  'transportation-network': [
    { data: 'national', id: 'NODE12087850' },
  ],
  'autonomous-vehicle':     [],
  'traffic-safety':         [],
  'aviation':               [],
  'other':                  [],
};

/* ── Thin horizontal rule used between every section ── */
const Rule = () => <hr className="border-t border-gray-200 my-0" />;

/* ── Section label — small-caps Montserrat ── */
const Label = ({ children }) => (
  <p className="text-sm font-semibold uppercase tracking-[0.16em] mb-4">
    {children}
  </p>
);

/* ── Section Link label (blue) ── */
const SectionLink = ({ to }) => (
  <Link to={to} className="text-sm text-stone-500 hover:text-blue-500 hover:underline">
    All →
  </Link>
);

function RelatedItem({ item, idx, categoryStyles }) {
  const [isPodcastOpen, setIsPodcastOpen] = useState(false);
  return (
    <li className={`w-full min-w-0 py-1 flex flex-col justify-center ${idx > 0 ? 'border-t border-dashed border-gray-300' : ''}`}>
      <article>
        <div className="flex items-center gap-2 mb-1">
          <span className={`shrink-0 text-[8px] font-bold uppercase tracking-wide px-1 py-0.5 rounded leading-none ${categoryStyles[item.subtype]}`}>
            {item.label}
          </span>
          {item.date && <span className="text-[10px] text-gray-400">{item.date}</span>}
        </div>
        {item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-gray-800 hover:text-red-700 hover:underline leading-snug"
          >
            {item.title}
          </a>
        ) : (
          <p className="text-sm font-semibold text-gray-800 leading-snug">{item.title}</p>
        )}
        <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">{item.who}</p>
        <p className="text-[11px] text-gray-400 italic line-clamp-1">{item.where}</p>
        <div className="mt-1.5 flex flex-row gap-2 items-center">
          {item.to ? (
            <Link to={`${item.to}`} className="text-[11px] text-blue-500 hover:text-blue-700 hover:underline">More Details</Link>
          ) : null}
          {item.slug ? (
            <Link to={`/publications/${item.slug}`} className="text-[11px] text-blue-500 hover:text-blue-700 hover:underline">Blog</Link>
          ) : null}
          {item.podcast && (
            item.podcast_status ? (
            <div>
              <button
                type="button"
                onClick={() => setIsPodcastOpen((prev) => !prev)}
                className="flex items-center gap-1 text-[11px] text-blue-500 hover:text-blue-700 hover:underline"
              >
                {/* <svg
                  className={`w-3 h-3 transition-transform ${isPodcastOpen ? 'rotate-90' : ''}`}
                  viewBox="0 0 20 20" fill="currentColor"
                >
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg> */}
                {isPodcastOpen ? 'Hide Podcast' : 'Podcast'}
              </button>
           
            </div>
            ) : (
              <div
                className="flex items-center gap-1 text-[11px] text-blue-500 hover:text-slate-500"
              >
                {isPodcastOpen ? 'Hide Podcast' : 'Podcast'}
              </div>
            )
          )}
        </div>
        {isPodcastOpen && (
                <audio controls preload="none" className="w-full max-h-8 mt-2">
                  <source src={item.podcast} type="audio/mp4" />
                  <source src={item.podcast} type="audio/mpeg" />
                  Your browser does not support the audio element.
         \</audio>
              )}
      </article>
    </li>
  );
}

export default function LandingPageV4() {
  const { data: researchData,      loading: rL  } = useDataLoader('researchData');
  const { data: publicationsData,  loading: pL  } = useDataLoader('publicationsData');
  const { data: internationalData, loading: iL  } = useDataLoader('internationalData');
  const { data: nationalData,      loading: nL  } = useDataLoader('nationalData');
  const { data: pressData,         loading: prL } = useDataLoader('pressData');
  const { data: outreachData,      loading: oL  } = useDataLoader('outreachData');
  const { data: lablifeData,       loading: lL  } = useDataLoader('lablifeData');

  const loading = rL || pL || iL || nL || prL || oL || lL;

  
  const featuredResearch = useMemo(() => {
    const list = (researchData || []).slice(0, 6);
    return list.map((r) => ({
      id: r.id,
      title: r.title,
      desc: r.desc,
      thumbnail: r.thumbnail || null,
    }));
  }, [researchData]);
  
  const recentPubs = useMemo(() => {
    const j = (publicationsData  || []).map(i => ({ ...i, _src: 'Journal Publications'    }));
    const c = (internationalData || []).map(i => ({ ...i, _src: 'Conference' }));
    const n = (nationalData || []).map(i => ({ ...i, _src: 'Conference' }));
    return [...j, ...c, ...n].sort((a, b) => parseYear(b.date) - parseYear(a.date)).slice(0, 7);
  }, [publicationsData, internationalData, nationalData]);
  // const pubTotal = (publicationsData?.length || 0) + (internationalData?.length || 0);


  const recentOutreach = useMemo(() => {
    const fromPress = (pressData || []).map((p) => ({
      key:           `press-${p.id}`,
      id:            p.id,
      title:         p.title,
      category:      'press',
      date:          p.date,
      place:         p.writer,
      photo:         p.image || null,
      desc:          p.desc ? stripMd(p.desc).slice(0, 100) : '',
      isPress:       true,
    }));
    const fromEvents = (outreachData || []).filter((ev) => ev.category !== 'meeting').map((ev) => ({
      key:     `ev-${ev.id}`,
      id:       ev.id,
      title:    ev.title,
      category: ev.category,
      date:     ev.start,
      place:    ev.place,
      photo:   ev.photos?.[0] || null,
      desc:     stripMd(ev.desc || '').slice(0, 100),
      isPress:  false,
    }));
    return [...fromPress, ...fromEvents].sort(byDateDesc).slice(0, 7);
  }, [pressData, outreachData]);

  const categoryStyles = {
    press: 'bg-blue-50 text-blue-600',
    presentation: 'bg-sky-50 text-sky-600',
    conference: 'bg-violet-50 text-violet-600',
    workshop: 'bg-emerald-50 text-emerald-600',
    exhibition: 'bg-amber-50 text-amber-600',
    meeting: 'bg-slate-50 text-slate-600',
    honors: 'bg-rose-50 text-rose-600',
    seminar: 'bg-teal-50 text-teal-600',
    ceremony: 'bg-orange-50 text-orange-600',
    // international: 'bg-slate-300 text-slate-700',
    conf: 'bg-slate-100 text-slate-500',
    journal: 'bg-slate-500 text-white',
  };
  const getCategoryStyle = (category) => categoryStyles[category] || 'bg-slate-50 text-slate-600';

  const recentLabLife = useMemo(() => {
    const list = Array.isArray(lablifeData) ? lablifeData : [];
    return list
      .slice()
      .slice(0, 7)
      .map((ev) => ({
        key: `lablife-${ev.id}`,
        id: ev.id,
        title: ev.title,
        date: ev.start,
        place: ev.place,
        photo: ev.photos?.[0] || null,
        desc: stripMd(ev.desc || '').slice(0, 90),
        isPress: false,
      }));
  }, [lablifeData]);


  const resolvedRelated = useMemo(() => {
    const idx = {
      press:         Object.fromEntries((pressData        || []).map(x => [String(x.id), x])),
      outreach:      Object.fromEntries((outreachData     || []).map(x => [String(x.id), x])),
      publications:  Object.fromEntries((publicationsData || []).map(x => [String(x.id), x])),
      international: Object.fromEntries((internationalData|| []).map(x => [String(x.id), x])),
      national:      Object.fromEntries((nationalData     || []).map(x => [String(x.id), x])),
      lablife:       Object.fromEntries((lablifeData      || []).map(x => [String(x.id), x])),
    };

    const resolve = ({ data, id }) => {
      const item = idx[data]?.[String(id)];
      if (!item) return null;
      if (data === 'press')         return { type: 'press', subtype:'press', label: 'Press',       date: item.date,  title: item.title, who:item.writer, where:item.link_others.source, href: item.link_en || item.link_kr , to: `/press?${item.id}`};
      if (data === 'outreach')      return { type: 'event', subtype:item.category, label: item.category || 'Event', date: item.start, title: item.title, who:item.participants, where:item.place, to: `/events?scroll=${item.id}` };
      if (data === 'lablife')       return { type: 'event', subtype:item.category, label: 'Lab Life',    date: item.start, title: item.title, who:item.participants, where:item.place, to: `/events?scroll=${item.id}` };
      if (data === 'publications')  return { type: 'pub',   subtype:'journal', label: 'Journal',     date: item.date,  title: item.title, who:item.authors, where:item.journal, href: item.href, podcast: item.podcast || null, podcast_status: item.podcast_status || false, slug: item.slug };
      if (data === 'international') return { type: 'pub',   subtype:'conf', label: 'Intl. Conf.', date: item.date,  title: item.title, who:item.authors, where:item.conference, href: item.href, podcast: item.podcast || null, podcast_status: item.podcast_status || false, slug: item.slug };
      if (data === 'national')      return { type: 'pub',   subtype:'conf', label: 'Natl. Conf.', date: item.date,  title: item.title, who:item.authors, where:item.conference, href: item.href, podcast: item.podcast || null, podcast_status: item.podcast_status || false, slug: item.slug };
      return null;
    };

    return Object.fromEntries(
      Object.entries(RESEARCH_RELATED).map(([rid, refs]) => [
        rid,
        refs.map(resolve).filter(Boolean),
      ])
    );
  }, [pressData, outreachData, publicationsData, internationalData, nationalData, lablifeData]);

  if (loading) {
    return (
      <div id="top" className="font-display w-screen min-h-screen bg-white">
        <div className="w-full h-16" /><NavbarCategorized />
        <div className="max-w-6xl mx-auto px-6 pt-28 text-gray-400">Loading…</div>
      </div>
    );
  }
  return (
    <div id="top" className="font-display flex flex-col justify-center items-center overflow-hidden">
      <div className="w-screen min-h-[100vh] min-w-[320px] bg-welcomeHome lg:bg-cover bg-contain bg-no-repeat">
        <div className="w-full h-16" />
        {/* <Navbar /> */}
        <NavbarCategorized />
        <ScrollUpBt />

        <div className="min-h-screen px-6 sm:px-10 bg-slate-50 text-slate-900">
          {loading ? (
            <LoadingState />
          ) : (
            <>
              {/* ══════════════════════════════════════
                        HEADER — Light, clean
                  ══════════════════════════════════════ */}
              <header className="border-b border-slate-200 bg-white">
                <div className="container pt-20 pb-12">
                  {/* <p className="text-sm tracking-[0.15em] uppercase text-slate-500">KAIST · Civil and Environmental Engineering · Data Science</p> */}
                  <h1 className="mt-3 text-4xl md:text-5xl font-semibold text-slate-900">
                    Spacetime Intelligence Lab
                  </h1>
                  {/* <p className="mt-6 max-w-4xl text-md leading-relaxed text-slate-700">
                    We conduct data-driven and AI-centered research for urban, mobility, and transportation
                    systems. Our work spans urban representation learning, traffic forecasting, autonomous
                    mobility, airspace intelligence, and public-safety analytics.
                  </p> */}
                  {/* <div className="mt-10 flex flex-wrap gap-2 items-center">
                  <Link to="/research"      className="px-3 py-1 bg-slate-400 text-amber-950 text-xs font-bold uppercase tracking-wide rounded border hover:border-stone-400 hover:bg-slate-100 transition-colors">Explore Research</Link>
                  <Link to="/publications"  className="px-3 py-1 border border-stone-600 text-stone-400 text-xs font-bold uppercase tracking-wide rounded hover:bg-slate-500 hover:text-white transition-colors">Publications</Link>
                  <Link to="/people"  className="px-3 py-1 border border-stone-600 text-stone-400 text-xs font-bold uppercase tracking-wide rounded hover:bg-slate-500 hover:text-white transition-colors">Members</Link>
                  </div> */}
                </div>
                
              </header>

              {/* ══════════════════════════════════════
                        Recent Research Highlights
                  ══════════════════════════════════════ */}
              <section className="container py-14 pb-20 border-b border-slate-200">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl md:text-3xl font-semibold">Recent Research Highlights</h2>
                  <Link to="/research" className="text-sm text-blue-700 hover:underline">
                    View all research
                  </Link>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featuredResearch.map((item) => {
                    const related = resolvedRelated[item.id] || [];
                    return (
                      <article key={item.id} className="bg-white border border-slate-200 rounded-md p-4 flex flex-col">
                        <h3 className="text-md  leading-snug">{item.title}</h3>
                        {/* <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.desc}</p> */}
                        {/* <Link to={`/research/${item.id}`} className="mt-2 text-xs text-slate-400 hover:text-blue-700 hover:underline">
                          Read details →
                        </Link> */}

                        {related.length > 0 && (
                          <ul className="mt-3 pt-3 border-t border-slate-100 grid grid-rows-2 h-full">
                            {related.slice(0, 2).map((item, idx) => (
                              <RelatedItem key={`${item.id}-${idx}`} item={item} idx={idx} categoryStyles={categoryStyles} />
                            ))}
                          </ul>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>

              
              {/* ══════════════════════════════════════
                  THREE COLUMNS: Outreach | Publications | Lab life
                  ══════════════════════════════════════ */}
              <section className="bg-white py-16 border-b border-gray-200">
                <div className="container mx-auto px-6 sm:px-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">

                    {/* ── Column 1: Outreach ── */}
                    <div className="md:col-span-1">
                      <div className="flex items-baseline justify-between mb-5 border-b border-stone-400 pb-3">
                        <Label>Latest Outreach</Label>
                        <SectionLink to="/events" />
                      </div>
                      <div className="space-y-0">
                        {recentOutreach.map((item, i) => (
                          <article key={item.key} className={`${i > 0 ? 'border-t border-gray-200' : ''} py-4 flex gap-3`}>
                            {item.photo && (
                              <div className="w-14 h-14 flex-shrink-0 rounded overflow-hidden bg-gray-200">
                                <img src={item.photo} alt="" className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              
                              <p className="text-[10px] text-gray-400 mb-0.5">
                              <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 mr-1.5 rounded ${
                                getCategoryStyle(item.category)
                              }`}>
                                {item.category}
                              </span>
                                {fmtDate(item.date)}{item.place ? ` · ${item.place}` : ''}
                              </p>
                              {item.isPress ? (
                                <Link
                                  to="/press"
                                  className="text-sm font-semibold text-gray-800 hover:text-red-700 hover:underline leading-snug"
                                >
                                  {item.title}
                                </Link>
                              ) : (
                                <Link
                                  to={`/events?scroll=${item.id}`}
                                  className="text-sm font-semibold text-gray-800 hover:text-red-700 hover:underline leading-snug"
                                >
                                  {item.title}
                                </Link>
                              )}
                              <p className="mt-0.5 text-xs text-gray-500 line-clamp-2 leading-relaxed">{item.desc}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>

                    {/* ── Column 2: Publications ── */}
                    {/* <div className="md:col-span-1">
                      <div className="flex items-baseline justify-between mb-5 border-b border-stone-400 pb-3">
                        <Label>Recent Publications</Label>
                        <SectionLink to="/publications" />
                      </div>
                      <div className="space-y-4">
                        {recentPubs.map((item, idx) => (
                          <article key={`${item.id}-${idx}`} className={idx > 0 ? 'pt-4 border-t border-gray-200' : ''}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[9px] font-bold uppercase tracking-wider px-1 py-0.5 rounded ${
                                item._src === 'Journal Publications'
                                  ? ' bg-slate-500 text-slate-50'
                                  : ' bg-slate-100 text-slate-600'
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
                                className="text-sm font-semibold text-gray-800 hover:text-red-700 hover:underline leading-snug"
                              >
                                {item.title}
                              </a>
                            ) : (
                              <p className="text-sm font-semibold text-gray-800 leading-snug">{item.title}</p>
                            )}
                            <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">{item.authors}</p>
                            <p className="text-[11px] text-gray-400 italic line-clamp-1">{item.journal || item.conference}</p>
                          </article>
                        ))}
                      </div>
                      <p className="mt-5 text-[10px] text-gray-400">
                        {recentPubs.length} recent total publications &nbsp;·&nbsp;{' '}
                        <Link to="/publications" className="font-semibold text-gray-600 hover:text-gray-900 hover:underline">View all</Link>
                      </p>
                    </div> */}

                    {/* ── Column 3: Lab Life ── */}
                    <div className="md:col-span-1">
                      <div className="flex items-baseline justify-between mb-5 border-b border-stone-400 pb-3">
                        <Label>Lab Life</Label>
                        <SectionLink to="/events" />
                      </div>
                      <div className="space-y-0">
                        {recentLabLife.map((item, i) => (
                          <article key={item.key} className={`${i > 0 ? 'border-t border-gray-200' : ''} py-4 flex gap-3`}>
                            {item.photo && (
                              <div className="w-14 h-14 flex-shrink-0 rounded overflow-hidden bg-gray-200">
                                <img src={item.photo} alt="" className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] text-gray-400 mb-0.5">
                                {fmtDate(item.date)}{item.place ? ` · ${item.place}` : ''}
                              </p>
                              <Link
                                to={`/events?scroll=${item.id}`}
                                className="text-sm font-semibold text-gray-800 hover:text-red-700 hover:underline leading-snug"
                              >
                                {item.title}
                              </Link>
                              <p className="mt-0.5 text-xs text-gray-500 line-clamp-2 leading-relaxed">{item.desc}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </section>
            </>
          )}
        </div>
        {/* ══════════════════════════════════════
            QUICK NAV — clean Senseable-style link row
            ══════════════════════════════════════ */}
        {/* <section className="bg-white border-t border-b border-gray-200">
          <div className="container mx-auto px-6 sm:px-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200">
              {[
                { to: '/people',       label: 'People',       sub: 'Members & Alumni'          },
                { to: '/projects',     label: 'Projects',     sub: 'Funded research projects'   },
                { to: '/events',       label: 'Events',       sub: 'Activities & Workshops'        },
                { to: '/publications', label: 'Publications', sub: 'Journal Publications & Conference Papers'        },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-6 py-6 group hover:bg-gray-50 transition-colors"
                >
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-red-700 transition-colors">
                    {link.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 font-light">{link.sub}</p>
                </Link>
              ))}
            </div>
          </div>
        </section> */}
        {/* ══════════════════════════════════════
            FOOTER — light, clean (Senseable-style)
            ══════════════════════════════════════ */}
        <footer className="px-6 sm:px-10 bg-white border-t border-gray-200">
          <div className="container mx-auto px-6 sm:px-10 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm mb-10">

              <div>
                <p className="font-semibold text-gray-900 mb-1 text-base">
                  Spacetime Intelligence Laboratory
                </p>
                <p className="text-xs text-gray-400 font-light">
                  KAIST · Civil and Environmental Engineering
                </p>
                <div className="mt-4 flex flex-col gap-1 text-xs text-gray-500">
                  <Link to="/research"      className="hover:text-gray-900 hover:underline font-light">Research</Link>
                  <Link to="/publications"  className="hover:text-gray-900 hover:underline font-light">Publications</Link>
                  <Link to="/people"        className="hover:text-gray-900 hover:underline font-light">People</Link>
                  <Link to="/projects"      className="hover:text-gray-900 hover:underline font-light">Projects</Link>
                  <Link to="/events"        className="hover:text-gray-900 hover:underline font-light">Events</Link>
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Address</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  W16 #410, KAIST<br />
                  291 Daehak-ro, Yuseong-gu<br />
                  Daejeon, Republic of Korea
                </p>
              </div>

              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Contact</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  TEL: +82-42-350-3615<br />
                  yoonjin@kaist.ac.kr
                </p>
              </div>

            </div>

            <Rule />

            <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-gray-400 font-light">
                © {new Date().getFullYear()} Spacetime Intelligence Laboratory, KAIST
              </p>
              <p className="text-xs text-gray-300 font-light">
                Department of Civil and Environmental Engineering
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
