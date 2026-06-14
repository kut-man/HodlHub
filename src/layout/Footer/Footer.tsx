import Flex from "@/components/ui/flex.tsx";
import Logo from "../header/logo";
import { Separator } from "@/components/ui/separator";

const socialLinks = {
  LinkedIn: "https://www.linkedin.com/in/kutman-eshenkulov/",
  GitHub: "https://github.com/kut-man",
};

export default function Footer() {
  return (
    <>
      <Separator orientation="horizontal" />
      <Flex className="px-6 py-10 md:px-12 lg:px-32">
        <Logo />
        <Flex className="w-2/5 md:w-1/5">
          {Object.keys(socialLinks).map((value) => (
            <a
              target="_blank"
              key={value}
              href={socialLinks[value as keyof typeof socialLinks]}
              className="text-base font-semibold"
            >
              {value}
            </a>
          ))}
        </Flex>
      </Flex>
    </>
  );
}
