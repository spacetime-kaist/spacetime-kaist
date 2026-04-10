import React from 'react';
import { Link } from 'react-router-dom';
import { useDataLoader } from '../../hooks/useDataLoader';

function parseEndDate(period) {
  if (!period) return null;
  const trimmed = period.replace(/\s/g, '');
  if (trimmed.endsWith('~')) return 'ONGOING';
  const parts = trimmed.split('~');
  if (parts.length < 2 || !parts[1]) return null;
  const dateParts = parts[1].split('.');
  const year = parseInt(dateParts[0]);
  if (isNaN(year)) return null;
  const month = dateParts[1] ? parseInt(dateParts[1]) - 1 : 11;
  const day = dateParts[2] ? parseInt(dateParts[2]) : 28;
  return new Date(year, month, day);
}

function isActive(project) {
  const endDate = parseEndDate(project.period);
  if (endDate === 'ONGOING') return true;
  if (!endDate) return false;
  return endDate >= new Date();
}

/** Compact KRW for cards; full figure in title. Uses B / M (short scale). */
// function budgetDisplayParts(raw) {
//   if (!raw || typeof raw !== 'string') return null;
//   const trimmed = raw.trim();
//   const digitsOnly = trimmed.replace(/,/g, '').match(/^(\d+)\s*KRW$/i);
//   if (!digitsOnly) return { display: trimmed, title: undefined };
//   const n = parseInt(digitsOnly[1], 10);
//   if (Number.isNaN(n)) return { display: trimmed, title: undefined };

//   const abbrev = (value, suffix) => {
//     const v = value;
//     const rounded = Math.round(v);
//     const isWhole = Math.abs(v - rounded) < 1e-6;
//     const num = isWhole ? String(rounded) : v.toFixed(2).replace(/\.?0+$/, '');
//     return `${num}${suffix}`;
//   };

//   if (n >= 1_000_000_000) return { display: `${abbrev(n / 1e9, 'B KRW')}`, title: trimmed };
//   if (n >= 1_000_000) return { display: `${abbrev(n / 1e6, 'M KRW')}`, title: trimmed };
//   const formatted = new Intl.NumberFormat('en-US').format(n);
//   return { display: `${formatted} KRW`, title: undefined };
// }

const MetaField = ({ label, value }) =>
  value ? (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">{label}</span>
      <span className="text-xs text-slate-600 leading-snug">{value}</span>
    </div>
  ) : null;

// const BudgetField = ({ value }) => {
//   const parts = budgetDisplayParts(value);
//   if (!parts) return null;
//   return (
//     <div className="flex flex-col gap-0.5">
//       <span className="text-[10px] uppercase tracking-widest text-slate-300 font-medium">Budget</span>
//       <span
//         className="text-[11px] text-slate-500 font-normal tabular-nums leading-relaxed tracking-tight"
//         title={parts.title}
//       >
//         {parts.display}
//       </span>
//     </div>
//   );
// };

