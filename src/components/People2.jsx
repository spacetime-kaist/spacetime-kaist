import React from "react";
import { useDataLoader } from '../hooks/useDataLoader';
import ReactMarkdown from "react-markdown";

export default function People2() {
  const { data: peopleData, loading } = useDataLoader('peopleData');

  const copyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      alert("이메일 복사에 성공했습니다");
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto pt-32 text-center min-h-screen">
        <p className="text-slate-600">Loading people data...</p>
      </div>
    );
  }

  if (!peopleData) {
    return (
      <div className="container mx-auto pt-32 text-center min-h-screen">
        <p className="text-slate-600">No people data available.</p>
      </div>
    );
  }

  const { professorData, labMembersData = [], aluminiData = [] } = peopleData;

  const serifTitle = "font-serif"; // Using Tailwind's font-serif for Playfair Display
  const cardHover = "transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1) hover:-translate-y-2 hover:shadow-2xl";
  const dividerGradient = "h-1 bg-gradient-to-r from-blue-900 via-blue-600 to-transparent rounded-full";

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans">
      <main className="container mx-auto px-6 max-w-7xl">
        {/* Professor Hero Section */}
        <section id="professor" className="pt-24 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-700"></div>
              
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-white border-8 border-white group">
                <img 
                  src={`/img/peopleImg/1.jpg`} 
                  alt={professorData?.name} 
                  className="w-full aspect-[4/5] object-cover transition duration-700 group-hover:scale-105 p-20" 
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <p className="text-white/80 text-sm font-medium tracking-widest uppercase">Lead Researcher</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h2 className={`${serifTitle} text-5xl md:text-6xl font-bold mb-6 text-slate-900`}>{professorData?.name}</h2>
              <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed mb-8">{professorData?.greeting}</p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <button 
                  onClick={() => copyEmail(professorData?.email)} 
                  className="px-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-500 hover:text-blue-600 transition flex items-center gap-2 group"
                >
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <span>{professorData?.email}</span>
                </button>
                <a 
                  href={professorData?.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <span>Personal Website</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">Education</h4>
                  <ul className="space-y-4">
                    {professorData?.edu?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0"></span>
                        <span className="text-slate-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">Research Focus</h4>
                  <div className="text-slate-600 text-sm leading-relaxed prose prose-sm prose-slate prose-strong:text-blue-900">
                    <ReactMarkdown>{professorData?.research}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lab Members Section */}
        <section id="labmembers" className="py-20 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className={`${serifTitle} text-5xl font-bold mb-4`}>Lab Members</h2>
              <p className="text-slate-500 text-lg">Meet the brilliant minds driving our research forward.</p>
            </div>
            <div className={`${dividerGradient} w-48 hidden md:block`}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {labMembersData.map(member => (
              <div key={member.id} className={`bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 ${cardHover} flex flex-col lg:flex-row gap-8 items-start`}>
                <div className="w-full lg:w-44 shrink-0">
                  <div className="relative group">
                    <img 
                      src={`/img/peopleImg/${member.id}.jpg`} 
                      alt={member.name} 
                      className="w-full aspect-square object-cover rounded-2xl shadow-lg border-4 border-white" 
                    />
                    <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition rounded-2xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{member.name}</h3>
                      <p className="text-blue-600 font-semibold text-sm">{member.role}</p>
                    </div>
                    <button 
                      onClick={() => copyEmail(member.email)} 
                      className="text-slate-400 hover:text-blue-600 transition flex items-center gap-2 text-xs font-medium bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100"
                    >
                      <span>{member.email}</span>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Background</h4>
                      <ul className="space-y-1">
                        {member.edu?.map((e, idx) => (
                          <li key={idx} className="text-xs text-slate-500 leading-relaxed">{e}</li>
                        ))}
                      </ul>
                    </div>
                    {member.from && (
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Since</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{member.from}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Alumni Section */}
        <section id="alumni" className="py-20 border-t border-slate-200">
          <div className="text-center mb-20">
            <h2 className={`${serifTitle} text-5xl font-bold mb-6`}>Alumni</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Our former members who have moved on to prestigious roles in academia and industry.</p>
          </div>

          <div className="space-y-24">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-10 border-l-4 border-blue-600 pl-4">Ph.D. Graduates</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {aluminiData.filter(member => member.degree === 'Ph.D.').map(a => (
                  <div key={a.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition text-center">
                    <h4 className="font-bold text-slate-900 mb-1">{a.name}</h4>
                    <p className="text-xs text-slate-400">{a.date}</p>
                    <div className="mt-4 pt-4 border-t border-slate-50">
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full">{a.degree}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-10 border-l-4 border-blue-600 pl-4">M.S. Graduates</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {aluminiData.filter(member => member.degree === 'M.S.').map(a => (
                  <div key={a.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition text-center">
                    <h4 className="font-bold text-slate-900 mb-1">{a.name}</h4>
                    <p className="text-xs text-slate-400">{a.date}</p>
                    <div className="mt-4 pt-4 border-t border-slate-50">
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full">{a.degree}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

