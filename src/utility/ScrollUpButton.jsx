import { IoIosArrowDropup  } from "react-icons/io";
import { Link } from "react-router-dom";

function ScrollUpBt() {
    return (
        <div className="fixed bottom-6 left-6">
            <Link to="#top" className="text-5xl sm:text-6xl text-gray-500 hover:text-blue-500 opacity-40 hover:opacity-100 transition">
                <IoIosArrowDropup />
            </Link>
        </div>
    );
}
export default ScrollUpBt;