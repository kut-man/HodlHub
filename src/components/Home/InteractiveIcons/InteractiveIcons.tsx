import { useEffect, useState } from "react";
import interactiveCoinIconData from "./asstest";

const SCROLL_LIMIT = 600;

const calculateTranslate = (position: number[], scrollX: number, idx:number) => {
  const percent = scrollX / SCROLL_LIMIT;
  const moveY = position[0] + (230 - position[0]) * percent;
  const moveX = position[1] + (50 - position[1]) * percent;
  return { top: `${moveY}%`, [idx > 4 ? "left" : "right"]: `${moveX}%` };
};

export default function InteractiveIcons() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    let position = Math.round(window.scrollY);
    if (position > SCROLL_LIMIT) position = SCROLL_LIMIT;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative top-24 w-11/12 max-w-[1200px] m-auto h-[500px]">
      <div>
        {interactiveCoinIconData.map((obj, idx) =>
          obj.coinIcon({
            key: idx,
            className: "absolute " + obj.size ,
            style: {
              ...calculateTranslate(obj.position, scrollPosition, idx),
              transformOrigin: idx > 4 ? "left" : "right",
              transform: `rotate(${scrollPosition}deg) translateX(${
                idx > 4 ? "-" : ""
              }50%)`,
            },
          })
        )}
      </div>
    </div>
  );
}
