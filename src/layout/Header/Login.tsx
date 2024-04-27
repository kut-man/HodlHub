import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flex } from "@tremor/react";
import { useState } from "react";
import Register from "./Register";
import { AuthAction } from "./HeaderTypes";


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
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email"/>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Log In</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value={AuthAction.SIGNUP}>
              <Register onRegister={() => setDialog({...dialog, isOpen: false})}/>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
