import React from "react";
import ReactMarkdown from "react-markdown";

const gsEcUamData = {
  slug: "gs-ec-uam",
  title: "GS E&C (UAM)",
  objective: `In collaboration with GS Construction, KAIST TRUE Lab is conducting an industry-academia project to establish the UAM Vertiport Operational Concept in pursuit of developing an 'End-to-end Vertiport Solution' encompassing site selection, design, construction, and operation of urban UAM vertiports.

Through investigating and analyzing the latest operational concept trends from leading aviation countries and consulting with international experts, we identify essential technologies for vertiport design and evaluate the potential for integrating value chains. Additionally, we derive an initial vertiport operational concept, including projected throughput information for various operational scenarios.

The outcomes of this research will be utilized to formulate a long-term technology development plan for vertiport construction and to concretize the vertiport business model and feasibility analysis.`,
  deliverables: [
    "Vertiport Technology Trends Report",
    "GS Vertiport Operational Concept 1.0"
  ],
  details: {
    period: "2023.06 ~ 2023.12",
    funding: "GS E&C",
    team: "Seyun Kim, Gwanghwan Seong",
    partnerships: 
`COMET Lab (comet.kaist.ac.kr, KAIST), CENS Lab ([*cens.kaist.ac.kr*](https://cens.kaist.ac.kr/index.php), KAIST), Spacetime Intelligence Laboratory`,
  },
  contact: {
    address: "W16 #407, KAIST, 291 Daehak-ro, Yuseong-gu, Daejeon, Republic of Korea",
    tel: "+82-42-350-5655",
    email: "spacetime@kaist.ac.kr"
  },
  image: "/path/to/your/image.jpg" // replace with actual path
};

export default function GSEcUamProjectPage() {

  
  return (
<>
      <div
      className="relative h-[25vh] w-full bg-cover bg-center flex items-center justify-center text-center"
      style={{
        backgroundColor: "rgba(55,71,79,1)",
        backgroundImage:
          "url('https://lh3.googleusercontent.com/sitesv/AICyYdYrn5O2V6umQtVhB66PdIumezoEYuH-gcUoAhZuAoqRY8sjvl_2vPjuXNJCwXwcVPI3pVm411fWwnGdfvHOiXx4QNqmFfi5FIvjmVW_DU6H9sVhmB2p211-3KPWpobAoofirL5gmtfdO4yRKUly6VU4rZmzKCpvQhq_2ufByZwhMK0SzKGloavM=w16383')",
        transform: "translate3d(0,0,0)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <h1 className="text-6xl font-bold text-white drop-shadow-xl px-4">
        {gsEcUamData.title}
      </h1>
          </div>

    <main className="py-20 bg-white">
      
        <div className="max-w-5xl mx-auto px-6">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Objective</h2>
          <div className="prose prose-lg">
            <ReactMarkdown className="markdown">{gsEcUamData.objective}</ReactMarkdown>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Deliverables</h2>
          <ul className="list-disc list-inside text-gray-700">
            {gsEcUamData.deliverables.map((d, idx) => (
              <li key={idx}>{d}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Project Details</h2>
          <div className="text-gray-700 space-y-2">
            <p><strong>Period:</strong> {gsEcUamData.details.period}</p>
            <p><strong>Funding:</strong> {gsEcUamData.details.funding}</p>
            <p><strong>Team:</strong> {gsEcUamData.details.team}</p>
            <p>
              <strong>R&D Partnership:</strong>{" "}
              <ReactMarkdown className="markdown">{gsEcUamData.details.partnerships}</ReactMarkdown>
            </p>
          </div>
        </section>

        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-semibold mb-3">Contact</h2>
          <div className="text-gray-700 space-y-2">
            <p>{gsEcUamData.contact.address}</p>
            <p><strong>TEL:</strong> {gsEcUamData.contact.tel}</p>
            <p><strong>Email:</strong>{" "}
              <a
                href={`mailto:${gsEcUamData.contact.email}`}
                className="text-blue-600 hover:underline"
              >
                {gsEcUamData.contact.email}
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
</>
  );
}
