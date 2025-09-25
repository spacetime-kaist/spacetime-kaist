import React from "react";

import internationalData from "../../uploads/conferenceData/internationalData";
import nationalData from "../../uploads/conferenceData/nationalData";

import ScrolltoAnchor from "../../utility/ScrolltoAnchor";
import { Link } from "react-router-dom";


export default function Conference() {

  
const ConCard = ( item ) => (   
<div key={item.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-600">{item.authors}</p>
            <p className="text-gray-500 italic">{item.conference}, {item.date}</p>
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Read Paper
              </a>
            )}
</div>
)


const SectionLink = () => (
  // For floating link container
  // <div className="fixed top-60 right-50 z-50 mt-8 flex flex-col flex-wrap gap-3 bg-gray-100 p-4 rounded-lg shadow-lg opacity-40 hover:opacity-100 transition">
  <div className="mb-16 flex flex-wrap gap-3">
      <Link to="/conference#international" className="inline-flex items-center px-5 py-3 bg-black text-white rounded-md text-sm font-semibold">International Conference</Link>
      <Link to="/conference#national" className="inline-flex items-center px-5 py-3 border border-gray-300 rounded-md text-sm">National Conference Presentation</Link>
  </div>
)

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="pagetitle">Conference</h1>
    <section id="international" className="z-20 mb-16">
      <SectionLink />
      <h2 className="sectiontitle text-2xl font-bold mb-4">International Conference</h2>
      <div className="space-y-6">
        {internationalData.map((item) => (
          <ConCard key={item.id} {...item} />
        ))}
      </div>
      </section>
      
      <section id="national" className="mt-16">

       <SectionLink />
      <h2 className="sectiontitle text-2xl font-bold mb-4">National Conference Presentation</h2>
      <div className="space-y-6">
        {nationalData.map((item) => (
            <ConCard key={item.id} {...item} />
        ))}
      </div>
      </section>
    </div>
  );
}
