import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDataLoader } from '../hooks/useDataLoader';
import Navbar from '../utility/Navbar';
import ScrollUpBt from '../utility/ScrollUpButton';

const parseYear = (v) => { const n = Number.parseInt(v, 10); return Number.isNaN(n) ? 0 : n; };

const fmtDate = (raw) => {
  if (!raw) return '';
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const stripMd = (s = '') =>
  s.replace(/\*\*/g, '').replace(/#+\s/g, '').replace(/\n/g, ' ').trim();

/* ── Thin horizontal rule used between every section ── */
const Rule = () => <hr className="border-t border-gray-200 my-0" />;

/* ── Section label — small-caps Montserrat ── */
const Label = ({ children }) => (
  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400 mb-4">
    {children}
  </p>
);

export default function LandingPageV4() {
  const { data: researchData,      loading: rL  } = useDataLoader('researchData');
  const { data: publicationsData,  loading: pL  } = useDataLoader('publicationsData');
  const { data: internationalData, loading: iL  } = useDataLoader('internationalData');
  const { data: pressData,         loading: prL } = useDataLoader('pressData');
  const { data: eventsData,        loading: eL  } = useDataLoader('eventsData');

  const loading = rL || pL || iL || prL || eL;

  const recentPubs = useMemo(() => {
    const j = (publicationsData  || []).map(i => ({ ...i, _src: 'Journal'    }));
    const c = (internationalData || []).map(i => ({ ...i, _src: 'Conference' }));
    return [...j, ...c].sort((a, b) => parseYear(b.date) - parseYear(a.date)).slice(0, 7);
  }, [publicationsData, internationalData]);

  const news = useMemo(() =>
    (pressData || []).slice(0, 4).map(p => ({
      id:       p.id,
      title:    p.title,
      desc:     p.desc?.split('\n').filter(Boolean)[0] || '',
      date:     p.date,
      image:    p.image,
      link:     p.link_en || p.link_kr || '#',
      keywords: p.keyword || [],
    })),
  [pressData]);

  const recentEvents = useMemo(() =>
    (eventsData || []).slice(0, 5).map(ev => ({
      id:    ev.id,
      title: ev.title,
      date:  ev.start,
      place: ev.place,
      photo: ev.photos?.[0] || null,
      desc:  stripMd(ev.desc || '').slice(0, 90),
    })),
  [eventsData]);

  const pubTotal = (publicationsData?.length || 0) + (internationalData?.length || 0);

  if (loading) {
    return (
      <div id="top" className="font-display w-screen min-h-screen bg-white">
        <div className="w-full h-16" /><Navbar />
        <div className="max-w-6xl mx-auto px-6 pt-28 text-gray-400">Loading…</div>
      </div>
    );
  }

  return (
    <div id="top" className="font-display flex flex-col items-center overflow-hidden">
      <div className="w-screen min-w-[320px] bg-[#F8F7F4]">
        <div className="w-full h-16" />
        <Navbar />
        <ScrollUpBt />

        {/* ══════════════════════════════════════
            HERO — Senseable-style: all white, huge
            tagline, clean mission paragraph
        ══════════════════════════════════════ */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-14 pb-14">

            {/* Breadcrumb */}
            <p className="text-[11px] tracking-[0.18em] uppercase text-gray-400 mb-8">
              KAIST &nbsp;/&nbsp; Civil and Environmental Engineering &nbsp;/&nbsp;
              <span className="text-gray-700 font-semibold">STIL</span>
            </p>

            {/* Big editorial tagline */}
            <h1
              className="text-[2.6rem] sm:text-[3.6rem] lg:text-[4.4rem] font-light leading-[1.08] tracking-[-0.01em] text-gray-900 max-w-5xl"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Urban imagination and{' '}
              <span className="font-semibold">AI innovation</span>
              <br className="hidden sm:block" />
              for the cities of tomorrow
            </h1>

            {/* Mission — two paragraphs like Senseable */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
              <p className="text-sm sm:text-[15px] leading-7 text-gray-600 font-light">
                The research focus at Spacetime Intelligence Laboratory is{' '}
                <strong className="font-semibold text-gray-800">spacetime Artificial Intelligence</strong>{' '}
                and its implication in the urban context. The research scope ranges from traffic
                forecasting GNN models to autonomous driver workload assessment to urban air
                mobility feasibility study.
              </p>
              <p className="text-sm sm:text-[15px] leading-7 text-gray-600 font-light">
                Not bound by a single methodology, the Lab develops data-driven AI frameworks
                that are both scientifically rigorous and policy-relevant — bridging the gap
                between computational research and real-world urban challenges at KAIST.
              </p>
            </div>

            {/* Inline stat strip */}
            <div className="mt-10 flex flex-wrap items-center gap-6 text-xs font-semibold text-gray-500 tracking-wide border-t border-gray-100 pt-6">
              <span><strong className="text-2xl font-bold text-gray-900 mr-1">{researchData?.length || 0}</strong> Research Areas</span>
              <span className="text-gray-200">|</span>
              <span><strong className="text-2xl font-bold text-gray-900 mr-1">{pubTotal}+</strong> Publications</span>
              <span className="text-gray-200">|</span>
              <span><strong className="text-2xl font-bold text-gray-900 mr-1">2011</strong> Established</span>
              <div className="flex gap-3 ml-auto">
                <Link to="/research"
                  className="px-4 py-2 bg-gray-900 text-white text-xs font-semibold rounded hover:bg-gray-700 transition-colors">
                  Explore Research
                </Link>
                <Link to="/publications"
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-semibold rounded hover:border-gray-500 transition-colors">
                  Publications
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════
            RESEARCH — Senseable-style project grid
            Large images in an editorial layout
        ══════════════════════════════════════ */}
        <section className="bg-white py-14 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            <div className="flex items-baseline justify-between mb-8">
              <Label>Research</Label>
              <Link to="/research" className="text-xs font-semibold text-gray-500 hover:text-gray-900 hover:underline">
                View all research →
              </Link>
            </div>

            {/* Senseable-style: first card large (2-col span), rest in 3-col */}
            {(researchData || []).length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">

                {/* Featured first item: spans 2 columns on lg */}
                <Link
                  to={`/research/${researchData[0].id}`}
                  className="group bg-white sm:col-span-2 lg:col-span-2 overflow-hidden flex flex-col"
                >
                  {researchData[0].thumbnail && (
                    <div className="w-full h-56 sm:h-72 overflow-hidden bg-gray-100">
                      <img
                        src={researchData[0].thumbnail}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-5 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-700 leading-snug transition-colors">
                      {researchData[0].title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-3">
                      {researchData[0].desc}
                    </p>
                    <p className="mt-3 text-xs font-semibold text-red-700">Read more →</p>
                  </div>
                </Link>

                {/* Remaining items: single column cards */}
                {(researchData || []).slice(1).map(item => (
                  <Link
                    key={item.id}
                    to={`/research/${item.id}`}
                    className="group bg-white overflow-hidden flex flex-col"
                  >
                    {item.thumbnail ? (
                      <div className="w-full h-40 overflow-hidden bg-gray-100">
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                        <span className="text-gray-300 text-[10px] uppercase tracking-wider">Research</span>
                      </div>
                    )}
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-red-700 leading-snug transition-colors flex-1">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-gray-500 leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════
            THREE COLUMNS: News | Publications | Activity
            (Senseable-style side-by-side editorial)
        ══════════════════════════════════════ */}
        <section className="bg-[#F8F7F4] py-14 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">

              {/* ── Column 1: News ── */}
              <div className="md:col-span-1">
                <div className="flex items-baseline justify-between mb-5">
                  <Label>Latest News</Label>
                  <Link to="/press" className="text-[10px] font-semibold text-gray-400 hover:text-gray-700 hover:underline">All →</Link>
                </div>
                <div className="space-y-5">
                  {news.map((item, i) => (
                    <article key={item.id} className={i > 0 ? 'pt-5 border-t border-gray-200' : ''}>
                      {item.image && i === 0 && (
                        <div className="w-full h-36 rounded overflow-hidden bg-gray-200 mb-3">
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] text-gray-400">{fmtDate(item.date)}</span>
                        {item.keywords.slice(0, 1).map(k => (
                          <span key={k} className="text-[10px] font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                            {k}
                          </span>
                        ))}
                      </div>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-gray-900 hover:text-red-700 hover:underline leading-snug"
                      >
                        {item.title}
                      </a>
                      {i === 0 && (
                        <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2">{item.desc}</p>
                      )}
                    </article>
                  ))}
                </div>
              </div>

              {/* ── Column 2: Publications ── */}
              <div className="md:col-span-1">
                <div className="flex items-baseline justify-between mb-5">
                  <Label>Recent Publications</Label>
                  <Link to="/publications" className="text-[10px] font-semibold text-gray-400 hover:text-gray-700 hover:underline">All →</Link>
                </div>
                <div className="space-y-4">
                  {recentPubs.map((item, idx) => (
                    <article key={`${item.id}-${idx}`} className={idx > 0 ? 'pt-4 border-t border-gray-200' : ''}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          item._src === 'Journal'
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-emerald-50 text-emerald-600'
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
                  {pubTotal} total publications &nbsp;·&nbsp;{' '}
                  <Link to="/publications" className="font-semibold text-gray-600 hover:text-gray-900 hover:underline">View all</Link>
                </p>
              </div>

              {/* ── Column 3: Lab Activity ── */}
              <div className="md:col-span-1">
                <div className="flex items-baseline justify-between mb-5">
                  <Label>Lab Activity</Label>
                  <Link to="/events" className="text-[10px] font-semibold text-gray-400 hover:text-gray-700 hover:underline">All →</Link>
                </div>
                <div className="space-y-0">
                  {recentEvents.map((ev, i) => (
                    <article key={ev.id} className={`${i > 0 ? 'border-t border-gray-200' : ''} py-4 flex gap-3`}>
                      {ev.photo && (
                        <div className="w-14 h-14 flex-shrink-0 rounded overflow-hidden bg-gray-200">
                          <img src={ev.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-gray-400 mb-0.5">
                          {fmtDate(ev.date)}{ev.place ? ` · ${ev.place}` : ''}
                        </p>
                        <Link
                          to={`/events?scroll=${ev.id}`}
                          className="text-sm font-semibold text-gray-800 hover:text-red-700 hover:underline leading-snug"
                        >
                          {ev.title}
                        </Link>
                        <p className="mt-0.5 text-xs text-gray-500 line-clamp-2 leading-relaxed">{ev.desc}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            STATS STRIP — dark, clean
        ══════════════════════════════════════ */}
        <section className="bg-gray-900">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              {[
                { value: researchData?.length || 0,      label: 'Research Areas'       },
                { value: `${pubTotal}+`,                 label: 'Publications'         },
                { value: `${eventsData?.length || 0}+`,  label: 'Events & Activities'  },
                { value: '2011',                         label: 'Established at KAIST'  },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-4xl sm:text-5xl font-bold text-white leading-none">{s.value}</p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            QUICK NAV — clean Senseable-style link row
        ══════════════════════════════════════ */}
        <section className="bg-white border-t border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200">
              {[
                { to: '/people',       label: 'People',       sub: 'Members & alumni'          },
                { to: '/projects',     label: 'Projects',     sub: 'Funded research projects'   },
                { to: '/events',       label: 'Events',       sub: 'Talks & conferences'        },
                { to: '/publications', label: 'Publications', sub: `${pubTotal}+ papers`        },
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
        </section>

        {/* ══════════════════════════════════════
            FOOTER — light, clean (Senseable-style)
        ══════════════════════════════════════ */}
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12">
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
