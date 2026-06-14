import { Button } from "@/components/ui/button";
import Flex from "@/components/ui/flex.tsx";
import { useState } from "react";
import { AuthAction } from "../header-types";
import AuthenticationDialog from "./authentication-dialog";

export default function Authentication() {
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    tab: AuthAction;
  }>({ isOpen: false, tab: AuthAction.LOGIN });

  return (
    <>
      <Flex className="w-fit justify-end gap-2">
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
