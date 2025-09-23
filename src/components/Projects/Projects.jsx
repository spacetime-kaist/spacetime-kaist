import React from 'react';
import projectsData from '../../uploads/projectsData';
import { Link } from 'react-router-dom';

const ProjectCard = (p) => 
(
  <article className="p-5 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-xl transition">
    {p.image &&<img src={`${import.meta.env.VITE_PUBLIC_URL}${p.image}`} alt={p.title} className="w-full h-full object-cover rounded-md mb-4" />}
    <h3 className="font-semibold text-3xl">{p.title}</h3>
    <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
    <p className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">See more →</p>
  </article>
);

export default function Projects() {
  return (
    <>
      <header className="py-10 bg-white shadow-sm">
        <div className="container">
          <h1 className="pagetitle">Projects</h1>
          <p className="mt-2 text-gray-600 max-w-2xl">Explore our ongoing and completed projects that span urban systems, robotics, energy, and extraterrestrial habitats.</p>
        </div>
      </header>

      <main className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((p) =>
                p.type === "internal" ? (
                  <Link key={p.id} to={p.link}>
                    <ProjectCard {...p} />
                  </Link>
                ) : (
                  <a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer">
                    <ProjectCard {...p} />
                  </a>
                )
              )}
          </div>
        </div>
      </main>
    </>
  );
}
