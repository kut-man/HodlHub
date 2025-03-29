import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Register from "./Register";
import { AuthAction } from "../HeaderTypes";
import Login from "./Login";
import { useAuthContext } from "@/lib/useAuthContext";

interface AuthenticationDialogProps {
  setDialog: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      tab: AuthAction;
    }>
  >;
  dialog: {
    isOpen: boolean;
    tab: AuthAction;
  };
}

export default function AuthenticationDialog({
  setDialog,
  dialog,
}: AuthenticationDialogProps) {
  const { refetchUser } = useAuthContext();

  const onSuccessfulAuthorizationHandler = () => {
    refetchUser();
    setDialog({ ...dialog, isOpen: false });
  };

  return (
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
  );
}
