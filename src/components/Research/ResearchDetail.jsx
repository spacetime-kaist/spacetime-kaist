import React from "react";
import { useParams, Link } from "react-router-dom";
import researchData from "../../uploads/researchData";
import ReactMarkdown from "react-markdown";

export default function ResearchDetail() {
  const { slug } = useParams();
  const data = researchData.find(item => item.id === slug);

  if (!data) {
    return (
      <div className="container">
        <div className="pt-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Research Not Found</h1>
          <div>"to check id:"`{slug}`</div>
          <Link to="/research" className="text-blue-600 hover:underline">
            ← Back to Research Areas
          </Link>
        </div>
      </div>
    );
  }

  const MasonryCard = ( detail ) => (
    <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
      <h2 className="text-2xl font-bold text-sky-900">{detail.title}</h2>
      <p className="text-sm text-gray-500">{detail.date}</p>
      <div className="prose prose-gray overflow-auto max-w-none mt-6 mb-4 text-gray-700 text-lg p">
        <ReactMarkdown className="markdown">{detail.desc}</ReactMarkdown>
      </div>
      {detail.hyperlink && <div><a href={detail.hyperlink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">[LINK]</a></div>}
      {/* {detail.ref && 
        <div>
        <h4 className=""> SELECTED REFERENCE </h4>
        {detail.ref.map((ref, idx) => (<div key={`ref-${idx}`} className="text-sm text-gray-500 mb-2">{ref}</div>))}
        </div>} */}
  
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {detail.youtube && detail.youtube.map((video, idx) => (
          <iframe
            key={idx}
            src={`${video}&origin=http://spacetime.kaist.ac.kr/`}
            alt={`${detail.title} youtube ${idx + 1}`}
            className="w-full aspect-video rounded-md object-cover"
          />
        ))}
        {detail.images && detail.images.map((img, idx) => (
          <img
            key={idx}
            src={`${import.meta.env.VITE_PUBLIC_URL}${img}`}
            alt={`${detail.title} photo ${idx + 1}`}
            className="mb-2 w-full rounded-md object-cover"
          />
        ))}
      </div>

      {detail.footnote && 
        <div className="prose prose-gray overflow-auto max-w-none mt-6 mb-4 text-gray-700 text-md p">
        <ReactMarkdown className="markdown">{detail.footnote}</ReactMarkdown>
        </div>}
    </article>
  );

  return (
    <main className="pt-20 pb-24 bg-white">
      <div className="container">
        <Link
          to="/research"
          className="text-blue-600 hover:underline mb-6 inline-block"
        >
          ← Back to Research Overview
        </Link>
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
          {(data.detail)?
          <p className="text-gray-600">{data.detail}</p>
          :
          <p className="text-gray-600">{data.desc}</p>}
        </header>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Research</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {data.research && data.research.map((detail, i) => (
              <MasonryCard key={i} {...detail} />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
