import { Flex } from "@tremor/react";
import Logo from "../Header/Logo";
import { FaTelegram, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <Flex className="border-t py-10 lg:px-32 md:px-12 px-6">
      <Logo />
      <Flex className="hidden sm:flex w-1/2">
        <a href="https://www.linkedin.com/in/kutman-eshenkulov/" className="text-base font-semibold">
          LinkedIn
        </a>
        <a href="" className="text-base font-semibold">
          GitHub
        </a>
        <a href="" className="text-base font-semibold">
          Telegram
        </a>
        <a href="" className="text-base font-semibold">
          Instagram
        </a>
      </Flex>
      <Flex className="sm:hidden w-2/5">
        <a href="">
          <FaLinkedin size={22} />
        </a>
        <a href="">
          <FaGithub size={22} />
        </a>
        <a href="">
          <FaTelegram size={22} />
        </a>
        <a href="">
          <FaInstagram size={22} />
        </a>
      </Flex>
    </Flex>
  );
}
