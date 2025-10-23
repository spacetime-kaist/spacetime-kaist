import React from "react";
import publicationsData from "../../uploads/publicationsData";

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


export default function Publications() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="pagetitle">Journal Publications</h1>
      <div className='divider' />
      <div className="space-y-6">
        {publicationsData.map((item) => (
          <PubCard key={item.id} {...item} />
          // <div key={pub.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
          //   <h2 className="text-xl font-semibold">{pub.title}</h2>
          //   <p className="text-gray-500 italic">{pub.journal}</p>
          //   <p className="text-gray-600 text-lg ">{pub.authors} ({pub.date})</p>
          //   {pub.href && (
          //     <a
          //       href={pub.href}
          //       target="_blank"
          //       rel="noopener noreferrer"
          //       className="text-blue-600 hover:underline mt-2 inline-block"
          //     >
          //       Read Paper
          //     </a>
          //   )}
          // </div>
        ))}
      </div>
    </div>
  );
}
