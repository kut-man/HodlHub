import InteractiveIcons from "@/components/Home/InteractiveIcons/InteractiveIcons";
import dashboard from "../assets/hodl.png";
import { Button } from "@/components/ui/button";
import { Flex } from "@tremor/react";

export default function Home() {
  return (
    <div>
      <InteractiveIcons />
      <Flex
        flexDirection="col"
        className="gap-12 relative -top-96 md:w-[700px] w-[250px] m-auto"
      >
        <div className="md:px-8 py-8 relative">
          <h1 className="relative z-10 text-center md:text-8xl text-4xl font-bold w-full ">
            Crypto taxes done right
          </h1>
          <div
            style={{ filter: "blur(60px)" }}
            className="absolute inset-0 bg-[#0182ff] opacity-30"
          ></div>
        </div>
        <p className="md:text-xl font-medium md:w-[400px] text-center">
          Connect your crypto wallets and exchanges to get your optimized tax
          report in minutes.
        </p>
        <Button className="text-xl p-6" size="lg">
          Get Started
        </Button>
      </Flex>
      <div
        className="relative -top-36 w-[97%] max-w-[1200px] rounded-lg m-auto p-4"
        style={{
          backgroundImage:
            "linear-gradient(249deg, #0066fe 0%, rgba(205, 4, 255, .34) 131.14%)",
        }}
      >
        <img src={dashboard} alt="" />
      </div>
    </div>
  );
}
