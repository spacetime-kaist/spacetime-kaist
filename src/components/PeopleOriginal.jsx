import React, { useState } from "react";
import { useDataLoader } from '../hooks/useDataLoader';
// CSS
const sectionTitle = "text-2xl font-bold mt-8 ";
const partTitle = "text-2xl font-bold mt-8 mb-4 border-b-2 border-blue-200 pb-2";
import ReactMarkdown from "react-markdown";
import { MdEmail, MdPersonOutline } from "react-icons/md";
import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { slugifyMemberName } from "../utility/peopleLinks";

const copyEmail = async (email) => {
        await navigator.clipboard.writeText(email);
        alert("이메일 복사에 성공했습니다");
};

function MemberLinks({ member }) {
  const [copied, setCopied] = useState(false);
  const hasLinks = member.email || member.link || member.linkedin || member.github || member.scholar || member.orcid;
  if (!hasLinks) return null;

  const copyEmail = async () => {
    await navigator.clipboard.writeText(member.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-1 pl-2">
      {member.email && (
        <IconBtn
          onClick={copyEmail}
          title={copied ? "Copied!" : `Copy: ${member.email}`}
          hoverBg="hover:bg-blue-50"
          hoverText={copied ? "" : "hover:text-blue-600"}
        >
          {copied ? <MdCheck className="text-green-500" /> : <MdEmail />}
        </IconBtn>
      )}
      {member.link     && <SocialIcon type="website"  href={member.link} />}
      {member.linkedin && <SocialIcon type="linkedin" href={member.linkedin} />}
      {member.github   && <SocialIcon type="github"   href={member.github} />}
      {member.scholar  && <SocialIcon type="scholar"  href={member.scholar} />}
      {member.orcid    && <SocialIcon type="orcid"    href={member.orcid} />}
    </div>
  );
}

const MembersCard = (member) => (
  <div key={member.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center">
    <img src={`/peopleImg/${member.id}.jpg`} alt={member.name} className="w-54 h-54 rounded-full object-cover mb-4 border-2 border-gray-300" />
    {member.link ?
    <Link to={`/people/${slugifyMemberName(member.name)}`} className="text-blue-600 hover:underline mt-2 text-sm">
      <h3 className="text-xl font-semibold mb-1">{member.name}</h3></Link>
      :
      <h3 className="text-xl font-semibold mb-1 text-blue-600">{member.name}</h3>}
    {/* <h3 className="text-xl font-semibold mb-1 text-blue-600">{member.name}</h3> */}
    <p className="text-gray-500 mb-1">{member.role}</p>
    <p className="text-gray-400 text-sm mb-2">{member.from}</p>
    <p className="text-gray-500 text-sm mb-2 "><div onClick={() => copyEmail(member.email)} className="ml-2 text-blue-600 hover:underline cursor-pointer">{member.email}</div></p>
    {member.edu && member.edu.map((edu, idx) => <p key={idx} className="text-gray-500 text-sm">{edu}</p>)}
  </div>
);



const AluminiCard = (member) => (
  <div key={member.id} className="flex flex-col items-center text-center">
    {/* <img src={`/peopleImg/${member.id}.jpg`} alt={member.name} className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-gray-300" /> */}
    {member.link ? <Link to={`/people/${slugifyMemberName(member.name)}`} className="text-blue-600 underline mt-2 text-sm">
      <h3 className="text-xl font-semibold mb-1">{member.name}</h3></Link>
      :
      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>}
    <p className="text-gray-400 text-sm mb-2">{member.date}</p>
    {member.desc && <ReactMarkdown className="markdown text-gray-300 text-sm">{member.desc}</ReactMarkdown>}
  </div>
);

export default function People() {
  const { data: peopleData, loading } = useDataLoader('peopleData');
  
  if (loading) {
    return (
      <div className="container pt-32 text-center">
        <p className="text-gray-600">Loading people data...</p>
      </div>
    );
  }

  if (!peopleData) {
    return (
      <div className="container pt-32 text-center">
        <p className="text-gray-600">No people data available.</p>
      </div>
    );
  }

  const { professorData, labMembersData = [], aluminiData = [] } = peopleData;
  function ProfessorLinks({ prof }) {
    return (
      <div className="flex flex-wrap gap-3 mt-6">
        {prof.email && (
          <a
            href={`mailto:${prof.email}`}
            title={prof.email}
            aria-label={`Email ${prof.email}`}
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition"
          >
            <MdEmail className="text-xl" aria-hidden />
          </a>
        )}
        {prof.link && (
          <a
            href={prof.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition text-sm font-medium"
          >
            <MdPersonOutline className="text-lg" />
            Website
          </a>
        )}
        {prof.linkedin && (
          <a
            href={prof.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition text-sm font-medium"
          >
            <FaLinkedin className="text-lg" />
            LinkedIn
          </a>
        )}
        {prof.scholar && (
          <a
            href={prof.scholar}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition text-sm font-medium"
          >
            <FaGoogle className="text-lg" />
            Scholar
          </a>
        )}
        {prof.github && (
          <a
            href={prof.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 transition text-sm font-medium"
          >
            <FaGithub className="text-lg" />
            GitHub
          </a>
        )}
      </div>
    );
  }
  return (
    <>
        {/* ── Professor Section ────────────────────────────────────── */}
      <section className="pt-24 pb-16 bg-white border-b border-gray-100">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">

            {/* Photo */}
            <div className="flex justify-center items-center md:justify-start">
              <div className="relative">
                <div className="w-56 h-56 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white ring-1 ring-gray-200">
                  <img
                    src="/peopleImg/1.jpg"
                    alt={professorData?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2">
              <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-1">Principal Investigator</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                {professorData?.name}
              </h1>
              <p className="mt-4 text-gray-600 text-base leading-relaxed">{professorData?.greeting}</p>

              <ProfessorLinks prof={professorData} />

              <div className={partTitle + " mt-8"}>Education</div>
              <ul className="list-disc list-outside pl-5 space-y-1.5 text-gray-600 text-sm marker:text-blue-300">
                {professorData?.edu?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <div className={partTitle}>Research Interests</div>
              <div className="prose prose-sm max-w-none text-gray-600">
                <ReactMarkdown>{professorData?.research}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </section>
        
        {/* <div className="container bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col  p-8 mb-12 lg:flex-row items-center gap-8 flex-1 text-center">
          <img src={`/peopleImg/1.jpg`} alt={professorData.name} className="w-96 h-96 rounded-3xl object-cover border-4 border-blue-100" />
          <div className="flex-1 mt-4 lg:mt-0 lg:ml-6 text-left">
            <h1 className="text-4xl font-bold mb-2">{professorData.name}</h1>
            <p className="my-6 text-lg text-gray-600">{professorData.greeting}</p>
            <p className="text-gray-500 mb-2"><strong>Email:</strong> <a href={`mailto:${professorData.email}`} className="text-blue-600 hover:underline">{professorData.email}</a></p>
            <p className="text-gray-500 mb-2"><strong>Website:</strong> <a href={professorData.link} target="_blank" className="text-blue-600 hover:underline">{professorData.link}</a></p>
            <div className={partTitle}>Education</div>
            {professorData.edu.map((item, idx) => <p key={idx} className="text-gray-500">{item}</p>)}
            <div className={partTitle}>Research Interest</div>
            <ReactMarkdown>{professorData.research}</ReactMarkdown>
          </div>
        </div> */}

        {/* Lab Members */}
        <section id="labmembers" className="container mb-12">
        <div className={sectionTitle}>Lab Members</div>
        <div className="divider" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {labMembersData.map(member => (
            <MembersCard key={member.id} {...member} />
          ))}
        </div>
        </section>

        {/* Alumni Section */}
        <section id="alumni" className="container mb-12">
        <div className={sectionTitle}>Alumni - Ph.D.</div>
        <div className="divider" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {aluminiData.filter(member => member.degree === 'Ph.D.').map(member => (
            <AluminiCard key={member.id} {...member} />
          ))}
        </div>
        </section>

        <section className="container mb-12">
        <div className={sectionTitle}>Alumni - M.S.</div>
        <div className="divider" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {aluminiData.filter(member => member.degree === 'M.S.').map(member => (
            <AluminiCard key={member.id} {...member} />
          ))}
        </div>
        </section>
    </>
  );
}
