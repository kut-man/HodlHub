import InteractiveIcons from "@/components/Home/InteractiveIcons/InteractiveIcons";
import dashboard from "../assets/dashboard.png";

export default function Home() {

  return (
    <div className="h-[500vw]">
      <InteractiveIcons/>
      <img
        className="z-3 relative w-[1000px] m-auto border-2 border-sky-500"
        src={dashboard}
        alt=""
      />
    </div>
  );
}
