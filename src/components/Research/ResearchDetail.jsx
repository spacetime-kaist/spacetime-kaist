import React from "react";
import { useParams, Link } from "react-router-dom";
import researchData from "../../uploads/researchData";
import ResearchDetailCard  from "../ui/ResearchDetailCard";

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
          <h1 className="text-5xl font-bold mb-4">{data.title}</h1>
          {(data.detail)?
          <p className="text-gray-600 text-md">{data.detail}</p>
          :
          <p className="text-gray-600 text-md">{data.desc}</p>}
        </header>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Research</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {data.research && data.research.map((detail, i) => (
              <ResearchDetailCard key={i} {...detail} />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
