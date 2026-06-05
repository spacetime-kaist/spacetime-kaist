import React from "react";
import { useParams, Link } from "react-router-dom";
import { useDataLoader } from "../../hooks/useDataLoader";
import ResearchDetailCard  from "../ui/ResearchDetailCard";

export default function ResearchDetail() {
  const { slug } = useParams();
  const { data: researchData, loading } = useDataLoader('researchData');
  const data = researchData?.find(item => item.id === slug);

  if (loading) {
    return (
      <div className="container">
        <div className="pt-32 text-center">
          <p className="text-gray-600">Loading research data...</p>
        </div>
      </div>
    );
  }

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
  return (
    <main className="pt-20 pb-24 bg-slate-50 min-h-screen">
      <div className="container">
        <Link
          to="/research"
          className="text-sm text-blue-700 hover:underline mb-6 inline-block"
        >
          ← Back to Research Overview
        </Link>
        <header className="mb-10 border-b border-slate-200 pb-8">
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">{data.title}</h1>
          {(data.detail)?
          <p className="text-slate-600 max-w-3xl leading-relaxed">{data.detail}</p>
          :
          <p className="text-slate-600 max-w-3xl leading-relaxed">{data.desc}</p>}
        </header>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400 mb-5">Research</h2>
          <div>
            {data.research && data.research.map((detail, i) => (
              <ResearchDetailCard key={i} {...detail} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
