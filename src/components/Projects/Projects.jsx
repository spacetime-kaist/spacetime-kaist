import React from 'react';
import projectsData from '../../uploads/projectsData';
import { Link } from 'react-router-dom';

const ProjectCard = (p) => 
(
  <article className={`flex flex-col justify-between p-5 h-full bg-white rounded-lg border border-gray-200 shadow-sm ${p.type && 'hover:shadow-xl'} transition`}>
    <div>{p.image &&<img src={`${p.image}`} alt={p.title} className="w-5xl object-cover rounded-md mb-4" />}</div>
    <div >
      <h3 className="font-semibold text-3xl">{p.title}</h3>
      <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
      <p className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">{p.type && 'See more →'}</p>
    </div>
  </article>
);

const OtherProjectCard = (p) => 
(
  <article className={`flex flex-col justify-between p-5 h-full w-5xl bg-white rounded-lg border border-gray-200 shadow-sm ${p.type && 'hover:shadow-xl'} transition`}>
    <div >
      <h3 className="font-semibold text-2xl">{p.title}</h3>
      <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
      {p.link && <p className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">{p.type && 'See more →'}</p>}
    </div>
  </article>
);

export default function Projects() {
  return (
    <>
      <header className="pt-10">
        <div className="container">
          <h1 className="pagetitle">Projects</h1>
          <div className='divider' />
          {/* <p className="mt-2 text-gray-600 max-w-2xl">explanation</p> */}
        </div>
      </header>

      <main className="py-16">
        <section className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.filter(p => p.link && !p.pagetitle).map((p) =>
                p.type === "internal" ? (
                  <Link key={p.id} to={`/projects${p.link}`}>
                    <ProjectCard {...p} />
                  </Link>
                ) : (
                  <a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer">
                    <ProjectCard {...p} />
                  </a>
                )
              )}
          </div>
        </section>
        <section className="container mt-30">
          <h2 className='sectiontitle m-5 pb-2'>Other Projects</h2>
          <div className="mt-10 flex flex-col gap-6">
            {projectsData.filter(p =>p.link && p.pagetitle).map((p) =>
                  <Link key={p.id} to={`/projects${p.link}`}>
                    <OtherProjectCard {...p} />
                  </Link>
              )}
              {projectsData.filter(p =>!p.link).map((p) =>
                  <div key={p.id} to={`/projects${p.link}`}>
                    <OtherProjectCard {...p} />
                  </div>
              )}
          </div>
        </section>
      </main>
    </>
  );
}
