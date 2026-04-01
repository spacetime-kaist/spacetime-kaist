import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useDataLoader } from "../hooks/useDataLoader";
import { normalizeExternalUrl, slugifyMemberName } from "../utility/peopleLinks";

function findPersonBySlug(peopleData, slug) {
  if (!peopleData || !slug) return null;

  const members = [
    ...(peopleData.labMembersData || []),
    ...(peopleData.aluminiData || []),
    peopleData.professorData,
  ].filter(Boolean);

  return members.find((person) => slugifyMemberName(person.name) === slug) || null;
}

export default function PeopleDetail() {
  const { slug } = useParams();
  const { data: peopleData, loading } = useDataLoader("peopleData");

  const person = useMemo(() => findPersonBySlug(peopleData, slug), [peopleData, slug]);
  const targetUrl = useMemo(() => normalizeExternalUrl(person?.link || ""), [person]);
  const educationList = person?.edu || [];

  useEffect(() => {
    if (!targetUrl) return;
    const timer = window.setTimeout(() => {
      window.location.href = targetUrl;
    }, 600);

    return () => window.clearTimeout(timer);
  }, [targetUrl]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-xl w-full p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Member not found</h1>
          <p className="mt-3 text-gray-600">The requested profile does not exist.</p>
          <Link
            to="/people"
            className="inline-block mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Back to People
          </Link>
        </div>
      </div>
    );
  }

  if (!targetUrl) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-blue-800/70 to-indigo-800/50" />
          <div className="p-8">
            <p className="text-xs uppercase tracking-wider text-blue-500 font-semibold">Lab Member Profile</p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">{person.name}</h1>
            {person.role && (
              <p className="mt-2 inline-block text-xs font-semibold uppercase tracking-wide text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                {person.role}
              </p>
            )}
            {person.from && <p className="mt-4 text-sm text-gray-600">In lab since {person.from}</p>}
            {person.email && (
              <p className="mt-1 text-sm text-gray-600">
                Email:{" "}
                <a href={`mailto:${person.email}`} className="text-blue-600 hover:text-blue-700 underline">
                  {person.email}
                </a>
              </p>
            )}

            {educationList.length > 0 && (
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Education</h2>
                <ul className="mt-3 space-y-2">
                  {educationList.map((item, index) => (
                    <li key={index} className="flex gap-2 text-sm text-gray-600">
                      <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-blue-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8">
              <Link
                to="/people"
                className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Back to People
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-xl w-full p-8 text-center">
        <p className="text-sm uppercase tracking-wider text-blue-500 font-semibold">Redirecting</p>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">{person.name}</h1>
        <p className="mt-3 text-gray-600">You will be redirected to this member's personal page in a moment.</p>
        <a
          href={targetUrl}
          className="inline-block mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Open now
        </a>
        <div className="mt-4">
          <Link to="/people" className="text-sm text-gray-500 hover:text-gray-700 underline">
            Cancel and go back
          </Link>
        </div>
      </div>
    </div>
  );
}
