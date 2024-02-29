import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { PortfolioDialogProps } from "./CreatePortfolio";
import { Flex } from "@tremor/react";
import { Label } from "@/components/ui/label";
import { emojis, avatarBackground } from "./AvatarAssets";

export function ChangeAvatar({
  changeCurrentDialogPage,
}: PortfolioDialogProps) {
  return (
    <>
      <Flex className="gap-2" flexDirection="col">
          <div className="rounded-full flex justify-center items-center h-16 w-16 bg-lime-600">
            <span className="text-4xl">🚀</span>
          </div>
        <Flex className="px-10">
          {avatarBackground.map((color) => (
            <div
              className={`w-5 h-5 bg-${color}-600 hover:outline hover:border-2 border-white hover:outline-blue-500 rounded-full`}
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
