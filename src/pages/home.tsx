import InteractiveIcons from "@/components/home/interactive-icons/interactive-icons";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/use-auth-context";
import Flex from "@/components/ui/flex.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAction } from "@/components/home/header/header-types";
import AuthenticationDialog from "@/components/home/header/authentication/authentication-dialog";
import Header from "@/components/home/header/header.tsx";
import Footer from "@/components/home/footer/footer.tsx";

export default function Home() {
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    tab: AuthAction;
  }>({ isOpen: false, tab: AuthAction.LOGIN });

  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div>
        <InteractiveIcons />
        <Flex
          flexDirection="col"
          className="relative -top-96 m-auto w-[270px] gap-12 md:w-[800px]"
        >
          <div className="relative py-8 md:px-8">
            <h1 className="relative z-10 w-full text-center text-4xl font-bold md:text-8xl">
              Crypto tracking done right
            </h1>
            <div
              style={{ filter: "blur(60px)" }}
              className="absolute inset-0 bg-[#0182ff] opacity-30"
            ></div>
          </div>
          <p className="text-center font-medium md:w-[410px] md:text-xl">
            Gain valuable crypto insights for streamlined portfolio management
            and enhanced returns
          </p>
          <Button
            onClick={() => {
              isLoggedIn
                ? navigate("/portfolio")
                : setDialog({ tab: AuthAction.LOGIN, isOpen: true });
            }}
            className="p-6 text-xl"
            size="lg"
          >
            Get Started
          </Button>
        </Flex>
        <div
          id="your-element-id"
          className="relative -top-36 m-auto w-[70%] max-w-[1200px] rounded-lg p-2 md:p-4"
          style={{
            backgroundImage:
              "linear-gradient(249deg, #0066fe 0%, rgba(205, 4, 255, .34) 131.14%)",
          }}
        >
          <div className="aspect-625/1681 h-full w-full bg-[url('https://github.com/kut-man/HodlHub/assets/73386100/02581b8c-3c1d-46e8-81ee-54d736378e2e')] bg-contain bg-no-repeat md:aspect-1920/1283 md:bg-[url('https://github.com/kut-man/HodlHub/assets/73386100/8d15a905-4f80-447b-8b11-a377ee85e650')]"></div>
        </div>
        <AuthenticationDialog setDialog={setDialog} dialog={dialog} />
        <></>
      </div>
      <Footer />
    </>
  );
}
