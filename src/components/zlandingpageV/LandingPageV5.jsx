/**
 * LandingPageV5  —  Inspired by MIT Senseable City Lab (senseable.mit.edu)
 *
 * Design language:
 *  • Pure white canvas throughout — no coloured bands
 *  • Large, image-first research grid: 1px cell separators, varying col-spans
 *  • Montserrat font-light for body / font-semibold for headings
 *  • Section labels: tiny, uppercase, wide-tracked, grey
 *  • Thin <hr> between every section
 *  • Single accent: #C0392B (deep red) for arrows & active labels only
 *  • Publications as a flat academic bibliography list
 *  • News + Activity as compact vertical feeds
 */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDataLoader } from '../hooks/useDataLoader';
import Navbar from '../utility/Navbar';
import ScrollUpBt from '../utility/ScrollUpButton';

/* ── helpers ── */
const parseYear = (v) => { const n = Number.parseInt(v, 10); return Number.isNaN(n) ? 0 : n; };
const fmtDate   = (raw) => {
  if (!raw) return '';
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};
const stripMd = (s = '') =>
  s.replace(/\*\*/g, '').replace(/#+\s/g, '').replace(/\[.*?\]\(.*?\)/g, '').replace(/\n/g, ' ').trim();

/* ── micro components ── */
const HR = () => <hr className="border-0 border-t border-gray-200" />;

const SectionLabel = ({ children, link, linkLabel }) => (
  <div className="flex items-baseline justify-between mb-6">
    <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gray-400">
      {children}
    </span>
    {link && (
      <Link to={link} className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 hover:text-gray-900 transition-colors">
        {linkLabel || 'View all'} →
      </Link>
    )}
  </div>
);

/* ══════════════════════════════════════════════════════════
   RESEARCH ROW  — compact 2-col index list
   Each row: small square thumbnail + title + one-liner desc
   ══════════════════════════════════════════════════════════ */
const ResearchRow = ({ item, index }) => (
  <Link
    to={`/research/${item.id}`}
    className="group flex items-start gap-4 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors px-2 -mx-2"
  >
    {/* Index number */}
    <span className="text-[10px] font-semibold text-gray-300 w-5 shrink-0 pt-1 tabular-nums">
      {String(index + 1).padStart(2, '0')}
    </span>

    {/* Small square thumbnail */}
    <div className="w-14 h-14 shrink-0 overflow-hidden bg-gray-100 rounded-sm">
      {item.thumbnail ? (
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50" />
      )}
    </div>

    {/* Text */}
    <div className="flex-1 min-w-0">
      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#C0392B] transition-colors leading-snug">
        {item.title}
      </h3>
      <p className="mt-0.5 text-xs text-gray-400 font-light leading-snug line-clamp-1">
        {item.desc}
      </p>
    </div>

    {/* Arrow */}
    <span className="text-gray-300 group-hover:text-[#C0392B] text-xs mt-1 shrink-0 transition-colors">→</span>
  </Link>
);

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════ */
export default function LandingPageV5() {
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

  const news = useMemo(() =>
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

  const recentEvents = useMemo(() =>
    (eventsData || []).slice(0, 6).map(ev => ({
      id:    ev.id,
      title: ev.title,
      date:  ev.start,
      place: ev.place,
      photo: ev.photos?.[0] || null,
      desc:  stripMd(ev.desc || '').slice(0, 90),
    })),
  [eventsData]);

  const research   = researchData || [];
  const pubTotal   = (publicationsData?.length || 0) + (internationalData?.length || 0);

  /* Show first 8 research items in compact index */
  const researchPreview = research.slice(0, 8);

  if (loading) {
    return (
      <div id="top" className="font-display w-screen min-h-screen bg-white">
        <div className="w-full h-16" /><Navbar />
        <div className="max-w-6xl mx-auto px-6 pt-28 text-gray-300 text-sm font-light">Loading…</div>
      </div>
    );
  }

  return (
    <div id="top" className="font-display flex flex-col items-center overflow-hidden">
      <div className="w-screen min-w-[320px] bg-white">
        <div className="w-full h-16" />
        <Navbar />
        <ScrollUpBt />

        {/* ══════════════════════════════════════════════════
            TOP IDENTITY BAR  — Senseable has their logo + MIT logo
        ══════════════════════════════════════════════════ */}
        <div className="border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-900">
                Spacetime Intelligence Laboratory
              </span>
            </div>
            <span className="text-[11px] tracking-[0.18em] uppercase text-gray-400">
              KAIST
            </span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            HERO  — Senseable: full white, huge tagline, mission paragraphs
        ══════════════════════════════════════════════════ */}
        <section className="border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-16 pb-14">

            {/* Big tagline  — Senseable uses font-light for the main tagline */}
            <h1
              className="text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem] font-light leading-[1.1] tracking-[-0.01em] text-gray-900 max-w-5xl"
            >
              Spacetime intelligence and AI innovation<br className="hidden sm:block" />
              through <em className="not-italic font-semibold">data &amp; science</em>
            </h1>

            {/* Mission — Senseable shows 2-3 paragraphs right under the tagline */}
            <div className="mt-10 max-w-4xl space-y-4">
              <p className="text-sm sm:text-[15px] font-light leading-[1.85] text-gray-600">
                The real-time city is real. As layers of networks and digital information blanket
                urban space, new approaches to the study of the built environment are emerging.
                The mission of the Spacetime Intelligence Laboratory — a research initiative at
                KAIST — is to advance <strong className="font-semibold text-gray-800">spacetime
                Artificial Intelligence</strong> for urban context and its implications on how we
                move, plan, and understand cities.
              </p>
              <p className="text-sm sm:text-[15px] font-light leading-[1.85] text-gray-600">
                Not bound by the methodologies of a single field, the Lab is characterised by an
                interdisciplinary approach spanning transportation engineering, computer science,
                urban planning, and data science. From traffic forecasting GNN models to urban air
                mobility to maritime trajectory intelligence — the Lab develops and deploys AI tools
                to learn about cities, so that cities can learn about us.
              </p>
            </div>

            {/* Inline CTA row */}
            <div className="mt-10 flex flex-wrap items-center gap-4 pt-8 border-t border-gray-100">
              <Link to="/research"
                className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-900 border border-gray-900 px-5 py-2.5 hover:bg-gray-900 hover:text-white transition-colors">
                Explore Research
              </Link>
              <Link to="/publications"
                className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 border border-gray-300 px-5 py-2.5 hover:border-gray-600 hover:text-gray-900 transition-colors">
                {pubTotal}+ Publications
              </Link>
              <Link to="/people"
                className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 border border-gray-300 px-5 py-2.5 hover:border-gray-600 hover:text-gray-900 transition-colors">
                People
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            RESEARCH  — compact two-column index list
        ══════════════════════════════════════════════════ */}
        <section className="border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10">
            <SectionLabel link="/research" linkLabel="View all research">
              Research
            </SectionLabel>

            {/* Two-column index grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
              {researchPreview.map((item, idx) => (
                <ResearchRow key={item.id} item={item} index={idx} />
              ))}
            </div>

            <div className="mt-6">
              <Link to="/research"
                className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 hover:text-[#C0392B] transition-colors">
                Browse all {research.length} research areas →
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            PUBLICATIONS  — flat academic bibliography list
        ══════════════════════════════════════════════════ */}
        <section className="border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12">
            <SectionLabel link="/publications" linkLabel="Browse all publications">
              Publications
            </SectionLabel>

            <div className="divide-y divide-gray-100">
              {recentPubs.map((item, idx) => (
                <article key={`${item.id}-${idx}`} className="py-4 flex gap-5">

                  {/* Year + type badge */}
                  <div className="w-24 shrink-0 pt-0.5">
                    <span className="text-sm font-semibold text-gray-900">{item.date || '—'}</span>
                    <p className={`mt-0.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded inline-block ${
                      item._src === 'Journal'
                        ? 'bg-gray-100 text-gray-500'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {item._src}
                    </p>
                  </div>

                  {/* Citation */}
                  <div className="flex-1 min-w-0">
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-gray-900 hover:text-[#C0392B] hover:underline leading-snug"
                      >
                        {item.title}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-gray-900 leading-snug">{item.title}</p>
                    )}
                    <p className="mt-0.5 text-xs font-light text-gray-500 leading-relaxed">
                      {item.authors}
                      {(item.journal || item.conference) && (
                        <> &nbsp;·&nbsp; <em>{item.journal || item.conference}</em></>
                      )}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-light text-gray-400">
                {pubTotal} total papers &nbsp;·&nbsp;{' '}
                <Link to="/publications"
                  className="font-semibold text-gray-500 hover:text-[#C0392B] hover:underline uppercase tracking-[0.1em] text-[10px]">
                  View complete list →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            NEWS + ACTIVITY — two columns, Senseable sidebar style
        ══════════════════════════════════════════════════ */}
        <section className="border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16">

              {/* ── In the Press ── */}
              <div>
                <SectionLabel link="/press" linkLabel="See all news">In the Press</SectionLabel>

                <div className="space-y-0 divide-y divide-gray-100">
                  {news.map((item, i) => (
                    <article key={item.id} className="py-5 flex gap-4">
                      {item.image && (
                        <div className={`flex-shrink-0 rounded overflow-hidden bg-gray-100 ${i === 0 ? 'w-28 h-20' : 'w-16 h-14'}`}>
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[10px] font-light text-gray-400">{fmtDate(item.date)}</span>
                          {item.keywords.slice(0, 2).map(k => (
                            <span key={k} className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                              {k}
                            </span>
                          ))}
                        </div>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`font-semibold text-gray-900 hover:text-[#C0392B] hover:underline leading-snug ${i === 0 ? 'text-base' : 'text-sm'}`}
                        >
                          {item.title}
                        </a>
                        {i === 0 && (
                          <p className="mt-1 text-xs font-light text-gray-500 leading-relaxed line-clamp-2">
                            {item.desc}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* ── Lab Activity ── */}
              <div>
                <SectionLabel link="/events" linkLabel="All events">Lab Activity</SectionLabel>

                <div className="divide-y divide-gray-100">
                  {recentEvents.map(ev => (
                    <article key={ev.id} className="py-4 flex gap-3 items-start">
                      {ev.photo && (
                        <div className="w-14 h-14 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                          <img src={ev.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-light text-gray-400 mb-0.5">
                          {fmtDate(ev.date)}{ev.place ? <> &nbsp;·&nbsp; {ev.place}</> : ''}
                        </p>
                        <Link
                          to={`/events?scroll=${ev.id}`}
                          className="text-sm font-semibold text-gray-900 hover:text-[#C0392B] hover:underline leading-snug"
                        >
                          {ev.title}
                        </Link>
                        <p className="mt-0.5 text-xs font-light text-gray-500 leading-relaxed line-clamp-2">
                          {ev.desc}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            EXPLORE — Senseable-style plain link list
        ══════════════════════════════════════════════════ */}
        <section className="border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { to: '/people',       label: 'Team',         sub: 'Members & alumni'        },
                { to: '/projects',     label: 'Projects',     sub: 'Funded research projects' },
                { to: '/events',       label: 'Events',       sub: 'Talks & conferences'     },
                { to: '/publications', label: 'Publications', sub: `${pubTotal}+ papers`     },
              ].map(link => (
                <Link key={link.to} to={link.to} className="group">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-900 group-hover:text-[#C0392B] transition-colors">
                    {link.label}
                  </p>
                  <p className="mt-1 text-xs font-light text-gray-400">{link.sub}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            FOOTER  — clean white, Senseable-style
        ══════════════════════════════════════════════════ */}
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 text-xs font-light leading-relaxed text-gray-500 mb-10">

              <div className="sm:col-span-2">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Spacetime Intelligence Laboratory
                </p>
                <p className="text-xs font-light text-gray-400 mb-4">
                  KAIST · Department of Civil and Environmental Engineering
                </p>
                <p className="leading-relaxed">
                  W16 #410, KAIST, 291 Daehak-ro<br />
                  Yuseong-gu, Daejeon, Republic of Korea
                </p>
                <p className="mt-2">
                  TEL: +82-42-350-3615<br />
                  yoonjin@kaist.ac.kr
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Research</p>
                <div className="space-y-1.5">
                  {(researchData || []).slice(0, 5).map(r => (
                    <Link key={r.id} to={`/research/${r.id}`}
                      className="block text-gray-500 hover:text-gray-900 hover:underline font-light">
                      {r.menuTitle || r.title}
                    </Link>
                  ))}
                  <Link to="/research" className="block text-[#C0392B] hover:underline font-semibold text-[10px] uppercase tracking-widest mt-2">
                    All research →
                  </Link>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Navigate</p>
                <div className="space-y-1.5">
                  {[
                    { to: '/people',       label: 'Team'         },
                    { to: '/publications', label: 'Publications' },
                    { to: '/projects',     label: 'Projects'     },
                    { to: '/events',       label: 'Events'       },
                    { to: '/press',        label: 'Press'        },
                  ].map(l => (
                    <Link key={l.to} to={l.to}
                      className="block text-gray-500 hover:text-gray-900 hover:underline font-light">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

            </div>

            <HR />

            <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[10px] font-light text-gray-400">
                © {new Date().getFullYear()} Spacetime Intelligence Laboratory, KAIST. All rights reserved.
              </p>
              <p className="text-[10px] font-light text-gray-300">
                Inspired by{' '}
                <a href="https://senseable.mit.edu" target="_blank" rel="noopener noreferrer"
                  className="hover:text-gray-500 underline">
                  MIT Senseable City Lab
                </a>
              </p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
