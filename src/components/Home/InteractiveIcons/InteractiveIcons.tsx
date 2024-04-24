import { useEffect, useState } from "react";
import interactiveCoinIconData from "./asstest";

const SCROLL_LIMIT = 600;

const calculateTranslate = (position: number, scrollX: number) => {
  const percent = scrollX / SCROLL_LIMIT;
  const result = position + (50 - position) * percent;
  return result;
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
    <div className="relative my-96 w-full max-w-[1200px] m-auto h-[500px]">
      <div>
        {interactiveCoinIconData.map((obj, idx) =>
          obj.coinIcon({
            key: idx,
            size: obj.size,
            className: "absolute",
            style: {
              transformOrigin: idx > 4 ? "left" : "right",
              transitionDuration: "50ms",
              transform: `rotate(${scrollPosition}deg) translateX(${
                idx > 4 ? "-" : ""
              }50%)`,
              top: `${obj.position[0]}%`,
              [idx > 4 ? "left" : "right"]: `${calculateTranslate(
                obj.position[1],
                scrollPosition
              )}%`,
            },
          })
        )}
      </div>
    </div>
  );
}
