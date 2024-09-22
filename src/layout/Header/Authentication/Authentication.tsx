import { Button } from "@/components/ui/button";
import { Flex } from "@tremor/react";
import { useState } from "react";
import { AuthAction } from "../HeaderTypes";
import AuthenticationDialog from "./AuthenticationDialog";

export default function Authentication() {
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    tab: AuthAction;
  }>({ isOpen: false, tab: AuthAction.LOGIN });

  return (
    <>
      <Flex className="gap-2 justify-end w-fit">
        <Button
          onClick={() => setDialog({ tab: AuthAction.LOGIN, isOpen: true })}
          size="sm"
          variant="outline"
        >
          Log In
        </Button>
        <Button
          onClick={() => setDialog({ tab: AuthAction.SIGNUP, isOpen: true })}
          size="sm"
        >
          Sign Up
        </Button>
      </Flex>
      <AuthenticationDialog setDialog={setDialog} dialog={dialog} />
    </>
  );
}
