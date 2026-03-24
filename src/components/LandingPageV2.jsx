import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDataLoader } from '../hooks/useDataLoader';
import NavbarCategorized from '../utility/NavbarCategorized';
import ScrollUpBt from '../utility/ScrollUpButton';

const parseYear = (v) => {
  const n = Number.parseInt(v, 10);
  return Number.isNaN(n) ? 0 : n;
};

const fmtDate = (raw) => {
  if (!raw) return '';
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const stripMd = (str = '') => str.replace(/\*\*/g, '').replace(/\n/g, ' ').trim();

export default function LandingPageV2() {
  const { data: researchData,      loading: rL  } = useDataLoader('researchData');
  const { data: publicationsData,  loading: pL  } = useDataLoader('publicationsData');
  const { data: internationalData, loading: iL  } = useDataLoader('internationalData');
  const { data: pressData,         loading: prL } = useDataLoader('pressData');
  const { data: eventsData,        loading: eL  } = useDataLoader('eventsData');

  const loading = rL || pL || iL || prL || eL;

  const recentPubs = useMemo(() => {
    const j = (publicationsData  || []).map(i => ({ ...i, _src: 'Journal' }));
    const c = (internationalData || []).map(i => ({ ...i, _src: 'Conference' }));
    return [...j, ...c].sort((a, b) => parseYear(b.date) - parseYear(a.date)).slice(0, 6);
  }, [publicationsData, internationalData]);

  const featuredNews = useMemo(() => {
    const p = (pressData || [])[0];
    if (!p) return null;
    return {
      id:       p.id,
      title:    p.title,
      desc:     p.desc?.split('\n').filter(Boolean)[0] || '',
      date:     p.date,
      image:    p.image,
      link:     p.link_en || p.link_kr || '#',
      keywords: p.keyword || [],
    };
  }, [pressData]);

  const sideNews = useMemo(() =>
    (pressData || []).slice(1, 4).map(p => ({
      id:    p.id,
      title: p.title,
      date:  p.date,
      link:  p.link_en || p.link_kr || '#',
    })),
  [pressData]);

  const recentEvents = useMemo(() =>
    (eventsData || []).slice(0, 3).map(ev => ({
      id:    ev.id,
      title: ev.title,
      date:  ev.start,
      place: ev.place,
      photo: ev.photos?.[0] || null,
      desc:  stripMd(ev.desc || '').slice(0, 110) + '…',
    })),
  [eventsData]);

  const pubTotal        = (publicationsData?.length || 0) + (internationalData?.length || 0);
  const researchKeywords = (researchData || []).map(r => r.menuTitle || r.title).filter(Boolean);

  if (loading) {
    return (
      <div id="top" className="font-display w-screen min-h-screen bg-stone-50">
        <div className="w-full h-16" /><NavbarCategorized />
        <div className="max-w-6xl mx-auto px-6 pt-28 text-stone-400">Loading…</div>
      </div>
    );
  }

  return (
    <div id="top" className="font-display flex flex-col items-center overflow-hidden">
      <div className="w-screen min-w-[320px]">
        <div className="w-full h-16" />
        <NavbarCategorized />
        <ScrollUpBt />

        {/* ─── BREADCRUMB ─── */}
        <div className="bg-stone-950">
          <div className="max-w-6xl mx-auto px-6 py-2 text-[11px] text-stone-500 flex items-center gap-2 tracking-wide">
            <span>KAIST</span>
            <span>›</span>
            <span>Civil and Environmental Engineering</span>
            <span>›</span>
            <span className="text-amber-400 font-semibold">Spacetime Intelligence Laboratory</span>
          </div>
        </div>

        {/* ─── HERO ─── */}
        <header className="bg-stone-900 text-white">
          <div className="max-w-6xl mx-auto px-6 pt-14 pb-14">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

              {/* Title + tagline */}
              <div>
                <h1 className="text-5xl sm:text-7xl font-bold leading-[0.92] tracking-tight">
                  Spacetime<br />Intelligence<br />Laboratory
                </h1>
                <p className="mt-6 text-stone-300 text-base sm:text-lg leading-relaxed max-w-lg">
                  Advancing <strong className="text-white">spacetime Artificial Intelligence</strong> for
                  urban mobility, transportation systems, and intelligent cities — at KAIST.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link to="/research"      className="px-4 py-2 bg-slate-500 text-amber-950 text-xs font-bold uppercase tracking-wide rounded hover:bg-slate-400 transition-colors">Explore Research</Link>
                  <Link to="/publications"  className="px-4 py-2 border border-stone-600 text-stone-300 text-xs font-bold uppercase tracking-wide rounded hover:border-stone-400 hover:text-white transition-colors">Publications</Link>
                </div>
              </div>

              {/* Stat chips */}
              <div className="flex flex-row lg:flex-col gap-3 shrink-0">
                {[
                  { value: researchData?.length || 0, label: 'Research Areas' },
                  { value: `${pubTotal}+`,            label: 'Publications'   },
                  { value: 2011,                      label: 'Established'    },
                ].map(s => (
                  <div key={s.label} className="bg-stone-800 border border-stone-700 rounded-lg px-5 py-4 min-w-[130px]">
                    <p className="text-3xl font-bold text-amber-400 leading-none">{s.value}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-stone-400">{s.label}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </header>

        {/* ─── RESEARCH KEYWORD STRIP ─── */}
        <div className="bg-slate-500 py-2.5 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center gap-x-3 gap-y-1">
            {researchKeywords.map((kw, i) => (
              <React.Fragment key={kw}>
                <span className="text-xs font-semibold text-amber-950 whitespace-nowrap">{kw}</span>
                {i < researchKeywords.length - 1 && (
                  <span className="text-amber-600 text-xs">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ─── MISSION ─── */}
        <section className="bg-white border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <p className="text-base sm:text-[17px] leading-[1.9] text-stone-700 max-w-4xl">
              The research focus at Spacetime Intelligence Lab is{' '}
              <strong>spacetime Artificial Intelligence</strong> and its implication in the urban context.
              Our scope ranges from traffic forecasting GNN models and urban region representation learning,
              to autonomous driver workload assessment, urban air mobility feasibility, and maritime
              trajectory intelligence. We build rigorous AI frameworks that are both scientifically sound
              and policy-relevant for future cities.
            </p>
          </div>
        </section>

        {/* ─── TWO-COLUMN: NEWS × RESEARCH ─── */}
        <section className="bg-stone-50 border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12">

              {/* ── Left: News ── */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-6">
                  News &amp; Highlights
                </p>

                {featuredNews && (
                  <article className="mb-7 pb-7 border-b border-stone-200">
                    {featuredNews.image && (
                      <div className="w-full h-52 rounded-lg overflow-hidden bg-stone-200 mb-4">
                        <img src={featuredNews.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {featuredNews.keywords.map(k => (
                        <span key={k} className="text-[10px] uppercase tracking-wider font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                          {k}
                        </span>
                      ))}
                    </div>
                    <a
                      href={featuredNews.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-bold text-stone-900 hover:text-amber-700 hover:underline leading-snug block"
                    >
                      {featuredNews.title}
                    </a>
                    <p className="mt-2 text-sm text-stone-600 leading-relaxed">{featuredNews.desc}</p>
                    <p className="mt-2 text-xs text-stone-400">{fmtDate(featuredNews.date)}</p>
                  </article>
                )}

                <div className="divide-y divide-stone-200">
                  {sideNews.map(item => (
                    <article key={item.id} className="py-3.5">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-stone-800 hover:text-amber-700 hover:underline leading-snug"
                      >
                        {item.title}
                      </a>
                      <p className="text-xs text-stone-400 mt-0.5">{fmtDate(item.date)}</p>
                    </article>
                  ))}
                </div>

                <Link to="/press" className="inline-block mt-6 text-[10px] font-bold uppercase tracking-[0.15em] text-amber-700 hover:underline">
                  See all news →
                </Link>
              </div>

              {/* ── Right: Research Areas ── */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-6">
                  Research Areas
                </p>

                <div className="space-y-4">
                  {(researchData || []).map(item => (
                    <article key={item.id} className="flex gap-3 items-start group">
                      {item.thumbnail && (
                        <div className="w-16 h-12 flex-shrink-0 rounded overflow-hidden bg-stone-200">
                          <img src={item.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <Link
                          to={`/research/${item.id}`}
                          className="text-sm font-semibold text-stone-900 hover:text-amber-700 hover:underline leading-snug"
                        >
                          {item.title}
                        </Link>
                        <p className="text-xs text-stone-500 mt-0.5 line-clamp-2 leading-relaxed">{item.desc}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <Link to="/research" className="inline-block mt-6 text-[10px] font-bold uppercase tracking-[0.15em] text-amber-700 hover:underline">
                  See all research →
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ─── RECENT PUBLICATIONS ─── */}
        <section className="bg-white border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex items-baseline justify-between mb-8 gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1">Recent Publications</p>
                <p className="text-2xl font-bold text-stone-900">{pubTotal} papers total</p>
              </div>
              <Link to="/publications" className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-700 hover:underline shrink-0">
                Full list →
              </Link>
            </div>

            <div className="divide-y divide-stone-100">
              {recentPubs.map((item, idx) => (
                <article key={`${item.id}-${idx}`} className="py-5 flex gap-5">
                  <span className="text-2xl font-bold text-stone-200 leading-none w-8 shrink-0 pt-1 select-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        item._src === 'Journal'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {item._src}
                      </span>
                      {item.date && <span className="text-xs text-stone-400">{item.date}</span>}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-stone-900 hover:text-amber-700 hover:underline leading-snug"
                      >
                        {item.title}
                      </a>
                    ) : (
                      <p className="text-base font-semibold text-stone-900 leading-snug">{item.title}</p>
                    )}
                    <p className="mt-1 text-sm text-stone-500">{item.authors}</p>
                    <p className="text-sm text-stone-400 italic">{item.journal || item.conference}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── RECENT ACTIVITY (EVENTS) ─── */}
        {recentEvents.length > 0 && (
          <section className="bg-stone-900">
            <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="flex items-baseline justify-between mb-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Recent Activity</p>
                <Link to="/events" className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-500 hover:underline">
                  All events →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {recentEvents.map(ev => (
                  <article key={ev.id} className="rounded-lg overflow-hidden bg-stone-800 border border-stone-700 flex flex-col">
                    {ev.photo ? (
                      <div className="h-40 bg-stone-700 overflow-hidden">
                        <img src={ev.photo} alt="" className="w-full h-full object-cover opacity-90" />
                      </div>
                    ) : (
                      <div className="h-40 bg-stone-800 flex items-center justify-center border-b border-stone-700">
                        <span className="text-stone-600 text-xs uppercase tracking-wider">No photo</span>
                      </div>
                    )}
                    <div className="p-4 flex-1 flex flex-col">
                      <p className="text-[10px] text-amber-500 font-semibold uppercase tracking-wider mb-1.5">
                        {fmtDate(ev.date)}{ev.place ? ` · ${ev.place}` : ''}
                      </p>
                      <Link
                        to={`/events?scroll=${ev.id}`}
                        className="text-sm font-semibold text-white hover:text-amber-400 leading-snug mb-2"
                      >
                        {ev.title}
                      </Link>
                      <p className="text-xs text-stone-400 leading-relaxed line-clamp-3 flex-1">{ev.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── QUICK NAV STRIP ─── */}
        <section className="bg-slate-500">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-amber-400">
              {[
                { to: '/people',       label: 'People',       sub: 'Lab members & alumni'   },
                { to: '/projects',     label: 'Projects',     sub: 'Funded research projects' },
                { to: '/events',       label: 'Events',       sub: 'Talks & conferences'    },
                { to: '/publications', label: 'Publications', sub: `${pubTotal}+ papers`    },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-6 py-6 hover:bg-amber-400 transition-colors"
                >
                  <p className="text-sm font-bold text-amber-950">{link.label}</p>
                  <p className="text-xs text-amber-800 mt-0.5">{link.sub}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="bg-stone-950 text-stone-400">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm leading-relaxed">
              <div>
                <p className="font-bold text-white mb-1">Spacetime Intelligence Laboratory</p>
                <p className="text-xs text-stone-500">KAIST · Civil and Environmental Engineering</p>
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500 mb-2">Address</h3>
                <p>
                  W16 #410, KAIST<br />
                  291 Daehak-ro, Yuseong-gu<br />
                  Daejeon, Republic of Korea
                </p>
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500 mb-2">Contact</h3>
                <p>
                  TEL: +82-42-350-3615<br />
                  yoonjin@kaist.ac.kr
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-stone-800 text-xs text-stone-600">
              © {new Date().getFullYear()} Spacetime Intelligence Laboratory, KAIST. All rights reserved.
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
