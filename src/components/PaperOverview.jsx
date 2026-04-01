import React from 'react';
import Navbar from '../utility/Navbar';
import ScrollUpBt from '../utility/ScrollUpButton';

const summaryItems = [
  { key: 'Problem', text: '기존 연구에서 해결하지 못한 문제점이나 한계를 한 줄로 작성하세요.' },
  { key: 'Solution', text: '이 논문이 제안하는 핵심 아이디어를 한 줄로 작성하세요.' },
  { key: 'Result', text: '주요 성능 향상 지표를 한 줄로 작성하세요. (예: 정확도 5% 향상, SOTA 달성)' },
];

export default function PaperOverview() {
  return (
    <div id="top" className="font-display bg-slate-50 text-slate-900 min-h-screen">
      <div className="w-full h-16" />
      <Navbar />
      <ScrollUpBt />

      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 pt-20 pb-12">
          <p className="text-xs tracking-[0.18em] uppercase text-slate-400 font-medium">
            Paper Summary · Lite Template
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            논문 제목을 여기에 입력하세요
          </h1>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-600">
            저자 / 학회(저널) / 연도
          </p>
          {/* <div className="mt-5 flex flex-wrap gap-2">
            {['Domain', 'Method', 'Benchmark'].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-600"
              >
                {chip}
              </span>
            ))}
          </div> */}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 sm:px-10 py-10 space-y-6">

        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. 핵심 요약 (3-Line Summary)</h2>
          <ol className="list-decimal pl-5 space-y-3 text-sm sm:text-base text-slate-700">
            {summaryItems.map((item) => (
              <li key={item.key}>
                <span className="font-semibold text-slate-900">{item.key}:</span> {item.text}
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. 핵심 방법론 (Simple Methodology)</h2>
          <div className="space-y-3 text-sm sm:text-base text-slate-700">
            <p>
              <span className="font-semibold text-slate-900">Input & Output:</span> 무엇을 넣어서 무엇이 나오는지 작성하세요.
            </p>
            <p>
              <span className="font-semibold text-slate-900">Core Pipeline:</span> 전체 프로세스를 2~3단계로 요약하세요.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p ><span className="font-semibold text-slate-900">Step 1:</span> 첫 번째 핵심 단계</p>
              <p className="mt-2"><span className="font-semibold text-slate-900">Step 2:</span> 두 번째 핵심 단계</p>
            </div>
            <p>
              <span className="font-semibold text-slate-900">Key Innovation:</span> 가장 독창적인 모듈/수식 한 가지를 작성하세요.
            </p>
            <p>
              <span className="font-semibold text-slate-900">Main Figure:</span> 전체 구조도나 아키텍처 그림을 캡처해 첨부하세요.
            </p>
          </div>
          <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 min-h-[280px] flex items-center justify-center p-6 text-center">
            <p className="text-sm text-slate-500 leading-relaxed">Main Figure 이미지 영역</p>
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Result and Conclusion</h2>
          <p>
              <span className="font-semibold text-slate-900">Key Result:</span> 가장 대표적인 결과를 작성하세요.
            </p>
            <p>
              <span className="font-semibold text-slate-900">Main Figure:</span> 결과 그림을 캡처해 첨부하세요.
            </p>
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 min-h-[280px] flex items-center justify-center p-6 text-center">
            <p className="text-sm text-slate-500 leading-relaxed">Result Figure 이미지 영역</p>
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Future Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-800">한계점</h3>
              <p className="mt-2 text-sm text-slate-600">현재 부족한 점을 간단히 정리하세요.</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-800">미래 방향</h3>
              <p className="mt-2 text-sm text-slate-600">한계를 해결하기 위한 추가 연구 방향을 적으세요.</p>
            </article>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Tip: 전체 분량은 반 페이지에서 1페이지 이내로 유지하면 읽기 좋습니다.
          </p>
        </section>
      </main>
    </div>
  );
}
