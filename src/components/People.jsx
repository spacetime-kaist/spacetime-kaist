import React, { useState } from "react";
import { useDataLoader } from '../hooks/useDataLoader';
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { MdEmail, MdCheck, MdPersonOutline } from "react-icons/md";
import { FaLinkedin, FaGoogle, FaGithub, FaOrcid } from "react-icons/fa";

/* ── helpers ─────────────────────────────────────────────────────── */

const SOCIAL_META = {
  website:  { icon: <MdPersonOutline />, tip: "Personal Website" },
  linkedin: { icon: <FaLinkedin />,      tip: "LinkedIn" },
  github:   { icon: <FaGithub />,        tip: "GitHub" },
  scholar:  { icon: <FaGoogle />,        tip: "Google Scholar" },
  orcid:    { icon: <FaOrcid />,         tip: "ORCID" },
};

function parseDateToken(token = "") {
  const cleaned = token.trim();
  if (!cleaned) return 0;

  // Handle ongoing ranges like "2024.03~", "~present", etc.
  if (/present|current|now/i.test(cleaned)) return Number.MAX_SAFE_INTEGER;

  const matched = cleaned.match(/(\d{4})\.(\d{1,2})/);
  if (!matched) return 0;

  const year = Number(matched[1]);
  const month = Number(matched[2]);
  return year * 100 + month;
}

function getEndDateScore(dateRange = "") {
  if (!dateRange) return 0;
  const parts = dateRange.split("~");
  const endPart = parts.length > 1 ? parts[1] : parts[0];
  return parseDateToken(endPart);
}

function imgWithFallback(id) {
  return {
    src: `/peopleImg/${id}.png`,
    onError: (e) => {
      const img = e.currentTarget;
      if (img.dataset.fallbackDone === "1") { img.style.display = "none"; return; }
      img.dataset.fallbackDone = "1";
      const src = img.getAttribute("src") || "";
      if (src.endsWith(".png")) { img.src = src.replace(/\.png$/, ".jpg"); return; }
      if (src.endsWith(".jpg")) { img.src = src.replace(/\.jpg$/, ".png"); return; }
      img.style.display = "none";
    },
  };
}

/* ── icon button ─────────────────────────────────────────────────── */

function IconBtn({ href, onClick, title, children }) {
  const cls = "inline-flex items-center justify-center w-8 h-8 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition text-base";
  if (href) return (
    <a href={href} target="_blank" rel="noopener noreferrer" title={title} aria-label={title} className={cls}>
      {children}
    </a>
  );
  return (
    <button type="button" onClick={onClick} title={title} aria-label={title} className={cls}>
      {children}
    </button>
  );
}

/* ── social icon ─────────────────────────────────────────────────── */

function SocialIcon({ type, href, label }) {
  const meta = SOCIAL_META[type] || SOCIAL_META.website;
  if (type === "website" && label) {
    return (
      <Link
        to={`/${(label)}`}
        target="_blank"
        rel="noopener noreferrer"
        title={label || meta.tip}
        aria-label={label || meta.tip}
        className="inline-flex items-center justify-center w-8 h-8 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition text-base"
      >
        {meta.icon}
      </Link>
    );
  }
  return <IconBtn href={href} title={label || meta.tip}>{meta.icon}</IconBtn>;
}

/* ── member link row ─────────────────────────────────────────────── */

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
    <div className="flex items-center gap-0.5">
      {member.email && (
        <IconBtn onClick={copyEmail} title={copied ? "Copied!" : `Copy: ${member.email}`}>
          {copied ? <MdCheck className="text-gray-600" /> : <MdEmail />}
        </IconBtn>
      )}
      {member.link     && <SocialIcon type="website"  href={member.link} label={member.slug} />}
      {member.linkedin && <SocialIcon type="linkedin" href={member.linkedin} />}
      {member.github   && <SocialIcon type="github"   href={member.github} />}
      {member.scholar  && <SocialIcon type="scholar"  href={member.scholar} />}
      {member.orcid    && <SocialIcon type="orcid"    href={member.orcid} />}
    </div>
  );
}

/* ── lab member card ─────────────────────────────────────────────── */