function ProjectCardWrapper({ project, children }) {
  if (!project.link) return <div>{children}</div>;
  if (project.type === 'internal')
    return <Link to={`/projects${project.link}`}>{children}</Link>;
  return (
    <a href={project.link} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const ActiveProjectCard = ({ project }) => (
  <ProjectCardWrapper project={project}>
    <article className={`group flex h-full bg-white border border-slate-200 rounded-sm overflow-hidden transition-all duration-200 ${project.link ? 'hover:border-slate-400 hover:shadow-md cursor-pointer' : ''}`}>
      <div className="w-1 shrink-0 bg-slate-800 group-hover:bg-slate-600 transition-colors" />
      <div className="flex flex-col justify-between p-5 gap-4 flex-1">
        <div>   
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium mb-1.5">{project.label}</p>
            <h3 className="text-sm font-semibold text-slate-900 leading-snug">{project.title}</h3>
            {project.desc && (
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">{project.desc}</p>
            )}
          </div>
        <div>
        {project.image && (
            <img src={project.image} alt={project.title} className="mb-3 border border-slate-300 w-20 object-cover rounded-sm" />
          )}
        <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-100">
          <MetaField label="Period" value={project.period} />
          <MetaField label="Funding" value={project.funding} />
          {/* <BudgetField value={project.budget} /> */}
        </div>
        {project.link && (
          <span className="text-[11px] font-medium text-slate-500 group-hover:text-slate-800 transition-colors">
            View project →
          </span>
        )}
      </div>
      </div>
    </article>
  </ProjectCardWrapper>
);

const PastProjectRow = ({ project }) => {
  // const budgetParts = project.budget ? budgetDisplayParts(project.budget) : null;
  return (
    <ProjectCardWrapper project={project}>
      <article className={`group flex items-start gap-5 py-4 px-5 border-b border-slate-100 transition-colors duration-150 ${project.link ? 'hover:bg-slate-50 cursor-pointer hover:underline' : ''}`}>
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="shrink-0 w-14 h-14 object-contain bg-white ring-1 ring-slate-200"
        />
      )}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium mb-0.5">{project.label}</p>
          <h3 className="text-sm font-medium text-slate-500 leading-snug">{project.title}</h3>
          {project.desc && (
            <p className="mt-1 text-xs text-slate-400 leading-relaxed line-clamp-2">{project.desc}</p>
          )}
          
        </div>
        <div className="shrink-0 flex flex-col items-end gap-1 text-xs text-slate-400 text-right">
          {project.period && <span>{project.period}</span>}
          {/* {project.funding && (
            <span
              className="text-[11px] text-slate-400 tabular-nums max-w-[9rem] leading-snug"
              title={project.funding_short || project.funding}
            >
              {project.funding_short || project.funding}
            </span>
          )} */}
          {/* {budgetParts && (
            <span
              className="text-[11px] text-slate-400 tabular-nums max-w-[9rem] leading-snug"
              title={budgetParts.title}
            >
              {budgetParts.display}
            </span>
          )} */}
          {project.link && (
            <span className="text-[11px] text-slate-300 group-hover:text-slate-500 transition-colors mt-1">→</span>
          )}
        </div>
      </article>
    </ProjectCardWrapper>
  );
};

export default function Projects() {
  const { data: projectsData, loading } = useDataLoader('projectsData');

  if (loading) {
    return (
      <div className="container pt-32 text-center">
        <p className="text-slate-400 text-sm tracking-wide">Loading...</p>
      </div>
    );
  }

  if (!projectsData || projectsData.length === 0) {
    return (
      <div className="container pt-32 text-center">
        <p className="text-slate-400 text-sm">No projects available.</p>
      </div>
    );
  }

  const activeProjects = projectsData.filter(isActive);
  const pastProjects = projectsData.filter((p) => !isActive(p));

  return (
    <>
      <header className="pt-10">
        <div className="container">
          <h1 className="pagetitle">Projects</h1>
          <div className="divider" />
        </div>
      </header>

      <main className="py-12 mb-24">
        <section className="container">
          <div className="flex items-baseline gap-4 mb-8">
            <h2 className="text-base font-semibold text-slate-900 uppercase tracking-widest">
              Active Projects
            </h2>
            {/* <span className="text-xs text-slate-400">{activeProjects.length}</span> */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeProjects.map((p) => (
              <ActiveProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>

        {pastProjects.length > 0 && (
          <section className="container mt-20">
            <div className="flex items-baseline gap-4 mb-6">
              <h2 className="text-base font-semibold text-slate-500 uppercase tracking-widest">
                Past Projects
              </h2>
              {/* <span className="text-xs text-slate-400">{pastProjects.length}</span> */}
            </div>
            <div className="border-t border-slate-100">
              {pastProjects.map((p) => (
                <PastProjectRow key={p.id} project={p} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
