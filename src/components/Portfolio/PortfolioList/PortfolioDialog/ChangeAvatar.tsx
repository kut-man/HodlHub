import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { PortfolioDialogProps } from "./CreatePortfolio";
import { Flex } from "@tremor/react";
import { Label } from "@/components/ui/label";
import { emojis, avatarBackground } from "./AvatarAssets";
import { useState } from "react";

export function ChangeAvatar({
  changeCurrentDialogPage,
}: PortfolioDialogProps) {
  const [selectedAvatartProperties, setSelectedAvatarProperties] = useState({
    color:
      avatarBackground[Math.floor(Math.random() * avatarBackground.length)],
    logo: emojis[Math.floor(Math.random() * emojis.length)],
  });
  const [hoveredAvatarProperties, setHoveredAvatarProperties] = useState({
    color: "",
    logo: "",
  });

  return (
    <>
      <Flex className="gap-2" flexDirection="col">
        <div
          className={`rounded-full flex justify-center items-center h-16 w-16 bg-${
            hoveredAvatarProperties.color
              ? hoveredAvatarProperties.color
              : selectedAvatartProperties.color
          }-500`}
        >
          <span className="text-4xl">
            {hoveredAvatarProperties.logo
              ? hoveredAvatarProperties.logo
              : selectedAvatartProperties.logo}
          </span>
        </div>
        <Flex className="max-w-72">
          {avatarBackground.map((color) => (
            <div
              onClick={() =>
                setSelectedAvatarProperties((prev) => ({
                  ...prev,
                  color,
                }))
              }
              onMouseEnter={() =>
                setHoveredAvatarProperties((prev) => ({ ...prev, color }))
              }
              onMouseLeave={() =>
                setHoveredAvatarProperties((prev) => ({ ...prev, color: "" }))
              }
              data-selected={selectedAvatartProperties.color === color}
              className={`w-5 h-5 bg-${color}-600 hover:outline hover:border-2 hover:outline-blue-500 border-white rounded-full 
              data-[selected=true]:outline data-[selected=true]:border-2 data-[selected=true]:outline-blue-500`}
            ></div>
          ))}
        </Flex>
        <div className="mt-6 w-full">
          <Label className="text-gray-500">
            How are you feeling about this portfolio?
          </Label>
          <div className="flex gap-y-6 flex-wrap justify-between">
            {emojis.map((emoji) => (
              <span
                onClick={() =>
                  setSelectedAvatarProperties((prev) => ({
                    ...prev,
                    logo: emoji,
                  }))
                }
                onMouseEnter={() =>
                  setHoveredAvatarProperties((prev) => ({
                    ...prev,
                    logo: emoji,
                  }))
                }
                onMouseLeave={() =>
                  setHoveredAvatarProperties((prev) => ({ ...prev, logo: "" }))
                }
                key={emoji}
                className="cursor-pointer hover:scale-110 text-4xl"
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </Flex>
      <DialogFooter>
        <Button variant="secondary" onClick={changeCurrentDialogPage}>
          Cancel
        </Button>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </>
  );
}
