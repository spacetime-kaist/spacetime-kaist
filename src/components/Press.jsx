// src/pages/Home.jsx
import React from 'react';
import pressData from '../uploads/pressData';
import ReactMarkdown from 'react-markdown';

const articles = [
  {
    id: 1,
    title: "Major World Event Unfolds",
    excerpt: "Quick summary of world event happening right now.",
    image: "/assets/images_20251029.jpg",
  },
  {
    id: 2,
    title: "Science Breakthrough in AI",
    excerpt: "AI research achieves a new milestone.",
    image: "/images/ai-breakthrough.jpg",
  },
  // ... more articles
];

const PressCard = (article) => (
          <div className="container">
            <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className='col-span-3'>
                <a href='https://news.kaist.ac.kr/news/html/news/?mode=V&mng_no=53650'>
                  <div className={`relative w-full pb-[56.25%]
                                   rounded-md shadow-lg overflow-hidden
                                   flex flex-col text-bottom `}
                        style={{
                          backgroundImage:
                          `url('${article.image}')`,
                          backgroundColor: "rgba(153, 181, 197, 1)",
                          transform: "translate3d(0,0,0)",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundBlendMode: "multiply",
                        }}>
                    <h3 className="absolute bottom-15 text-2xl sm:text-4xl text-white font-bold drop-shadow-xl px-4 text-bottom">
                      {article.title}
                    </h3>
                    <div className="w-full absolute bottom-4 left-4 text-sm sm:text-lg font-bold flex flex-row justify-start items-start text-start">
                      <p className="mt-6 px-5">{article.writer}</p>
                      <p className="mt-6 text-slate-300 px-5">{article.date}</p>
                    </div>
                  </div>
                </a>
              </div>
              <div className='col-span-2'>
              <ReactMarkdown className="m-6 text-md lg:text-xl text-black border-l-4 border-black p-6">{article.desc}</ReactMarkdown>
              <div className="m-6 flex flex-wrap gap-3">
                  {article.link_kr &&<a href={article.link_kr} className="inline-flex items-center px-5 py-3 bg-black text-white rounded-md text-sm font-semibold">KR</a>}
                  {article.link_en &&<a href={article.link_en} className="inline-flex items-center px-5 py-3 border border-gray-300 rounded-md text-sm">EN</a>}
              </div>
              </div>
            </div>
            <div className=" my-8 text-blue-900/80"> 
                <strong>({article.date}) {article.title}</strong> -
                {article.link_others && article.link_others.map((link) => (
                      <a key={link.id} href={link.href} className="text-sm text-start hover:underline"> {link.source},</a> ))}
            </div>       
          </div>
)

export default function Press() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-t-3 border-b-3 border-black px-6">
        <h1 className="pagetitle text-3xl font-serif text-center translate-y-4">STIL in PRESS</h1>
      </header>

      <main className="mx-auto px-6 py-8">
        {/* Main Front */}
        <section id='headline' className="mb-16 grid flex flex-row">
        {/* Featured article */}
          {pressData.map(article => (PressCard(article)))}
        {/* Grid of other articles for Later*/}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map(article => (
            <article key={article.id} className="group">
              <img
                src={ex}
                alt={article.title}
                className="w-full h-48 object-cover rounded-md group-hover:opacity-90 transition"
              />
              <h3 className="text-2xl font-semibold mt-4">{article.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{article.excerpt}</p>
            </article>
          ))}
          </div> */}
        </section>
      </main>

      <footer className="bg-gray-100 text-gray-600 text-sm py-4 text-center">
      </footer>
    </div>
  );
}
