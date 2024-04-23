import { FaBitcoin } from "react-icons/fa";
import { useState, useEffect } from "react";
import dashboard from "../assets/dashboard.png"

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    let position = Math.round(window.scrollY);
    if (position > 565) position = 565;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <div className="h-[900px] bg-red-200">
        <div>
          <FaBitcoin style={{transform: `rotate(${scrollPosition}deg)`, top: `${(scrollPosition + 70) * 2}px`, left: `${(scrollPosition + 500) * 0.7}px`}} className="absolute" size={70} />
          <FaBitcoin style={{transform: `rotate(${scrollPosition}deg)`, top: `${(scrollPosition + 140) * 1.8}px`, left: `${(scrollPosition + 150) * 1}px`}} className="absolute" size={70} />
          <FaBitcoin style={{transform: `rotate(${scrollPosition}deg)`, top: `${(scrollPosition + 220) * 1.6}px`, left: `${(scrollPosition + 500) * 0.7}px`}} className="absolute" size={70} />
          <FaBitcoin style={{transform: `rotate(${scrollPosition}deg)`, top: `${(scrollPosition + 340) * 1.4}px`, left: `${(scrollPosition + 130) * 1.1}px`}} className="absolute" size={70} />
          <FaBitcoin style={{transform: `rotate(${scrollPosition}deg)`, top: `${(scrollPosition + 480) * 1.2}px`, left: `${(scrollPosition + 500) * 0.7}px`}} className="absolute" size={70} />
        </div>

        <div>
          <FaBitcoin style={{transform: `rotate(${scrollPosition}deg)`, top: `${(scrollPosition + 70) * 2}px`, right: `${(scrollPosition + 500) * 0.7}px`}} className="absolute" size={70} />
          <FaBitcoin style={{transform: `rotate(${scrollPosition}deg)`, top: `${(scrollPosition + 140) * 1.8}px`, right: `${(scrollPosition + 150) * 1}px`}} className="absolute" size={70} />
          <FaBitcoin style={{transform: `rotate(${scrollPosition}deg)`, top: `${(scrollPosition + 220) * 1.6}px`, right: `${(scrollPosition + 500) * 0.7}px`}} className="absolute" size={70} />
          <FaBitcoin style={{transform: `rotate(${scrollPosition}deg)`, top: `${(scrollPosition + 340) * 1.4}px`, right: `${(scrollPosition + 130) * 1.1}px`}} className="absolute" size={70} />
          <FaBitcoin style={{transform: `rotate(${scrollPosition}deg)`, top: `${(scrollPosition + 480) * 1.2}px`, right: `${(scrollPosition + 500) * 0.7}px`}} className="absolute" size={70} />
        </div>
      </div>
      <img className="z-3 relative w-[1000px] m-auto border-2 border-sky-500" src={dashboard} alt="" />
    </div>
  );
}
