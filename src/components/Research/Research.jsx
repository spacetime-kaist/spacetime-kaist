import React from 'react';
import researchData from '../../uploads/researchData'; // Import the data array from another file
import { Link } from 'react-router-dom';


const ResearchCard = ({ id,title, desc, link, thumbnail }) => (
  <Link key={id} to={link} className="no-underline">
  <article className="p-5 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
    <img src={`${import.meta.env.VITE_PUBLIC_URL}/${thumbnail}`} alt={title} className="w-full h-92 object-cover rounded-md mb-4" />
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="mt-2 text-sm text-gray-600">{desc}</p>
    <div className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">Read more →</div>
  </article>
  </Link>
);

export default function Research() {
  return (
    <>
      <header className="py-10 bg-white shadow-sm">
        <div className="container">
          <h1 className="text-3xl font-bold">Research</h1>
          <p className="mt-2 text-gray-600 max-w-2xl">Explore our ongoing and completed projects that span urban systems, robotics, energy, and extraterrestrial habitats.</p>
        </div>
      </header>

      <main className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchData.map((item) => (
              <ResearchCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
