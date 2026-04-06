import React, { useState } from "react";
import { useDataLoader } from "../../hooks/useDataLoader";
import { Link } from "react-router-dom";

function blogPath(slug) {
  return `/publications/${slug}`;
}

function PubConCard({ slug, title, href, journal, conference, authors, date, podcast }) {
  const [isPodcastOpen, setIsPodcastOpen] = useState(false);

  const venueLine =
    journal != null && String(journal).trim()
      ? date
        ? `${journal}, ${date}`
        : journal
      : conference != null && String(conference).trim()
        ? date
          ? `${conference}, ${date}`
          : conference
        : date || null;

  return (
    <div className="bg-white px-4 py-2 rounded-sm border-l-4 border-slate-600 hover:shadow-md transition">
      <div className="flex flex-col">
        <h2 className="text-lg sm:text-xl font-semibold">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-inherit no-underline hover:underline"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h2>
        {venueLine && <p className="text-gray-500 italic">{venueLine}</p>}
        <p className="text-gray-600">{authors}</p>

        <div className="flex flex-row gap-3 items-center mt-2">
          {slug ? (
            <Link to={blogPath(slug)} className="text-blue-600 no-underline hover:underline">
              Blog
            </Link>
          ) : null}
          {podcast && (
            <button
              type="button"
              onClick={() => setIsPodcastOpen((prev) => !prev)}
              className="text-blue-600 hover:underline"
            >
              {isPodcastOpen ? "Hide Podcast" : "Podcast"}
            </button>
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
  
  const loading = pubLoading || intLoading || natLoading;

  if (loading) {
    return (
      <div className="container pt-32 text-center">
        <p className="text-gray-600">Loading publications data...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="pagetitle">Publications and Proceedings</h1>
    <section id="journal" className="z-20 mb-16 mt-5">
    {/* Section Links */}
    <div className="mb-16 mt-24 flex flex-wrap gap-3">
      <Link to="/publications#journal" className="inline-flex items-center px-5 py-3 bg-black text-white rounded-md text-sm font-semibold">Journal Publications</Link>
      <Link to="/publications#international" className="inline-flex items-center px-5 py-3 border border-gray-300 rounded-md text-sm">International Conference</Link>
      <Link to="/publications#national" className="inline-flex items-center px-5 py-3 border border-gray-300 rounded-md text-sm">National Conference Presentation</Link>
    </div>
      <h2 className="sectiontitle text-2xl mb-4">Journal Publications</h2>
      
      <div className="space-y-6">
        {(publicationsData || []).map((item) => (
          <PubConCard key={item.id} {...item} />
        ))}
      </div>
      </section>

      <section id="international" className="mt-16">
      {/* Section Links */}
      <div className="mb-16 flex flex-wrap gap-3">
        <Link to="/publications#journal" className="inline-flex items-center px-5 py-3 border border-gray-300 rounded-md text-sm">Journal Publications</Link>
        <Link to="/publications#international" className="inline-flex items-center px-5 py-3 bg-black text-white rounded-md text-sm font-semibold">International Conference</Link>
        <Link to="/publications#national" className="inline-flex items-center px-5 py-3 border border-gray-300 rounded-md text-sm">National Conference Presentation</Link>
      </div>
      <h2 className="sectiontitle text-2xl font-bold mb-4">International Conference</h2>
      <div className="space-y-6">
        {(internationalData || []).map((item) => (
          <PubConCard key={item.id} {...item} />
        ))}
      </div>
      </section>
      
      <section id="national" className="mt-16">
      {/* Section Links */}
      <h2 className="sectiontitle text-2xl font-bold mb-4">National Conference Presentation</h2>
      <div className="mb-16 flex flex-wrap gap-3">
        <Link to="/publications#journal" className="inline-flex items-center px-5 py-3 border border-gray-300 rounded-md text-sm">Journal Publications</Link>
        <Link to="/publications#international" className="inline-flex items-center px-5 py-3 border border-gray-300 rounded-md text-sm">International Conference</Link>
        <Link to="/publications#national" className="inline-flex items-center px-5 py-3 bg-black text-white rounded-md text-sm font-semibold">National Conference Presentation</Link>
      </div>
      <div className="space-y-6">
        {(nationalData || []).map((item) => (
          <PubConCard key={item.id} {...item} />
        ))}
      </div>
      </section>
    </div>
  );
}
