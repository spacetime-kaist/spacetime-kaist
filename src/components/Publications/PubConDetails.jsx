import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDataLoader } from "../../hooks/useDataLoader";


function venueLine(pub) {
  if (pub.journal) return pub.journal;
  if (pub.conference) {
    return pub.date ? `${pub.conference}, ${pub.date}` : pub.conference;
  }
  return pub.date || null;
}

function podcastEnabled(pub) {
  return pub?.podcast_status === true || pub?.podcastStatus === true;
}

function shortPodcastUrl(pub) {
  if (pub.podcast) return pub.podcast;
  if (pub.podcastShort) return pub.podcastShort;
  if (Array.isArray(pub.audio) && pub.audio[0]) return pub.audio[0];
  return null;
}

function longPodcastUrl(pub) {
  if (pub.podcast_long) return pub.podcast_long;
  if (pub.podcastLong) return pub.podcastLong;
  if (Array.isArray(pub.audio) && pub.audio[1]) return pub.audio[1];
  return null;
}

export default function PubDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: publicationsData, loading: pubLoading } = useDataLoader("publicationsData");
  const { data: internationalData, loading: intLoading } = useDataLoader("internationalData");
  const { data: nationalData, loading: natLoading } = useDataLoader("nationalData");

  const loading = pubLoading || intLoading || natLoading;

  const allPubs = useMemo(
    () => [
      ...(publicationsData || []),
      ...(internationalData || []),
      ...(nationalData || []),
    ],
    [publicationsData, internationalData, nationalData]
  );

  const pub = useMemo(
    () => allPubs.find((item) => item.slug === slug) ?? null,
    [allPubs, slug]
  );

  const currentIndex = useMemo(
    () => allPubs.findIndex((item) => item.slug === slug),
    [allPubs, slug]
  );

  const prevPub = currentIndex > 0 ? allPubs[currentIndex - 1] : null;
  const nextPub = currentIndex < allPubs.length - 1 ? allPubs[currentIndex + 1] : null;

  const isPodcastPlayable = pub ? podcastEnabled(pub) : false;
  const shortAudio = pub ? shortPodcastUrl(pub) : null;
  const longAudio = pub ? longPodcastUrl(pub) : null;
  const duplicatePodcast = shortAudio && longAudio && shortAudio === longAudio;
  const audioClassName = `w-full ${isPodcastPlayable ? "" : "pointer-events-none opacity-60"}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 text-center px-6">
        <p className="text-gray-600">Loading publication…</p>
      </div>
    );
  }

  if (!pub) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Publication not found</h1>
          <p className="mt-3 text-gray-600">There is no publication matching this link.</p>
          <Link
            to="/publications"
            className="inline-block mt-6 text-blue-600 no-underline hover:underline"
          >
            ← Back to Publications
          </Link>
        </div>
      </div>
    );
  }

  const venue = venueLine(pub);

  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/publications"
            className="text-blue-600 no-underline hover:underline text-sm font-medium"
          >
            ← Publications
          </Link>
          <div className="flex items-center gap-3">
            {prevPub?.slug ? (
              <button
                onClick={() => navigate(`/publications/${prevPub.slug}`)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition"
                title={prevPub.title}
              >
                ‹ Prev
              </button>
            ) : (
              <span className="text-sm text-gray-300">‹ Prev</span>
            )}
            <span className="text-gray-300 text-sm">|</span>
            {nextPub?.slug ? (
              <button
                onClick={() => navigate(`/publications/${nextPub.slug}`)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition"
                title={nextPub.title}
              >
                Next ›
              </button>
            ) : (
              <span className="text-sm text-gray-300">Next ›</span>
            )}
          </div>
        </div>

        <article className="bg-white rounded-sm border border-gray-200 border-l-4 border-slate-600 shadow-sm p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">{pub.title}</h1>

          <dl className="mt-6 space-y-3 text-gray-700">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Authors</dt>
              <dd className="mt-0.5">{pub.authors}</dd>
            </div>
            {venue && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {pub.journal ? "Journal" : "Venue"}
                </dt>
                <dd className="mt-0.5">{venue}</dd>
              </div>
            )}
            {Array.isArray(pub.subjects) && pub.subjects.length > 0 && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Subject areas
                </dt>
                <dd className="mt-0.5">{pub.subjects.join(" · ")}</dd>
              </div>
            )}
          </dl>

          {pub.href && (
            <div className="mt-8">
              <a
                href={pub.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-md bg-slate-800 text-white text-sm font-semibold hover:bg-slate-900 transition"
              >
                View paper
              </a>
            </div>
          )}
          {pub.summary? (
          <section className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500"></h2>
            <div className="mt-2 text-gray-700 leading-relaxed [&_p]:mt-3 [&_p:first-child]:mt-0 [&_strong]:font-semibold [&_a]:text-blue-600 [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5">
              <ReactMarkdown>{pub.summary}</ReactMarkdown>
            </div>
          </section>)
          : pub.abstract? (
            <section className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Abstract</h2>
              <div className="mt-2 text-gray-700 leading-relaxed [&_p]:mt-3 [&_p:first-child]:mt-0 [&_strong]:font-semibold [&_a]:text-blue-600 [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5">
                <ReactMarkdown>{pub.abstract}</ReactMarkdown>
              </div>
            </section>
          ) : null}

          {pub.images && <section className="mt-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Image</h2>
            <img src={pub.images[0]} alt={pub.title} className="my-3 sm:mx-5 border border-slate-500 w-120 object-contain rounded-sm" />
          </section>}

          {pub.youtube && <section className="mt-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Video</h2>
            <div className={`my-3 sm:mx-5 w-full grid grid-cols-1 lg:grid-cols-${Math.min(pub.youtube.length, 2)} gap-4`}>
            {pub.youtube.map((video, idx) => (
            <iframe
                key={idx}
                src={`${video}&origin=https://spacetime.kaist.ac.kr/`}
                alt={`${pub.title} youtube ${idx + 1}`}
                allowFullScreen
                allow="accelerometer; autoplay;"
                className="max-w-120 border border-slate-500 aspect-video rounded-md "
                />
                ))}
          </div></section>}

          {(shortAudio || longAudio) && (
            <section className="mt-10 space-y-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Podcast</h2>
              {duplicatePodcast ? (
                <audio controls preload="none" className={audioClassName}>
                  <source src={shortAudio} type="audio/mp4" />
                  <source src={shortAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <>
                  {shortAudio && (
                    <div>
                      <p className="text-sm font-medium text-gray-800 mb-2">Short</p>
                      <audio controls preload="none" className={audioClassName}>
                        <source src={shortAudio} type="audio/mp4" />
                        <source src={shortAudio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                  {longAudio && (
                    <div>
                      <p className="text-sm font-medium text-gray-800 mb-2">Long</p>
                      <audio controls preload="none" className={audioClassName}>
                        <source src={longAudio} type="audio/mp4" />
                        <source src={longAudio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </>
              )}
              <p className="text-xs text-gray-400 italic -mt-4">Generated by NotebookLM</p>
            </section>
          )}
        </article>

        <div className="flex items-center justify-between mt-6">
          {prevPub?.slug ? (
            <button
              onClick={() => navigate(`/publications/${prevPub.slug}`)}
              className="flex flex-col items-start text-sm text-gray-500 hover:text-gray-900 transition max-w-[45%]"
            >
              <span className="text-xs text-gray-400 mb-0.5">← Previous</span>
              <span className="line-clamp-1 text-left">{prevPub.title}</span>
            </button>
          ) : <div />}
          {nextPub?.slug ? (
            <button
              onClick={() => navigate(`/publications/${nextPub.slug}`)}
              className="flex flex-col items-end text-sm text-gray-500 hover:text-gray-900 transition max-w-[45%]"
            >
              <span className="text-xs text-gray-400 mb-0.5">Next →</span>
              <span className="line-clamp-1 text-right">{nextPub.title}</span>
            </button>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
