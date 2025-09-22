import React from "react";
import publicationsData from "../../uploads/publicationsData";

const ConCard = ( item ) => (   
<div key={item.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-600">{item.authors}</p>
            <p className="text-gray-500 italic">{item.journal}</p>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Read Paper
              </a>
            )}
</div>
)

export default function Conference() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="pagetitle">Conference</h1>
    <div className="mt-8 flex flex-wrap gap-3">
        <a href="#international" className="inline-flex items-center px-5 py-3 bg-black text-white rounded-md text-sm font-semibold">International Conference</a>
        <a href="#national" className="inline-flex items-center px-5 py-3 border border-gray-300 rounded-md text-sm">National Conference Presentation</a>
    </div>
    <section id="international" className="mt-16">
      <div className="space-y-6">
        {publicationsData.map((item) => (
          <ConCard key={item.id} {...item} />
        ))}
      </div>
      </section>
      <section id="national" className="mt-16">
      <div className="space-y-6">
        {publicationsData.map((item) => (
            <ConCard key={item.id} {...item} />
        ))}
      </div>
      </section>
    </div>
  );
}
