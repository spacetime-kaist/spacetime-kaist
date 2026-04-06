import React from 'react';
import { useDataLoader } from '../hooks/useDataLoader';
import ReactMarkdown from 'react-markdown';

function PressCard({ article }) {
  const href = article.link_en || article.link_kr;

  return (
    <div className="container mb-16">
      <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Featured image */}
        <div className="col-span-3">
          <a href={href} target="_blank" rel="noopener noreferrer">
            <div
              className="relative w-full pb-[56.25%] rounded-md shadow-lg overflow-hidden"
              style={{
                backgroundImage: `url('${article.image}')`,
                backgroundColor: "rgba(153, 181, 197, 1)",
                transform: "translate3d(0,0,0)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "multiply",
              }}
            >
              <h3 className="absolute bottom-16 text-2xl sm:text-4xl text-white font-bold drop-shadow-xl px-4">
                {article.title}
              </h3>
              <div className="w-full absolute bottom-4 left-4 text-sm sm:text-lg font-bold flex flex-row justify-start items-center">
                <p className="px-5">{article.writer}</p>
                <p className="text-slate-300 px-5">{article.date}</p>
              </div>
            </div>
          </a>
        </div>

        {/* Article description */}
        <div className="col-span-2">
          <ReactMarkdown className="m-6 text-md lg:text-xl text-black border-l-4 border-black p-6">
            {article.desc}
          </ReactMarkdown>
          <div className="m-6 flex flex-wrap gap-3">
            {article.link_kr && (
              <a
                href={article.link_kr}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex hover:bg-slate-400 items-center px-5 py-3 border border-gray-300 rounded-md text-sm"
              >
                KR
              </a>
            )}
            {article.link_en && (
              <a
                href={article.link_en}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex hover:bg-slate-400 items-center px-5 py-3 border border-gray-300 rounded-md text-sm"
              >
                EN
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Press() {
  const { data: pressData, loading } = useDataLoader('pressData');

  if (loading) {
    return (
      <div className="container pt-32 text-center">
        <p className="text-gray-600">Loading press data...</p>
      </div>
    );
  }

  if (!pressData || pressData.length === 0) {
    return (
      <div className="container pt-32 text-center">
        <p className="text-gray-600">No press data available.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="pagetitle">STIL in the PRESS</h1>

      <main className="mx-auto py-8">
        {/* Featured articles */}
        <section id="headline" className="mb-16">
          {pressData.map(article => (
            <PressCard key={article.id} article={article} />
          ))}
        </section>

        {/* Coverage list */}
        <section id="other_press" className="mt-8 border-t-2 border-black pt-8">
          <h2 className="sectiontitle">IN THE NEWS</h2>
          <div className="space-y-4">
            {pressData.map(article => (
              <div key={article.id} className="text-blue-900/80">
                <strong>({article.date}) {article.title}</strong>
                {article.link_en && (
                  <> — <a href={article.link_en} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">KAIST News (EN)</a></>
                )}
                {article.link_kr && (
                  <> / <a href={article.link_kr} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">KR</a></>
                )}
                {article.link_others && article.link_others.length > 0 && (
                  <>
                    {(article.link_en || article.link_kr) && <span> — </span>}
                    {article.link_others.map((link, index) => (
                      <React.Fragment key={link.id}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline"
                        >
                          {link.source}
                        </a>
                        {index < article.link_others.length - 1 && <span>, </span>}
                      </React.Fragment>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
