import InteractiveIcons from "@/components/Home/InteractiveIcons/InteractiveIcons";
import { Button } from "@/components/ui/button";
import AuthenticationDialog from "@/layout/Header/Authentication/AuthenticationDialog";
import { AuthAction } from "@/layout/Header/HeaderTypes";
import { useAuthContext } from "@/lib/useAuthContext";
import { Flex } from "@tremor/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    tab: AuthAction;
  }>({ isOpen: false, tab: AuthAction.LOGIN });

  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div>
      <InteractiveIcons />
      <Flex
        flexDirection="col"
        className="gap-12 relative -top-96 md:w-[800px] w-[270px] m-auto"
      >
        <div className="md:px-8 py-8 relative">
          <h1 className="relative z-10 text-center md:text-8xl text-4xl font-bold w-full ">
            Crypto tracking done right
          </h1>
          <div
            style={{ filter: "blur(60px)" }}
            className="absolute inset-0 bg-[#0182ff] opacity-30"
          ></div>
        </div>
        <p className="md:text-xl font-medium md:w-[410px] text-center">
          Gain valuable crypto insights for streamlined portfolio management and
          enhanced returns
        </p>
        <Button
          onClick={() => {
            isLoggedIn
              ? navigate("/portfolio")
              : setDialog({ tab: AuthAction.LOGIN, isOpen: true });
          }}
          className="text-xl p-6"
          size="lg"
        >
          Get Started
        </Button>
      </Flex>
      <div
        id="your-element-id"
        className="relative -top-36 w-[70%] max-w-[1200px] rounded-lg m-auto p-2 md:p-4"
        style={{
          backgroundImage:
            "linear-gradient(249deg, #0066fe 0%, rgba(205, 4, 255, .34) 131.14%)",
        }}
      >
        <div
          className="md:aspect-[1920/1283] aspect-[625/1681] w-full h-full bg-no-repeat bg-contain bg-[url('https://github.com/kut-man/HodlHub/assets/73386100/02581b8c-3c1d-46e8-81ee-54d736378e2e')] 
        md:bg-[url('https://github.com/kut-man/HodlHub/assets/73386100/8d15a905-4f80-447b-8b11-a377ee85e650')]"
        ></div>
      </div>
      <AuthenticationDialog setDialog={setDialog} dialog={dialog} />
    </div>
  );
}
