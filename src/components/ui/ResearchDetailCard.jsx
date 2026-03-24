import ReactMarkdown from "react-markdown";

const GridGallery = ({ imageRows }) => {
    // Ensure imageRows is an array of arrays
    const rows = Array.isArray(imageRows[0]) ? imageRows : [imageRows];

  return (
    <div className="flex flex-col space-y-4 lg:w-6xl">
      {rows.map((imageRow, idx) => {
          const gridCol =
              imageRow.length === 1
                ? 1
                : imageRow.length === 2
                ? 2
                : 3;
        return (
            <div key={idx} className={`w-full grid grid-cols-1 md:grid-cols-${gridCol} gap-4`}>
                {imageRow && imageRow.map((image, idx) => (
                <img
                    key={idx}
                    src={`${image}`}
                    alt={`Research image ${idx + 1}`}
                    className="mb-2 w-full transition-transform duration-500 hover:scale-110"
                />
                ))}
            </div>
    )})}     
  </div>    
)};

const ResearchDetailCard = ( detail ) => (
<article className="flex flex-col flex-shrink p-6 bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
    <h1 className="text-3xl font-bold text-sky-800">{detail.title}</h1>
    <p className="text-lg text-gray-500 mt-1">{detail.date}</p>
    <div className="prose prose-gray overflow-auto max-w-none mt-7 text-gray-700 text-lg p">
    <ReactMarkdown className="markdown">{detail.desc}</ReactMarkdown>
    </div>
    {detail.hyperlink && <div><a href={detail.hyperlink} target="_blank" rel="noopener noreferrer" className="text-lg text-blue-600 hover:underline">[LINK]</a></div>}
    {/* {detail.ref && 
    <div>
    <h4 className=""> SELECTED REFERENCE </h4>
    {detail.ref.map((ref, idx) => (<div key={`ref-${idx}`} className="text-sm text-gray-500 mb-2">{ref}</div>))}
    </div>} */}
    <div className="mt-10  flex flex-col w-full justify-center items-center pb-10">
    {detail.images &&  <GridGallery imageRows = {detail.images}/>}
    {detail.videos && <div className={`w-full grid grid-cols-1 lg:grid-cols-${Math.max(detail.videos.length, 2)} gap-4`}>
        {detail.videos.map((video, idx) => (<div key={idx}>
        <iframe
            
            src={`${video[0]}`}
            alt={`${detail.title} youtube ${idx + 1}`}
            className="aspect-video rounded-md "
        />
        <figcaption className="mt-1 text-center text-lg font-bold text-gray-600">{video[1]}</figcaption>
        </div>))} 
    </div>}
    {detail.youtube && <div className={`w-full grid grid-cols-1 lg:grid-cols-${Math.max(detail.youtube.length, 2)} gap-4`}>
        {detail.youtube.map((video, idx) => (
        <iframe
            key={idx}
            src={`${video}&origin=https://spacetime.kaist.ac.kr/`}
            alt={`${detail.title} youtube ${idx + 1}`}
            className=" aspect-video rounded-md "
        />
        ))}
    </div>}
    </div>

    {detail.footnote && 
    <div className="prose prose-gray overflow-auto max-w-none mt-6 mb-4 text-gray-700 text-md p">
    <ReactMarkdown className="markdown">{detail.footnote}</ReactMarkdown>
    </div>}
</article>
);
export default ResearchDetailCard;