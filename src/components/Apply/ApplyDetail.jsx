import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io"
import { GoGlobe } from "react-icons/go";
import { Link, useParams } from "react-router-dom";



export default function ApplyDetail() {

const data = {
    undergraduates: {
    en: {
      title: "Application Details",
      subtitle: "Graduate and Internship Positions",
      intro:
        "Thank you for your interest in joining our laboratory. Below are detailed guidelines for applying to our graduate programs, research internships, and postdoctoral positions. We value motivated individuals who are eager to explore AI-driven urban systems, smart construction, and civil engineering innovations.",
      sections: [
        {
          title: "1. Eligibility",
          text: [
            "• M.S. / Ph.D. Applicants: Hold (or expect) a B.S. or M.S. degree in Civil, Environmental, Urban, or related fields.",
            "• Intern Applicants: Undergraduate students with strong motivation in AI, simulation, or urban system research.",
            "• Postdoctoral / Research Professor: Ph.D. holders with proven publication or project experience.",
          ],
        },
        {
          title: "2. Application Period",
          text: [
            "• Graduate Students: Spring 2026 / Fall 2026 admission cycles.",
            "• Internships: Winter and Summer every year (typically 4–8 weeks).",
            "• Postdoctoral and Research Professor positions: Rolling basis.",
          ],
        },
        {
          title: "3. Required Documents",
          text: [
            "1. Curriculum Vitae (CV) with contact information.",
            "2. Academic transcript (latest degree).",
            "3. 1-page Statement of Purpose (research interests and motivation).",
            "4. (Optional) English test scores, publications, or portfolios.",
          ],
        },
        {
          title: "4. Submission",
          text: [
            "Send all documents via email to:",
            "📧 ",
            "Use the subject format:",
            "[Application] Position_Name – Your_Name",
          ],
        },
        {
          title: "5. Selection Process",
          text: [
            "1. Document screening based on academic record and motivation.",
            "2. Online interview for shortlisted candidates.",
            "3. Final admission or internship offer will be made via email.",
          ],
        },
      ],
      note: "Please contact us at least one month before the intended start date for internships. Early inquiries are highly encouraged.",
      back: "Back to Apply Page",
    },
    ko: {
      title: "지원 세부 안내",
      subtitle: "석박사 및 인턴십 모집",
      intro:
        "연구실에 관심을 가져주셔서 감사합니다. 아래는 석·박사 과정, 인턴십, 박사후 연구원 모집에 대한 상세 지원 안내입니다. 본 연구실은 AI 기반 도시 시스템, 스마트 건설, 토목공학 융합 연구에 열정을 가진 인재를 환영합니다.",
      sections: [
        {
          title: "1. 지원 자격",
          text: [
            "• 석사 / 박사 지원자: 토목, 환경, 도시, 또는 관련 전공의 학사/석사 학위 소지(예정)자.",
            "• 인턴 지원자: AI, 시뮬레이션, 도시 시스템 연구에 관심이 있는 학부생.",
            "• 연구교수 / 박사후 연구원: 우수한 논문 및 프로젝트 수행 경험을 가진 박사 학위 소지자.",
          ],
        },
        {
          title: "2. 모집 시기",
          text: [
            "• 대학원생: 2026년 봄 / 가을학기 입학.",
            "• 인턴십: 매년 동계 및 하계(4~8주).",
            "• 연구교수 / 박사후 연구원: 상시 모집.",
          ],
        },
        {
          title: "3. 제출 서류",
          text: [
            "1. 이력서 (연락처 포함).",
            "2. 최신 학위 성적표.",
            "3. 연구 관심 및 동기 포함 1페이지 자기소개서.",
            "4. (선택) 영어 성적, 논문, 포트폴리오 등.",
          ],
        },
        {
          title: "4. 제출 방법",
          text: [
            "모든 서류는 이메일로 제출합니다:",
            "📧 lab_email@domain.edu",
            "이메일 제목 형식:",
            "[Application] 지원분야 – 이름",
          ],
        },
        {
          title: "5. 선발 절차",
          text: [
            "1. 서류 심사 (학업 성취 및 지원 동기 평가).",
            "2. 온라인 면접 (서류 통과자 대상).",
            "3. 최종 합격 또는 인턴십 오퍼 개별 통보.",
          ],
        },
      ],
      note: "인턴십 지원은 시작 최소 한 달 전에 문의해 주시기 바랍니다. 조기 문의를 권장드립니다.",
      back: "지원 안내로 돌아가기",
    },},};

  const [lang, setLang] = useState("en");
  const { slug } = useParams();
  const t = data[slug]

  if (!data) {
    return (
      <div className="container">
        <div className="pt-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Apply Period Ended</h1>
          <Link to="/apply" className="text-blue-600 hover:underline">
            ← Back to Apply Page
          </Link>
        </div>
      </div>
    );
  }

  

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header + Language Toggle */}
        <div className="flex justify-between items-center mb-8">
          <Link
            variant="ghost"
            to="/apply"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <IoIosArrowBack size={18} /> {t[lang].back}
          </Link>
          <button
            onClick={() => setLang(lang === "en" ? "ko" : "en")}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <GoGlobe size={16} />
            {lang === "en" ? "한국어" : "English"}
          </button>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-2">{t[lang].title}</h1>
        <p className="text-xl text-gray-600 mb-8">{t[lang].subtitle}</p>

        <p className="text-gray-700 leading-relaxed mb-12">{t[lang].intro}</p>

        {/* Sections */}
        <div className="space-y-10">
          {t[lang].sections.map((sec, i) => (
            <div key={i}>
              <h2 className="text-2xl font-semibold mb-3">{sec.title}</h2>
              <ul className="text-gray-700 leading-relaxed space-y-1">
                {sec.text.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="mt-12 border-l-4 border-blue-500 pl-4 text-gray-600 text-sm flex items-start gap-2">
          <div size={16} className="mt-0.5" />
          <p>{t[lang].note}</p>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 flex items-center gap-3">
          <div size={20} />
          <p className="text-gray-700 text-sm">
            Contact:{" "}
            {/* <a
              href="mailto:lab_email@domain.edu"
              className="text-blue-600 hover:underline"
            >
              lab_email@domain.edu
            </a> */}
          </p>
        </div>

        {/* Apply Button */}
        <div className="mt-10">
          <div
            size="lg"
            onClick={() => (window.location.href = "mailto:lab_email@domain.edu")}
          >
            {lang === "en" ? "Start Application" : "지원 메일 보내기"}
          </div>
        </div>
      </div>
    </section>
  );
}
