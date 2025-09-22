import React from 'react';
// Import components
import SeeMoreButton from '../../ui/Buttons/SeeMoreButton';
import FigureCard from '../../ui/Cards/FigureCard';
import events from '../../uploads/Events/EventsData';

// image and txt
const mainImage = 'https://lh3.googleusercontent.com/sitesv/AICyYdYrsimxBVTyMJj15M-JjVvc0yv-4a1pRWLTYGaWBQRoGXF6-PMA5HgqGDDN_w32V-ysRDWdVCuWgZmbT0lp4M1DbxWMcm6F01Un1kRrMwdbTN94hNc8C_j_50bZlMtjwiregDAS2Hru_TBlKJONXe60qivJFqNqCqVp_tNHr5T0_wFH2ECzo4bJ0Yg=w16383'
const EventsCard = (event) => (
  <figure className="rounded-xl overflow-hidden shadow hover:shadow-lg">
    <div className="h-40 bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {event.photos.map((photo, idx) => (
          <img
            key={idx}
            src={photo}
            alt={`${event.title} photo ${idx + 1}`}
            className="w-full h-48 object-cover rounded-md"
          />
        ))}
      </div>
    </div>
    <figcaption className="p-4 bg-white">
      <div className="text-lg font-semibold">{event.title}</div>
      <div className="text-sm text-gray-500 mt-1">{event.date}</div>
      <div className="text-sm text-blue-500 mt-1">{event.keywords}</div>
    </figcaption>
  </figure>
);

export default function HomePage() {
  return (
    <>
        <section className="pt-20 pb-16">
          <div className = "container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Spacetime Intelligence Lab</h1>
                <h2 className="mt-4 text-2xl text-gray-700">Department of Civil and Environment Engineering, KAIST</h2>
                <p className="mt-6 text-lg text-gray-600">The research focus at Spacetime Intelligence Lab is spacetime Artificial Intelligence, and its implication in the urban context. The research scope ranges from traffic forecasting GNN models to autonomous driver workload assessment to urban air mobility feasibility study.</p>
                {/* <p className="mt-6 text-lg text-gray-600">Learn more about our research <a href="#" className='px-2 underline'>here</a>.</p> */}

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#work" className="inline-flex items-center px-5 py-3 bg-black text-white rounded-md text-sm font-semibold">Explore work</a>
                  <a href="#contact" className="inline-flex items-center px-5 py-3 border border-gray-300 rounded-md text-sm">Contact us</a>
                </div>

                {/* <div className="mt-8 grid grid-cols-2 gap-4 text-xs text-gray-500">
                  <div>
                    <div className="font-semibold text-gray-900">Latency</div>
                    <div>Sub-second interactive updates</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Scalability</div>
                    <div>Cloud-native simulations</div>
                  </div>
                </div> */}
              </div>

              <div>
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-lg flex items-center justify-center">
                  <div className="text-center text-gray-400"><img src={mainImage} alt="Main visual" className="w-full h-full object-cover rounded-2xl" /></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Section*/}
        <section id="features" className="py-16 bg-white">
          <div className = "container">
            <h2 className="text-2xl font-bold">Research</h2>
            <p className="mt-2 text-gray-600 max-w-2xl">A concise enumeration of core subsystems and deliverables.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {title: 'Urban Region Representation Learning', desc: 'Heterogeneity of diverse urban datasets by HUGAT.'},
                {title: 'Urban Air Mobility', desc: 'UAM demand forecasting using existing helipads.'},
                {title: 'Maritime Transportation', desc: 'A novel deep learning-based vessel trajectory prediction framework for AIS data using AIS-ACNet.'},
                {title: 'Traffic Forecasting', desc: 'A key technical enabler of the adaptive traffic management..'}
              ].map((f) => (
                <article key={f.title} className="p-5 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-lg">
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
                </article>
              ))}
            </div>
            {/* <a href="#work" className="inline-flex items-center mx-2 mt-5 px-8 py-2 bg-gray-800 text-white rounded-md text-sm font-semibold">See More <span><IoChevronForwardOutline /></span></a>
             */}
            <SeeMoreButton linkto="/research" />
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="py-16">
          <div className="container">
            <h2 className="text-2xl font-bold">Events</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {events[0] && <EventsCard {...events[0]} />}
              {events[1] && <EventsCard {...events[1]} />}
              {events[2] && <EventsCard {...events[2]} />}
            </div>
            <SeeMoreButton linkto="/research" />
          </div>
        </section>
          

        <section id="contact" className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container">
            <div className="rounded-lg p-8 border border-gray-100 bg-white shadow-sm">
              <h3 className="text-lg font-semibold">Get in touch</h3>
              <p className="mt-2 text-sm text-gray-600">For collaborations and inquiries send an email or use the form below.</p>

              <form className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                <input className="md:col-span-2 p-3 border rounded-md" placeholder="Your email" />
                <input className="p-3 border rounded-md" placeholder="Subject" />
                <textarea className="md:col-span-3 p-3 border rounded-md" rows={4} placeholder="Message" />
                <div className="md:col-span-3 text-right">
                  <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white">Send</button>
                </div>
              </form>
            </div>
          </div>
        </section>
    </>
  );
}
