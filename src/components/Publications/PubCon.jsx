import React from "react";
import { useDataLoader } from "../../hooks/useDataLoader";
import ScrolltoAnchor from "../../utility/ScrolltoAnchor";
import { Link } from "react-router-dom";




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


const PubCard = ( item ) => (   
<div key={item.id} className="bg-white px-4 py-2 rounded-sm border-l-4 border-slate-600 hover:shadow-md transition">
            {item.href ?
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col hover:underline "
              >
                <h2 className="text-lg sm:text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-500 italic inline-block">{item.journal}</p>
                <p className="text-gray-600 text-lg inline-block">{item.authors} ({item.date})</p>
                <p className="text-blue-600 hover:underline mt-2 ">Read Paper</p>           
              </a>
            :
            <>
            <h2 className="text-lg sm:text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-500 italic">{item.journal}</p>
            <p className="text-gray-600 text-lg ">{item.authors} ({item.date})</p>
            </>
            }

</div>
)
const ConCard = ( item ) => (   
<div key={item.id} className="bg-white px-4 py-2 rounded-sm border-l-4 border-slate-600 hover:shadow-md transition">
            {item.href ?
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-md sm:text-xl font-semibold hover:underline inline-block"
              >
                <h2 className="text-lg sm:text-xl font-semibold">{item.title}</h2>
              </a>
            :
            <h2 className="text-lg sm:text-xl font-semibold">{item.title}</h2>
            }
            <p className="text-gray-600">{item.authors}</p>
            <p className="text-blue-500 italic">{item.conference}{item.date && `, ${item.date}`}</p>
            {/* {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Read Paper
              </a>
            )} */}
</div>
)

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
      <h2 className="sectiontitle text-2xl font-bold mb-4">Journal Publications</h2>
      
      <div className="space-y-6">
        {(publicationsData || []).map((item) => (
          <PubCard key={item.id} {...item} />
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
            <ConCard key={item.id} {...item} />
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
            <ConCard key={item.id} {...item} />
        ))}
      </div>
      </section>
    </div>
  );
}
