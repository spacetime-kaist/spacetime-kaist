import React from "react";
import { useParams, Link } from "react-router-dom";
import ResearchDetailCard from "../ui/ResearchDetailCard";

// Data
import researchData from "../../uploads/researchData";
import projectsData from "../../uploads/projectsData";

// Images Gallery
import AutoSpanGallery from "../ui/AutoSpanGallery";

export default function ProjectsDetail() {
  const { slug } = useParams();
  const project = projectsData.find(item => item.link.replace('/','') === slug)
  const researchSection = researchData.find(item => item.id === project.researchSectionID)
  const detail = researchSection.research.find(item => item.projectsSlug === slug);

  if (!detail) {
    return (
      <div className="container">
        <div className="pt-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <div>"to check projects id:"`{slug}`</div>
          <div>"to check research section id:"`{project.researchSectionID}`</div>
          <Link to="/projects" className="text-blue-600 hover:underline">
            ← Back to Research Areas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-20 pb-24 bg-white">
      <div className="container">
        <Link
          to="/projects"
          className="text-blue-600 hover:underline mb-6 inline-block"
        >
          ← Back to Projects Overview
        </Link>
        <header className="m-20 md:mb-30 flex flex-col justify-center items-center">
          <h1 className="text-6xl md:text-7xl font-light text-center">{project.pagetitle}</h1>
        </header>
        <section>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <ResearchDetailCard {...detail}/>
          </ul>
        </section>
      </div>
    </main>
  );
}
