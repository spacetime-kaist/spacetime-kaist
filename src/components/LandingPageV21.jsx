import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDataLoader } from '../hooks/useDataLoader';
import Navbar from '../utility/Navbar';
import ScrollUpBt from '../utility/ScrollUpButton';

/* ─── helpers ─── */
const fmtDateFull = (raw) => {
  if (!raw) return '';
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const byDateDesc = (a, b) => {
  const ta = new Date(a._sortDate).getTime();
  const tb = new Date(b._sortDate).getTime();
  return (Number.isNaN(tb) ? 0 : tb) - (Number.isNaN(ta) ? 0 : ta);
};

/* ─── Research highlights config (same as LandingPageAgg) ─── */
const RecentResearch = [
  'urban-heat-urban-sales',
  'urban-region',
  'uam',
  'maritime',
  'traffic-forecasting',
  'transportation-network',
];

const RESEARCH_RELATED = {
  'urban-heat-urban-sales': [
    { data: 'press',   id: 'press20251029' },
    { data: 'outreach', id: '20250930' },
  ],
  'urban-region': [
    { data: 'publications', id: '10.1109/ACCESS.2025.3577202' },
    { data: 'international', id: '4' },
  ],
  'uam': [
    { data: 'international', id: 'i75' },
    { data: 'international', id: 'i73' },
    { data: 'national', id: 'NODE11760070' },
  ],
  'utm':                    [{ data: 'publications', id: 8 }],
  'maritime':               [{ data: 'publications', id: 2 }],
  'traffic-forecasting':    [{ data: 'publications', id: 3 }, { data: 'international', id: 8 }],
  'transportation-network': [{ data: 'national', id: 'NODE12087850' }],
  'autonomous-vehicle':     [],
  'traffic-safety':         [],
  'aviation':               [],
  'other':                  [],
};

/* ─── Badge colour map ─── */
const categoryStyles = {
  press:        'bg-blue-50 text-blue-600 border border-blue-200',
  presentation: 'bg-sky-50 text-sky-600 border border-sky-200',
  conference:   'bg-violet-50 text-violet-600 border border-violet-200',
  workshop:     'bg-emerald-50 text-emerald-600 border border-emerald-200',
  exhibition:   'bg-amber-50 text-amber-600 border border-amber-200',
  seminar:      'bg-teal-50 text-teal-600 border border-teal-200',
  ceremony:     'bg-orange-50 text-orange-600 border border-orange-200',
  honors:       'bg-rose-50 text-rose-600 border border-rose-200',
  meeting:      'bg-slate-50 text-slate-500 border border-slate-200',
  pub_journal:  'bg-slate-700 text-white',
  pub_conf:     'bg-slate-100 text-slate-600 border border-slate-300',
  lablife:      'bg-purple-50 text-purple-600 border border-purple-200',
};
const getCatStyle = (cat) => categoryStyles[cat] || 'bg-slate-50 text-slate-600 border border-slate-200';

/* ─── Sidebar update types ─── */
const UPDATE_FILTERS = ['All', 'Publications', 'Outreach', 'Lab Life'];

/* ─── Sub-components ─── */
const Rule = () => <hr className="border-t border-gray-200 my-0" />;

const SectionHeading = ({ children, action }) => (
  <div className="flex items-baseline justify-between mb-5">
    <h2 className="text-lg font-bold tracking-tight text-slate-900">{children}</h2>
    {action}
  </div>
);

const Badge = ({ label, styleKey }) => (
  <span className={`inline-block text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded leading-none ${getCatStyle(styleKey)}`}>
    {label}
  </span>
);

/* ════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════ */
export default function LandingPageV2_1() {
  const { data: researchData,      loading: rL  } = useDataLoader('researchData');
  const { data: publicationsData,  loading: pL  } = useDataLoader('publicationsData');
  const { data: internationalData, loading: iL  } = useDataLoader('internationalData');
  const { data: nationalData,      loading: nL  } = useDataLoader('nationalData');
  const { data: pressData,         loading: prL } = useDataLoader('pressData');
  const { data: outreachData,      loading: oL  } = useDataLoader('outreachData');
  const { data: lablifeData,       loading: lL  } = useDataLoader('lablifeData');

  const loading = rL || pL || iL || nL || prL || oL || lL;

  const [activeFilter, setActiveFilter] = useState('All');

  /* ── Research highlights ── */
  const featuredResearch = useMemo(() => {
    const list = Array.isArray(researchData) ? researchData : [];
    return RecentResearch.map((id) => {
      const r = list.find((x) => x.id === id);
      return r ? { id: r.id, title: r.title, desc: r.desc, thumbnail: r.thumbnail || null } : { id, title: String(id), desc: '', thumbnail: null };
    });
  }, [researchData]);

  /* ── Related items index (for research cards) ── */
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
      if (data === 'press')         return { subtype: 'press',       label: 'Press',       date: item.date,  title: item.title, href: item.link_en || item.link_kr, isExternal: true };
      if (data === 'outreach')      return { subtype: item.category, label: item.category || 'Event', date: item.start, title: item.title, href: `/events?scroll=${item.id}`, isExternal: false };
      if (data === 'publications')  return { subtype: 'pub_journal', label: 'Journal',     date: item.date,  title: item.title, href: item.href, isExternal: true };
      if (data === 'international') return { subtype: 'pub_conf',    label: 'Intl. Conf.', date: item.date,  title: item.title, href: item.href, isExternal: true };
      if (data === 'national')      return { subtype: 'pub_conf',    label: 'Natl. Conf.', date: item.date,  title: item.title, href: item.href, isExternal: true };
      return null;
    };
    return Object.fromEntries(
      Object.entries(RESEARCH_RELATED).map(([rid, refs]) => [rid, refs.map(resolve).filter(Boolean)])
    );
  }, [pressData, outreachData, publicationsData, internationalData, nationalData, lablifeData]);

  /* ── All recent updates (sidebar feed) ── */
  const allUpdates = useMemo(() => {
    const pubs = (publicationsData || []).map(i => ({
      key: `pub-${i.id}`,
      type: 'Publications',
      subtype: 'pub_journal',
      label: 'Journal',
      _sortDate: `${i.date}-01-01`,
      date: String(i.date),
      title: i.title,
      subtitle: i.journal,
      href: i.href,
      isExternal: true,
    }));
    const intl = (internationalData || []).map(i => ({
      key: `intl-${i.id}`,
      type: 'Publications',
      subtype: 'pub_conf',
      label: 'Conf.',
      _sortDate: `${i.date}-01-01`,
      date: String(i.date),
      title: i.title,
      subtitle: i.conference,
      href: i.href,
      isExternal: true,
    }));
    const natl = (nationalData || []).map(i => ({
      key: `natl-${i.id}`,
      type: 'Publications',
      subtype: 'pub_conf',
      label: 'Conf.',
      _sortDate: `${i.date}-01-01`,
      date: String(i.date),
      title: i.title,
      subtitle: i.conference,
      href: i.href,
      isExternal: true,
    }));
    const press = (pressData || []).map(p => ({
      key: `press-${p.id}`,
      type: 'Outreach',
      subtype: 'press',
      label: 'Press',
      _sortDate: p.date,
      date: fmtDateFull(p.date),
      title: p.title,
      subtitle: p.writer,
      href: p.link_en || p.link_kr,
      isExternal: true,
    }));
    const events = (outreachData || []).filter(ev => ev.category !== 'meeting').map(ev => ({
      key: `ev-${ev.id}`,
      type: 'Outreach',
      subtype: ev.category,
      label: ev.category,
      _sortDate: ev.start,
      date: fmtDateFull(ev.start),
      title: ev.title,
      subtitle: ev.place,
      href: `/events?scroll=${ev.id}`,
      isExternal: false,
    }));
    const lablife = (lablifeData || []).map(ev => ({
      key: `ll-${ev.id}`,
      type: 'Lab Life',
      subtype: 'lablife',
      label: 'Lab Life',
      _sortDate: ev.start,
      date: fmtDateFull(ev.start),
      title: ev.title,
      subtitle: ev.place,
      href: `/events?scroll=${ev.id}`,
      isExternal: false,
    }));

    return [...pubs, ...intl, ...natl, ...press, ...events, ...lablife].sort(byDateDesc);
  }, [publicationsData, internationalData, nationalData, pressData, outreachData, lablifeData]);

  const filteredUpdates = useMemo(() => {
    if (activeFilter === 'All') return allUpdates.slice(0, 30);
    return allUpdates.filter(u => u.type === activeFilter).slice(0, 30);
  }, [allUpdates, activeFilter]);

  if (loading) {
    return (
      <div id="top" className="font-display w-screen min-h-screen bg-white">
        <div className="w-full h-16" /><Navbar />
        <div className="max-w-7xl mx-auto px-6 pt-28 text-gray-400 text-sm">Loading…</div>
      </div>
    );
  }

  return (
    <div id="top" className="font-display bg-slate-50 text-slate-900">
      <div className="w-full h-16" />
      <Navbar />
      <ScrollUpBt />

      {/* ══ HEADER ══ */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-20 pb-12">
          <p className="text-xs tracking-[0.18em] uppercase text-slate-400 font-medium">
            KAIST · Civil and Environmental Engineering · Data Science
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Spacetime Intelligence Lab
          </h1>
          <p className="mt-5 max-w-2xl text-sm md:text-base leading-relaxed text-slate-600">
            Data-driven and AI-centered research for urban, mobility, and transportation systems.
            Urban representation learning · Traffic forecasting · Autonomous mobility ·
            Airspace intelligence · Public-safety analytics.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link to="/research"     className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold uppercase tracking-wide rounded hover:bg-slate-700 transition-colors">
              Research
            </Link>
            <Link to="/publications" className="px-4 py-2 border border-slate-300 text-slate-600 text-xs font-semibold uppercase tracking-wide rounded hover:bg-slate-100 transition-colors">
              Publications
            </Link>
            <Link to="/people"       className="px-4 py-2 border border-slate-300 text-slate-600 text-xs font-semibold uppercase tracking-wide rounded hover:bg-slate-100 transition-colors">
              People
            </Link>
          </div>
        </div>
      </header>


      {/* ══ MAIN LAYOUT: left content + right sidebar ══ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

          {/* ── LEFT: main content ── */}
          <div className="flex-1 min-w-0">

            {/* Research Highlights */}
            <section className="mb-14">
              <SectionHeading
                action={
                  <Link to="/research" className="text-xs text-slate-400 hover:text-blue-600 hover:underline transition-colors">
                    View all →
                  </Link>
                }
              >
                Recent Research Highlights
              </SectionHeading>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {featuredResearch.map((item) => {
                  const related = resolvedRelated[item.id] || [];
                  return (
                    <article
                      key={item.id}
                      className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col hover:border-slate-300 hover:shadow-md transition-all"
                    >
                      {/* Body */}
                      <div className="p-5 flex flex-col flex-1">
                        {/* Title row with small square thumbnail */}
                        <div className="flex items-start gap-3 mb-2">
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-16 h-16 rounded-md object-cover flex-shrink-0 border border-slate-100"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-md bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0" />
                          )}
                          <h3 className="text-sm font-bold leading-snug text-slate-900 pt-0.5">{item.title}</h3>
                        </div>
                        <p className="mt-2 text-xs text-slate-500 line-clamp-4 leading-relaxed flex-1">{item.desc}</p>
                        <Link
                          to={`/research/${item.id}`}
                          className="mt-4 self-start text-[11px] font-semibold text-blue-600 hover:underline"
                        >
                          Learn more →
                        </Link>

                        {/* Related items */}
                        {related.length > 0 && (
                          <ul className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                            {related.slice(0, 2).map((rel, i) => (
                              <li key={i} className="flex items-start gap-1.5 min-w-0">
                                <Badge label={rel.label} styleKey={rel.subtype} />
                                {rel.href && rel.isExternal ? (
                                  <a
                                    href={rel.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] text-slate-500 hover:text-blue-600 hover:underline leading-tight line-clamp-2"
                                  >
                                    {rel.title}
                                  </a>
                                ) : rel.href ? (
                                  <Link
                                    to={rel.href}
                                    className="text-[10px] text-slate-500 hover:text-blue-600 hover:underline leading-tight line-clamp-2"
                                  >
                                    {rel.title}
                                  </Link>
                                ) : (
                                  <span className="text-[10px] text-slate-500 leading-tight line-clamp-2">{rel.title}</span>
                                )}
                              </li>
                            ))}
                            {related.length < 2 && (
                              <li className="block h-6 text-[10px] line-clamp-2"></li>
                            )}
                          </ul>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Quick Nav */}
            {/* <section>
              <Rule />
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-200 border border-slate-200 rounded-lg overflow-hidden bg-white mt-0">
                {[
                  { to: '/people',       label: 'People',       sub: 'Members & Alumni' },
                  { to: '/projects',     label: 'Projects',     sub: 'Funded Research' },
                  { to: '/events',       label: 'Events',       sub: 'Activities & Workshops' },
                  { to: '/publications', label: 'Publications', sub: 'Papers & Journals' },
                ].map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="px-5 py-5 group hover:bg-slate-50 transition-colors"
                  >
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {link.label}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{link.sub}</p>
                  </Link>
                ))}
              </div>
            </section> */}

          </div>

          {/* ── RIGHT: Recent Updates sidebar ── */}
          <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <div className="lg:sticky lg:top-20">

              {/* Sidebar header */}
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="text-lg font-bold tracking-tight text-slate-900">Recent Updates</h2>
                <span className="text-[10px] text-slate-400">{allUpdates.length} total</span>
              </div>

              {/* Filter tabs */}
              <div className="flex flex-wrap gap-1 mb-4">
                {UPDATE_FILTERS.map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide rounded transition-colors ${
                      activeFilter === f
                        ? 'bg-slate-900 text-white'
                        : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Feed */}
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                {/* Month-grouped updates */}
                {filteredUpdates.length === 0 ? (
                  <p className="px-4 py-8 text-xs text-slate-400 text-center">No updates found.</p>
                ) : (
                  <UpdateFeed updates={filteredUpdates} />
                )}
              </div>

              {/* Sidebar footer */}
              <p className="mt-3 text-[10px] text-slate-400 text-right">
                Showing {filteredUpdates.length} most recent
              </p>
            </div>
          </aside>

        </div>
      </div>

      {/* ══ FOOTER ══ */}
      <footer className="bg-white border-t border-slate-200 mt-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm mb-10">
            <div>
              <p className="font-semibold text-slate-900 mb-1">Spacetime Intelligence Laboratory</p>
              <p className="text-xs text-slate-400 font-light">KAIST · Civil and Environmental Engineering</p>
              <div className="mt-4 flex flex-col gap-1 text-xs text-slate-500">
                {[
                  ['/research', 'Research'], ['/publications', 'Publications'],
                  ['/people', 'People'], ['/projects', 'Projects'], ['/events', 'Events'],
                ].map(([to, label]) => (
                  <Link key={to} to={to} className="hover:text-slate-900 hover:underline font-light">{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 mb-3">Address</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                W16 #410, KAIST<br />
                291 Daehak-ro, Yuseong-gu<br />
                Daejeon, Republic of Korea
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 mb-3">Contact</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                TEL: +82-42-350-3615<br />
                yoonjin@kaist.ac.kr
              </p>
            </div>
          </div>
          <Rule />
          <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-400 font-light">
              © {new Date().getFullYear()} Spacetime Intelligence Laboratory, KAIST
            </p>
            <p className="text-xs text-slate-300 font-light">
              Department of Civil and Environmental Engineering
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   UpdateFeed — month-grouped timeline for the sidebar
   ════════════════════════════════════════════════════════ */
function UpdateFeed({ updates }) {
  /* Group by "MMM YYYY" label */
  const groups = useMemo(() => {
    const map = new Map();
    updates.forEach(u => {
      const d = new Date(u._sortDate);
      const key = Number.isNaN(d.getTime())
        ? u.date || 'Unknown'
        : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(u);
    });
    return [...map.entries()];
  }, [updates]);

  return (
    <div className="divide-y divide-slate-100 max-h-[76vh] overflow-y-auto">
      {groups.map(([month, items]) => (
        <div key={month}>
          {/* Month label */}
          <div className="sticky top-0 z-10 bg-slate-50 border-b border-slate-100 px-4 py-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{month}</span>
          </div>
          {/* Items in this month */}
          {items.map((item) => (
            <UpdateItem key={item.key} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
}

function UpdateItem({ item }) {
  const inner = (
    <div className="px-4 py-3 hover:bg-slate-50 transition-colors group">
      <div className="flex items-center gap-1.5 mb-1">
        <Badge label={item.label} styleKey={item.subtype} />
        {item.subtitle && (
          <span className="text-[9px] text-slate-400 truncate max-w-[120px]">{item.subtitle}</span>
        )}
      </div>
      <p className="text-[12px] font-medium text-slate-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
        {item.title}
      </p>
      <p className="mt-0.5 text-[10px] text-slate-400">{item.date}</p>
    </div>
  );

  if (!item.href) return inner;
  if (item.isExternal) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }
  return <Link to={item.href} className="block">{inner}</Link>;
}
