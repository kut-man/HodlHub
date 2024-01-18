import { Flex } from "@tremor/react";
import Logo from "../Header/Logo";
import { Label } from "../ui/label";
import { FaTelegram, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <Flex className="border-t py-10 lg:px-32 md:px-12">
      <Logo />
      <Flex className="hidden sm:flex w-1/2">
        <Label className="text-base font-semibold">LinkedIn</Label>
        <Label className="text-base font-semibold">GitHub</Label>
        <Label className="text-base font-semibold">Telegram</Label>
        <Label className="text-base font-semibold">Instagram</Label>
      </Flex>
      <Flex className="sm:hidden w-1/2">
        <FaLinkedin />
        <FaGithub />
        <FaTelegram />
        <FaInstagram />
      </Flex>
    </Flex>
  );
}
