import React from "react";
import publicationsData from "../../uploads/publicationsData";

export default function Publications() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Publications</h1>

      <div className="space-y-6">
        {publicationsData.map((pub) => (
          <div key={pub.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold">{pub.title}</h2>
            <p className="text-gray-600">{pub.authors}</p>
            <p className="text-gray-500 italic">{pub.journal}</p>
            {pub.link && (
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Read Paper
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
