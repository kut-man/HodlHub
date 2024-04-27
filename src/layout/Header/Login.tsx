import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flex } from "@tremor/react";
import { useState } from "react";

enum AuthAction {
  LOGIN = "login",
  SIGNUP = "signup",
}

export default function Login() {
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
              <Card>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value={AuthAction.SIGNUP}>
              <Card>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
