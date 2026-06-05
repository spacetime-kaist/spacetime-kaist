import ReactMarkdown from "react-markdown";
import {
  FiArrowUpRight,
  FiGithub,
  FiFileText,
  FiBookOpen,
  FiPlayCircle,
  FiExternalLink,
} from "react-icons/fi";

/* Infer a sensible icon + label from a URL so the call-to-action button reads
 * clearly instead of a generic "link". */
const linkMeta = (url = "") => {
  const u = url.toLowerCase();
  if (u.includes("github.com")) return { Icon: FiGithub, label: "View on GitHub" };
  if (u.includes("readthedocs") || u.includes("/docs"))
    return { Icon: FiBookOpen, label: "Documentation" };
  if (
    u.includes("doi.org") ||
    u.includes("ieee") ||
    u.includes("acm.org") ||
    u.includes("scholar.google") ||
    u.includes("openaccess") ||
    u.endsWith(".pdf")
  )
    return { Icon: FiFileText, label: "Read paper" };
  if (u.includes("youtu") || u.includes("pages.dev") || u.includes("demo"))
    return { Icon: FiPlayCircle, label: "Try the demo" };
  return { Icon: FiExternalLink, label: "Visit site" };
};

const ResourceLink = ({ href, label }) => {
  const meta = linkMeta(href);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-900 hover:text-white"
    >
      <meta.Icon className="text-base" aria-hidden />
      <span>{label || meta.label}</span>
      <FiArrowUpRight className="text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
    </a>
  );
};

/*
 * NOTE on Tailwind v4: class names must appear as complete literal strings or
 * the compiler purges them. Never build `grid-cols-${n}` dynamically — use the
 * static lookup below.
 */
const columnsFor = (n) => {
  if (n <= 1) return "grid-cols-1";
  if (n === 2 || n === 4) return "grid-cols-1 sm:grid-cols-2";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
};

const mediaColumns = (n) =>
  n <= 1 ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2";

const isVideoFile = (src) => /\.(mp4|webm|ogg)$/i.test(src);

/* Normalizes the three image shapes used across researchData.json into rows:
 *   "a.png"                         -> [["a.png"]]
 *   ["a.png", "b.png"]              -> [["a.png", "b.png"]]
 *   [["a.png"], ["b.png", "c.png"]] -> unchanged (already rows)
 */
const toImageRows = (images) => {
  if (!images) return [];
  const arr = Array.isArray(images) ? images : [images];
  return Array.isArray(arr[0]) ? arr : [arr];
};

/* Every figure sits in a fixed-height band with object-contain, so tall and
 * wide images share a consistent visual size instead of stretching the grid. */
const Figure = ({ src, alt }) => (
  <div className="flex items-center justify-center rounded-md border border-slate-200 bg-slate-50 p-2">
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="max-h-[360px] w-auto max-w-full object-contain"
    />
  </div>
);

const ImageGallery = ({ images }) => {
  const rows = toImageRows(images);
  if (rows.length === 0) return null;

  return (
    <div className="flex w-full flex-col gap-4">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className={`grid w-full gap-4 ${columnsFor(row.length)}`}>
          {row.map((image, idx) => (
            <Figure
              key={idx}
              src={image}
              alt={`Research figure ${rowIdx + 1}.${idx + 1}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const VideoGallery = ({ videos }) => (
  <div className={`grid w-full gap-5 ${mediaColumns(videos.length)}`}>
    {videos.map(([src, caption], idx) => (
      <figure key={idx} className="w-full">
        {isVideoFile(src) ? (
          <video
            src={src}
            controls
            playsInline
            className="aspect-video w-full rounded-md border border-slate-200 bg-black object-contain"
          />
        ) : (
          <iframe
            src={src}
            title={caption || `Research video ${idx + 1}`}
            allowFullScreen
            allow="accelerometer; autoplay;"
            className="aspect-video w-full rounded-md border border-slate-200"
          />
        )}
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-slate-500">
            {caption}
          </figcaption>
        )}
      </figure>
    ))}
  </div>
);

const YoutubeGallery = ({ youtube }) => (
  <div className={`grid w-full gap-5 ${mediaColumns(youtube.length)}`}>
    {youtube.map((url, idx) => (
      <iframe
        key={idx}
        src={`${url}&origin=https://spacetime.kaist.ac.kr/`}
        title={`Research video ${idx + 1}`}
        allowFullScreen
        allow="accelerometer; autoplay;"
        className="aspect-video w-full rounded-md border border-slate-200"
      />
    ))}
  </div>
);

/* Custom renderers for markdown bodies. Inline styles are used because they
 * beat the global `.markdown > * { all: revert }` reset. */
const markdownComponents = {
  img: ({ ...props }) => {
    delete props.node;
    return (
      <img
        {...props}
        loading="lazy"
        style={{ maxWidth: "100%", maxHeight: "360px", height: "auto" }}
      />
    );
  },
  a: ({ href = "", children, ...props }) => {
    delete props.node;
    const external = /^https?:\/\//i.test(href);
    return (
      <a
        {...props}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        style={{
          color: "#1d4ed8",
          fontWeight: 500,
          textDecoration: "underline",
          textUnderlineOffset: "2px",
          textDecorationColor: "#bfdbfe",
        }}
      >
        {children}
        {external && (
          <FiArrowUpRight
            aria-hidden
            style={{
              display: "inline",
              verticalAlign: "-0.1em",
              marginLeft: "0.1em",
            }}
          />
        )}
      </a>
    );
  },
};

const ResearchDetailCard = (detail) => {
  const refs = Array.isArray(detail.ref) ? detail.ref.join("\n\n") : detail.ref;
  const hasMedia = detail.images || detail.videos || detail.youtube;

  return (
    <article className="mb-6 rounded-lg border border-slate-200 bg-white p-6 sm:p-8">
      <header>
        <h3 className="text-2xl font-semibold leading-snug text-slate-900">
          {detail.title}
        </h3>
        {detail.date && (
          <p className="mt-1 text-sm text-slate-500">{detail.date}</p>
        )}
      </header>

      {detail.desc && (
        <div className="prose prose-slate mt-5 max-w-none text-slate-700">
          <ReactMarkdown className="markdown" components={markdownComponents}>
            {detail.desc}
          </ReactMarkdown>
        </div>
      )}

      {detail.hyperlink && (
        <div className="mt-5">
          <ResourceLink href={detail.hyperlink} />
        </div>
      )}

      {refs && (
        <div className="mt-6 border-l-2 border-slate-200 pl-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Selected reference
          </p>
          <div className="prose prose-sm mt-1 max-w-none font-italic text-slate-600">
            <ReactMarkdown className="markdown hover:underline">{refs}</ReactMarkdown>
          </div>
        </div>
      )}

      {hasMedia && (
        <div className="mt-7 flex w-full flex-col gap-6">
          {detail.images && <ImageGallery images={detail.images} />}
          {detail.videos && <VideoGallery videos={detail.videos} />}
          {detail.youtube && <YoutubeGallery youtube={detail.youtube} />}
        </div>
      )}

      {detail.footnote && (
        <div className="prose prose-sm mt-7 max-w-none border-t border-slate-100 pt-4 text-slate-500">
          <ReactMarkdown className="markdown">{detail.footnote}</ReactMarkdown>
        </div>
      )}
    </article>
  );
};

export default ResearchDetailCard;
