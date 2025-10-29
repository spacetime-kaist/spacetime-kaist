// src/pages/Home.jsx
import React from 'react';

const articles = [
  {
    id: 1,
    title: "Major World Event Unfolds",
    excerpt: "Quick summary of world event happening right now.",
    image: "/images/world-event.jpg",
  },
  {
    id: 2,
    title: "Science Breakthrough in AI",
    excerpt: "AI research achieves a new milestone.",
    image: "/images/ai-breakthrough.jpg",
  },
  // ... more articles
];

export default function Press() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-red-600 text-white py-4 px-6">
        <h1 className="text-3xl font-bold">News Site</h1>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Featured article */}
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            <img
              src={articles[0].image}
              alt={articles[0].title}
              className="w-full lg:w-1/2 object-cover rounded-md"
            />
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-4">{articles[0].title}</h2>
              <p className="text-lg text-gray-700">{articles[0].excerpt}</p>
            </div>
          </div>
        </section>

        {/* Grid of other articles */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map(article => (
            <article key={article.id} className="group">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-md group-hover:opacity-90 transition"
              />
              <h3 className="text-2xl font-semibold mt-4">{article.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{article.excerpt}</p>
            </article>
          ))}
        </section>
      </main>

      <footer className="bg-gray-100 text-gray-600 text-sm py-4 text-center">
        © 2025 News Site. All rights reserved.
      </footer>
    </div>
  );
}
