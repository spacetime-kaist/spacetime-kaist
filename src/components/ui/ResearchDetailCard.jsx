import AutoSpanGallery from "./AutoSpanGallery";
import ReactMarkdown from "react-markdown";

export const ResearchGridCard = ( detail ) => (
<article className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
    <h2 className="text-2xl font-bold text-sky-900">{detail.title}</h2>
    <p className="text-sm text-gray-500">{detail.date}</p>
    <div className="prose prose-gray overflow-auto max-w-none mt-6 mb-4 text-gray-700 text-lg p">
    <ReactMarkdown className="markdown">{detail.desc}</ReactMarkdown>
    </div>
    {detail.hyperlink && <div><a href={detail.hyperlink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">[LINK]</a></div>}
    {/* {detail.ref && 
    <div>
    <h4 className=""> SELECTED REFERENCE </h4>
    {detail.ref.map((ref, idx) => (<div key={`ref-${idx}`} className="text-sm text-gray-500 mb-2">{ref}</div>))}
    </div>} */}

    <div className="lg:p-10 rows-2 columns-3  gap-4">
    {detail.youtube && detail.youtube.map((video, idx) => (
        <iframe
        key={idx}
        src={`${video}&origin=http://spacetime.kaist.ac.kr/`}
        alt={`${detail.title} youtube ${idx + 1}`}
        className="w-full aspect-video rounded-md object-cover"
        />
    ))}
    {detail.images && detail.images.map((img, idx) => (
        <img
        key={idx}
        src={`${import.meta.env.VITE_PUBLIC_URL}${img}`}
        alt={`${detail.title} photo ${idx + 1}`}
        className="mb-2 w-full "
        />
    ))}
    </div>

    {detail.footnote && 
    <div className="prose prose-gray overflow-auto max-w-none mt-6 mb-4 text-gray-700 text-md p">
    <ReactMarkdown className="markdown">{detail.footnote}</ReactMarkdown>
    </div>}
</article>
);

const ResearchGalleryCard = ( detail ) => (
<article className="flex flex-col flex-shrink p-6 bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
    <h1 className="text-3xl font-bold text-sky-800">{detail.title}</h1>
    <p className="text-sm text-gray-500">{detail.date}</p>
    <div className="prose prose-gray overflow-auto max-w-none mt-10 text-gray-700 text-lg p">
    <ReactMarkdown className="markdown">{detail.desc}</ReactMarkdown>
    </div>
    {detail.hyperlink && <div><a href={detail.hyperlink} target="_blank" rel="noopener noreferrer" className="text-md text-blue-600 hover:underline">[LINK]</a></div>}
    {/* {detail.ref && 
    <div>
    <h4 className=""> SELECTED REFERENCE </h4>
    {detail.ref.map((ref, idx) => (<div key={`ref-${idx}`} className="text-sm text-gray-500 mb-2">{ref}</div>))}
    </div>} */}
    <div className="mt-10  flex flex-col w-full justify-center items-center pb-10">
    <div className="w-5xl flex flex-col justify-center items-center">
        {detail.youtube && detail.youtube.map((video, idx) => (
        <iframe
            key={idx}
            src={`${video}&origin=http://spacetime.kaist.ac.kr/`}
            alt={`${detail.title} youtube ${idx + 1}`}
            className="w-3xl sm:w-5xl aspect-video rounded-md "
        />
        ))}
    </div>
    <div>
        {detail.images &&  <AutoSpanGallery images = {detail.images}/>}
    </div>
    </div>

    {detail.footnote && 
    <div className="prose prose-gray overflow-auto max-w-none mt-6 mb-4 text-gray-700 text-md p">
    <ReactMarkdown className="markdown">{detail.footnote}</ReactMarkdown>
    </div>}
</article>
);
export default ResearchGalleryCard;