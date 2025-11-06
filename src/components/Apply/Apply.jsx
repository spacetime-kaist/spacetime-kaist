import { IoChevronForwardOutline } from "react-icons/io5";
import LinkButton from "../ui/LinkButton";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export default function Apply() {
const copyEmail = async (email) => {
        await navigator.clipboard.writeText(email);
        alert("이메일 복사에 성공했습니다");
};

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          Apply / Recruitment
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Our laboratory welcomes passionate individuals who seek to advance
          research in intelligent urban systems and AI-driven civil engineering.
          We recruit graduate students, interns, and postdoctoral researchers
          regularly.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Graduate Students */}
          <div className="rounded-2xl shadow-sm">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                M.S. / Ph.D. Students
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Applicants with B.S. or M.S. degrees in related fields.
              </p>
              <ul className="text-sm text-gray-500 mb-4 space-y-1">
                <li>
                  <strong>Application:</strong> Spring 2026 / Fall 2026
                </li>
                <li>
                  <strong>Departments:</strong> Civil & Environmental
                  Engineering, Urban Engineering, AI & Smart Cities
                </li>
              </ul>
              <LinkButton linkto='/apply/graduates' text='See in Detail'/>
            </div>
          </div>

          {/* Internship */}
          <div className="rounded-2xl shadow-sm">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                Winter / Summer Internships
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                For undergraduate students interested in AI, simulation, or
                urban systems.
              </p>
              <ul className="text-sm text-gray-500 mb-4 space-y-1">
                <li>
                  <strong>Period:</strong> Every Winter & Summer Vacation
                </li>
                <li>
                  <strong>Fields:</strong> All relevant disciplines
                </li>
              </ul>
              <LinkButton linkto='/apply/undergraduates' text='See in Detail'/>
            </div>
          </div>

          {/* Research / Postdoc */}
          <div className="rounded-2xl shadow-sm">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                Research Professors / Postdoctoral Fellows
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                For Ph.D. holders with strong publication or project experience.
              </p>
              <ul className="text-sm text-gray-500 mb-4 space-y-1">
                <li>
                  <strong>Application:</strong> Rolling basis
                </li>
                <li>
                  <strong>Focus:</strong> Urban AI & Urban Representation
                </li>
              </ul>
              <LinkButton linkto='/apply/post' text='See in Detail'/>
            </div>
          </div>
        </div>

        {/* Application Instructions */}
        <div className="mt-16 bg-white rounded-2xl shadow-sm p-8 max-w-4xl mx-auto">
          <h4 className="text-2xl font-semibold mb-4">
            Application Process
          </h4>
          <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-6">
            <li>Prepare CV, transcript, and a 1-page statement of purpose.</li>
            <li>
              Email your documents to{" "}
              {/* <span className="font-medium text-blue-600">
                smsohn1997@kaist.ac.kr
              </span> */}
              <span onClick={() => copyEmail("smsohn1997@kaist.ac.kr")} className="font-medium text-blue-600 hover:underline cursor-pointer">smsohn1997@kaist.ac.kr</span>{" "}
              with the title:{" "}
              <span className="italic">
                [Application] Position_Name - Your_Name
              </span>
            </li>
            <li>Shortlisted candidates will be contacted for an interview.</li>
          </ol>

          <div className="flex items-center justify-between text-gray-500 text-sm">
            <span className="flex items-center gap-2">
              <div size={16} /> Early inquiries are encouraged.
            </span>
            <span className="flex items-center gap-2">
              <div size={16} /> Contact at least one month before internship
              start.
            </span>
          </div>
        </div>
        {/* FAQ */}
        <Link
                    variant="ghost"
                    to="/apply"
                  >
        <div className="mt-5 bg-white rounded-2xl shadow-sm p-8 max-w-4xl mx-auto flex justify-start items-center text-center hover:bg-gray-100 cursor-pointer">
          <h4 className="text-2xl font-semibold mb-4">FAQ</h4><IoIosArrowForward size={24} className="items-center" />
        </div>
        </Link>
      </div>
    </section>
  );
}
