import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDataLoader } from '../hooks/useDataLoader';
import NavbarCategorized from '../utility/NavbarCategorized';
import ScrollUpBt from '../utility/ScrollUpButton';

const parseYear = (value) => {
  const numeric = Number.parseInt(value, 10);
  return Number.isNaN(numeric) ? 0 : numeric;
};

const typeLabelClass = {
  Journal: 'bg-slate-100 text-slate-700',
  International: 'bg-blue-100 text-blue-700',
  National: 'bg-emerald-100 text-emerald-700',
};

function LoadingState() {
  return (
    <div className="container pt-28 pb-16">
      <p className="text-gray-600">Loading landing page data...</p>
    </div>
  );
}

export default function LandingPage() {
  const { data: researchData, loading: researchLoading } = useDataLoader('researchData');
  const { data: publicationsData, loading: pubLoading } = useDataLoader('publicationsData');
  const { data: internationalData, loading: intlLoading } = useDataLoader('internationalData');
  const { data: nationalData, loading: natLoading } = useDataLoader('nationalData');

  const loading = researchLoading || pubLoading || intlLoading || natLoading;

  const recentPublications = useMemo(() => {
    const journal = (publicationsData || []).map((item) => ({ ...item, type: 'Journal' }));
    const international = (internationalData || []).map((item) => ({ ...item, type: 'International' }));
    const national = (nationalData || []).map((item) => ({ ...item, type: 'National' }));

    return [...journal, ...international, ...national]
      .sort((a, b) => parseYear(b.date) - parseYear(a.date))
      .slice(0, 8);
  }, [publicationsData, internationalData, nationalData]);

  const featuredResearch = (researchData || []).slice(0, 6);
  const publicationCount =
    (publicationsData?.length || 0) + (internationalData?.length || 0) + (nationalData?.length || 0);

  return (
    <div id="top" className="font-display flex flex-col justify-center items-center overflow-hidden">
      <div className="w-screen min-h-[100vh] min-w-[320px] bg-welcomeHome lg:bg-cover bg-contain bg-no-repeat">
        <div className="w-full h-16" />
        <NavbarCategorized />
        <ScrollUpBt />

        <div className="min-h-screen bg-slate-50 text-slate-900">
          {loading ? (
            <LoadingState />
          ) : (
            <>
              <header className="border-b border-slate-200 bg-white">
                <div className="container py-20">
                  <p className="text-sm tracking-[0.15em] uppercase text-slate-500">KAIST</p>
                  <h1 className="mt-3 text-4xl md:text-6xl font-semibold text-slate-900">
                    Spacetime Intelligence Laboratory
                  </h1>
                  <p className="mt-6 max-w-4xl text-lg leading-relaxed text-slate-700">
                    We conduct data-driven and AI-centered research for urban, mobility, and transportation
                    systems. Our work spans urban representation learning, traffic forecasting, autonomous
                    mobility, airspace intelligence, and public-safety analytics.
                  </p>
                </div>
              </header>

              <section className="container py-14">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-md border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">Research Areas</p>
                    <p className="mt-1 text-3xl font-semibold">{researchData?.length || 0}</p>
                  </div>
                  <div className="rounded-md border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">Publications & Proceedings</p>
                    <p className="mt-1 text-3xl font-semibold">{publicationCount}</p>
                  </div>
                  <div className="rounded-md border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">Recent Publication Year</p>
                    <p className="mt-1 text-3xl font-semibold">{recentPublications?.[0]?.date || '-'}</p>
                  </div>
                </div>
              </section>

              <section className="container pb-8">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-3xl font-semibold">Recent Research Highlights</h2>
                  <Link to="/research" className="text-sm text-blue-700 hover:underline">
                    View all research
                  </Link>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featuredResearch.map((item) => (
                    <article key={item.id} className="bg-white border border-slate-200 rounded-md p-5">
                      <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-600 line-clamp-4">{item.desc}</p>
                      <Link to={`/research/${item.id}`} className="mt-4 inline-block text-sm text-blue-700 hover:underline">
                        Read details
                      </Link>
                    </article>
                  ))}
                </div>
              </section>

              <section className="container py-14">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-3xl font-semibold">Recent Publications</h2>
                  <Link to="/publications" className="text-sm text-blue-700 hover:underline">
                    View complete list
                  </Link>
                </div>

                <div className="mt-6 space-y-3">
                  {recentPublications.map((item, idx) => (
                    <article
                      key={`${item.id}-${idx}`}
                      className="bg-white border border-slate-200 rounded-md p-4 sm:p-5"
                    >
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 font-medium ${
                            typeLabelClass[item.type] || 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {item.type}
                        </span>
                        <span className="text-slate-500">{item.date || '-'}</span>
                      </div>

                      <h3 className="mt-2 text-base sm:text-lg font-semibold leading-snug">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-700">{item.authors}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.journal || item.conference || '-'}</p>

                      {item.href && (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-block text-sm text-blue-700 hover:underline"
                        >
                          Open publication
                        </a>
                      )}
                    </article>
                  ))}
                </div>
              </section>

              <section className="container pb-20">
                <div className="rounded-md border border-slate-200 bg-white p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-semibold">Research Directions</h2>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {(researchData || []).slice(0, 12).map((item) => (
                      <span key={item.id} className="inline-flex rounded-full border border-slate-300 px-3 py-1 text-sm">
                        {item.menuTitle || item.title}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
