import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flex } from "@tremor/react";
import { useState } from "react";
import Register from "./Register";
import { AuthAction } from "../HeaderTypes";
import Login from "./Login";

export default function Authentication({
  refetchUser,
}: {
  refetchUser: () => void;
}) {
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    tab: AuthAction;
  }>({ isOpen: false, tab: AuthAction.LOGIN });

  const onSuccessfulAuthorizationHandler = () => {
    refetchUser();
    setTimeout(() => {
      setDialog({ ...dialog, isOpen: false });
    }, 300);
  };

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
      <Dialog
        onOpenChange={(open: boolean) => setDialog({ ...dialog, isOpen: open })}
        open={dialog.isOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <Tabs
            onValueChange={(value: string) =>
              setDialog({
                ...dialog,
                tab:
                  value == AuthAction.LOGIN
                    ? AuthAction.LOGIN
                    : AuthAction.SIGNUP,
              })
            }
            value={dialog.tab}
            className="mt-6"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value={AuthAction.LOGIN}>Log In</TabsTrigger>
              <TabsTrigger value={AuthAction.SIGNUP}>Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value={AuthAction.LOGIN}>
              <Login onLogin={onSuccessfulAuthorizationHandler} />
            </TabsContent>
            <TabsContent value={AuthAction.SIGNUP}>
              <Register onRegister={onSuccessfulAuthorizationHandler} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
