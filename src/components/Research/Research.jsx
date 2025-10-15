import React from 'react';
import researchData from '../../uploads/researchData'; // Import the data array from another file
import { Link } from 'react-router-dom';


const ResearchCard = ({ id,title, desc, thumbnail }) => (
  <Link key={id} to={`/research/${id}`} className="no-underline">
  <article className="p-5 h-full bg-white rounded-lg border border-gray-200 shadow shadow-sm hover:shadow-2xl transition flex flex-col">
    <img src={`${import.meta.env.VITE_PUBLIC_URL}/${thumbnail}`} alt={title} className="basis-3/4 sm:px-3 w-full object-contain rounded-md mb-4" />
    <div className='basis-1/4'>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
      <div className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">Read more →</div>
    </div>
  </article>
  </Link>
);

export default function Research() {
  return (
    <>
      <header className="pt-10">
        <div className="container">
          <h1 className="pagetitle">Research</h1>
          <div className='divider' />
          {/* <p className="mt-2 text-gray-600 max-w-2xl">explanation</p> */}
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