function MembersCard({ member }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Top accent band */}
      <div className="h-1.5 bg-gradient-to-r from-blue-800/70 to-indigo-800/50" />

      <div className="flex gap-4 items-start p-5">
        {/* Photo */}
        <div className="shrink-0">
          <img
            {...imgWithFallback(member.id)}
            alt={member.name}
            className="w-20 h-20 rounded-xl object-cover border border-gray-100 shadow-sm"
          />
        </div>

        {/* Name / role / period */}
        <div className="flex-1 min-w-0 pt-0.5">
          <Link
            to={`/${member.slug}`}
            className="font-bold text-gray-900 hover:text-blue-600 transition leading-snug block"
          >
            {member.name}
          </Link>
          <span className="inline-block mt-1 text-[11px] font-semibold uppercase tracking-wide text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
            {member.role || 'Principal Investigator'}
          </span>
          {/* {member.from && (
            <p className="text-xs text-gray-400 mt-1">{member.from}</p>
          )} */}
        </div>
      </div>

      {/* Education */}
      {member.edu && member.edu.length > 0 && (
        <div className="px-5 pb-3 flex-1">
          {/* <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Education</p> */}
          <ul className="space-y-1">
            {member.edu.map((edu, idx) => (
              <li key={idx} className="flex gap-2 text-xs text-gray-500">
                <span className="mt-0.5 shrink-0 w-1 h-1 rounded-full bg-blue-300 translate-y-1.5" />
                {edu}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Links */}
      <div className="px-5 pb-4 pt-2 border-t border-gray-50 flex items-center">
        <MemberLinks member={member} />
      </div>
    </div>
  );
}

/* ── alumni card ─────────────────────────────────────────────────── */

function AlumniCard({ member }) {
  return (
    <div className="group bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 flex flex-col items-center text-center overflow-hidden">

      {/* Photo */}
      <div className="pt-5 pb-3">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-blue-200 transition bg-gradient-to-br from-blue-50 to-slate-100">
          <img
            {...imgWithFallback(member.id)}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Name + period */}
      <div className="px-3 pb-3 flex flex-col items-center gap-1">
        {member.link ? (
          <Link
            to={`/people/${slugifyMemberName(member.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline leading-tight"
          >
            {member.name}
          </Link>
        ) : (
          <p className="text-sm font-semibold text-gray-800 leading-tight">{member.name}</p>
        )}

        {/* Position tags */}
        {(member.pdra || member.phd || member.ms) && (
          <div className="justify-center flex flex-row gap-0.5 w-full mt-0.5">
            {member.pdra && <p className="text-[11px] text-gray-500"><span className="font-semibold text-blue-400">PDRA</span></p>}
            {member.pdra && member.phd && <p className="text-[11px] text-gray-500"><span className="font-semibold text-blue-400">·</span></p>}
            {member.phd  && <p className="text-[11px] text-gray-500"><span className="font-semibold text-blue-400">Ph.D.</span></p>}
            {member.phd  && member.ms && <p className="text-[11px] text-gray-500"><span className="font-semibold text-blue-400">·</span></p>}
            {member.ms   && <p className="text-[11px] text-gray-500"><span className="font-semibold text-blue-400">M.S.</span></p>}
          </div>
        )}

        {member.desc && (
          <ReactMarkdown className="markdown text-gray-400 text-[11px] leading-relaxed mt-0.5">{member.desc}</ReactMarkdown>
        )}

        {(member.email || member.linkedin || member.github) && (
          <div className="flex gap-1.5 mt-1">
            {member.email    && <a href={`mailto:${member.email}`} title={member.email} className="text-gray-400 hover:text-blue-500 transition text-base"><MdEmail /></a>}
            {member.linkedin && <SocialIcon type="linkedin" href={member.linkedin} />}
            {member.github   && <SocialIcon type="github"   href={member.github} />}
          </div>
        )}
      </div>

      {/* Current workplace — pinned to bottom */}
      {member.current && (
        <div className="mt-auto w-full h-auto border-t border-gray-100 bg-gray-50 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Current</p>
          <p className="text-[11px] text-gray-600 leading-snug">
            {member.current.split(",").map((part, index, parts) => (
              <span className={
                index === parts.length - 1
                  ? "font-medium text-gray-800 "           // institution
                  : index === 0
                    ? "font-normal text-gray-500"      // role
                    : "font-normal text-gray-500"            // department
              }>
                {part.trim()}
                {index < parts.length - 1 && (
                  <>
                    ,&nbsp;<br />
                  </>
                )}
              </span>
            ))}
          </p>
        </div>
        
      )}
    </div>
  );
}

/* ── section header ──────────────────────────────────────────────── */

function SectionHeader({ title, count, countLabel = "members" }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 shrink-0">{title}</h2>
      {/* {count != null && (
        <span className="text-sm text-gray-400 shrink-0">{count} {countLabel}</span>
      )} */}
      <span className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

const labelCls = "text-xs uppercase tracking-widest text-blue-600 mb-2 block";

/* ── page ────────────────────────────────────────────────────────── */

export default function People() {
  const { data: peopleData, loading } = useDataLoader('peopleData');
  const [copied, setCopied] = useState(false);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  if (!peopleData) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <p className="text-sm text-gray-400">No people data available.</p>
      </div>
    );
  }

  const { professorData, labMembersData = [], aluminiData = [] } = peopleData;
  const sortedAlumni = [...aluminiData].sort((a, b) => {
    const endDiff = getEndDateScore(b.date) - getEndDateScore(a.date);
    if (endDiff !== 0) return endDiff;
    return (a.name || "").localeCompare(b.name || "");
  });


  return (
    <div className=" min-h-screen">
      <header className="py-5">
          <div className="container ">
            <h1 className="pagetitle lg:pl-40 justify-start items-start ml-0">People</h1>
            {/* <div className="divider" /> */}
          </div>
        </header>


      {/* ── Professor ─────────────────────────────────────────────── */}
      {/* <section className="border-b border-gray-200 pt-24 pb-14">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex flex-col sm:flex-row gap-10 items-start">

            Photo
            <img
              src={`/peopleImg/1.jpg`}
              alt={professorData?.name}
              className="w-32 h-32 shrink-0 rounded-lg object-cover border border-gray-200 bg-gray-100"
              onError={e => { e.target.src = "/peopleImg/placeholder.jpg"; }}
            />

            Info
            <div className="flex-1 min-w-0">
              <p className={labelCls}>
                Principal Investigator
              </p>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {professorData?.name}
              </h1>
              <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-2xl">
                {professorData?.greeting}
              </p>

              Links
              <div className="flex flex-wrap gap-2 mt-4">
                {professorData?.email && (
                  <div onClick={() => {navigator.clipboard.writeText(professorData.email); setCopied(true); setTimeout(() => setCopied(false), 3000);}}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-500 text-xs font-medium transition">
                    {copied ? <><MdCheck className="text-green-500" /> Copied!</>: <><MdEmail className="text-sm" /> Email</>} 
                  </div>
                )}
                {professorData?.link && (
                  <a href={professorData.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-500 text-xs font-medium transition">
                    <MdPersonOutline className="text-sm" /> Website
                  </a>
                )}
                {professorData?.scholar && (
                  <a href={professorData.scholar} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-500 text-xs font-medium transition">
                    <FaGoogle className="text-xs" /> Scholar
                  </a>
                )}
                {professorData?.linkedin && (
                  <a href={professorData.linkedin} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-500 text-xs font-medium transition">
                    <FaLinkedin className="text-xs" /> LinkedIn
                  </a>
                )}
              </div>

              Education
              <div className="mt-6">
                <span className={labelCls}>Education</span>
                <ul className="space-y-1">
                  {professorData?.edu?.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-gray-500 leading-relaxed pl-3 border-l border-gray-200">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              Research Interests
              <div className="mt-6">
                <span className={labelCls}>Research Interests</span>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Coming from Mathematics, Computer Science, Management Science, and Civil engineering background,
                  my research focus is system-of-systems, which includes transportation system, city, logistics system,
                  and public health system. My recent research interests include the following areas.
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-blue-300" />
                    <span><span className="font-semibold text-gray-700">Urban Intelligence</span>: Urban Region Representation Learning; SDG Data Science; AI and Cities; AI for Social Good</span>
                  </li>
                  <li className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-blue-300" />
                    <span><span className="font-semibold text-gray-700">Computational Transportation Science</span>: Future Mobility and AI; Graph Neural Net and Traffic Forecasting; Transportation Network Science; Safety Risk Management</span>
                  </li>
                  <li className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-blue-300" />
                    <span ><span className="font-semibold text-gray-700">Sustainable Urban Mobility</span>: Urban Mobility Decarbonization; Mobility Accessibility and Inequality; Urban Air Mobility (UAM)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* ── Lab Members ───────────────────────────────────────────── */}
      <section id="labmembers" className="py-14">
        
        <div className="max-w-5xl mx-auto px-8">
          <SectionHeader title="Current" count={labMembersData.length} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MembersCard member={professorData} />
            {labMembersData.map(member => (
              <MembersCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Alumni ────────────────────────────────────────────────── */}
      {aluminiData.length > 0 && (
        <section id="alumni" className="py-14 border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-8">
            <SectionHeader title="Alumni" count={aluminiData.length} countLabel="graduates" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {sortedAlumni.map(member => (
                <AlumniCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
