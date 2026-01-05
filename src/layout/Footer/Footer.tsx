import { Flex } from "@tremor/react";
import Logo from "../Header/Logo";
import { FaTelegram, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

const socialLinks = {
  LinkedIn: "https://www.linkedin.com/in/kutman-eshenkulov/",
  GitHub: "https://github.com/kut-man",
  Telegram: "https://t.me/kut_man",
  Instagram: "https://www.instagram.com/_.kutman/",
};

export default function Footer() {
  return (
    <>
      <Separator />
      <Flex className="py-10 lg:px-32 md:px-12 px-6">
        <Logo />
        <Flex className="hidden sm:flex w-1/2">
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
        <Flex className="sm:hidden w-2/5">
          <a href={socialLinks.LinkedIn}>
            <FaLinkedin size={22} />
          </a>
          <a href={socialLinks.GitHub}>
            <FaGithub size={22} />
          </a>
          <a href={socialLinks.Telegram}>
            <FaTelegram size={22} />
          </a>
          <a href={socialLinks.Instagram}>
            <FaInstagram size={22} />
          </a>
        </Flex>
      </Flex>
    </>
  );
}
