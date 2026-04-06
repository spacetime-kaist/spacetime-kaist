import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDataLoader } from "../../hooks/useDataLoader";

function findPublicationBySlug(lists, slugParam) {
  if (!slugParam) return null;
  for (const list of lists) {
    if (!Array.isArray(list)) continue;
    const hit = list.find((item) => item.slug === slugParam);
    if (hit) return hit;
  }
  return null;
}

function venueLine(pub) {
  if (pub.journal) return pub.journal;
  if (pub.conference) {
    return pub.date ? `${pub.conference}, ${pub.date}` : pub.conference;
  }
  return pub.date || null;
}

function summaryMarkdown(pub) {
  if (pub.summary) return pub.summary;
  if (pub.abstract) return pub.abstract;
  return null;
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
  const { data: publicationsData, loading: pubLoading } = useDataLoader("publicationsData");
  const { data: internationalData, loading: intLoading } = useDataLoader("internationalData");
  const { data: nationalData, loading: natLoading } = useDataLoader("nationalData");

  const loading = pubLoading || intLoading || natLoading;

  const pub = useMemo(
    () => findPublicationBySlug([publicationsData, internationalData, nationalData], slug),
    [publicationsData, internationalData, nationalData, slug]
  );

  const shortAudio = pub ? shortPodcastUrl(pub) : null;
  const longAudio = pub ? longPodcastUrl(pub) : null;
  const duplicatePodcast = shortAudio && longAudio && shortAudio === longAudio;

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
        <Link
          to="/publications"
          className="text-blue-600 no-underline hover:underline text-sm font-medium inline-block mb-8"
        >
          ← Publications
        </Link>

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

          <section className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Summary</h2>
            <div className="mt-2 text-gray-700 leading-relaxed [&_p]:mt-3 [&_p:first-child]:mt-0 [&_strong]:font-semibold [&_a]:text-blue-600 [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5">
              <ReactMarkdown>{summaryMarkdown(pub)}</ReactMarkdown>
            </div>
          </section>

          <section className="mt-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Image</h2>
            {pub.image && (
            <img src={pub.image} alt={pub.title} className="my-3 ml-5 border border-slate-500 w-120 object-contain rounded-sm" />
            )}
          </section>

          {(shortAudio || longAudio) && (
            <section className="mt-10 space-y-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Podcast</h2>
              {duplicatePodcast ? (
                <audio controls preload="none" className="w-full">
                  <source src={shortAudio} type="audio/mp4" />
                  <source src={shortAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <>
                  {shortAudio && (
                    <div>
                      <p className="text-sm font-medium text-gray-800 mb-2">Short</p>
                      <audio controls preload="none" className="w-full">
                        <source src={shortAudio} type="audio/mp4" />
                        <source src={shortAudio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                  {longAudio && (
                    <div>
                      <p className="text-sm font-medium text-gray-800 mb-2">Long</p>
                      <audio controls preload="none" className="w-full">
                        <source src={longAudio} type="audio/mp4" />
                        <source src={longAudio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </>
              )}
            </section>
          )}
        </article>
      </div>
    </div>
  );
}
