import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function ScrolltoAnchor() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const lastHash = useRef("");
  
  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1) // For safe hashing
    }
    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        document
        .getElementById(lastHash.current)
          ?.scrollIntoView({ behavior: "smooth" , block: "start" });
        lastHash.current = "";
      },100);
    }
    else{
      if(navigationType === "PUSH"){
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };
  }, [location, navigationType]);
  return null;
}
export default ScrolltoAnchor;