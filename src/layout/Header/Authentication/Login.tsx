import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFields } from "../HeaderTypes";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { loginUser } from "./AuthenticationFunctions";
import { toast } from "sonner";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>();
  const [loginError, setLoginError] = useState("");

  const onLoginHandler = () => {
    toast.success("Login successful!");
    onLogin();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFields) =>
      loginUser(data, onLoginHandler, setLoginError),
  });

  const onSubmit: SubmitHandler<LoginFields> = (data) => {
    mutate(data);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address!",
                },
              })}
              id="email"
              type="email"
              autoFocus
            />
            {errors.email && (
              <Label className="font-normal text-red-600">
                *{errors.email.message}
              </Label>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 6,
                  message: "Password should be at least 6 characters!",
                },
              })}
              id="password"
              type="password"
            />
            {errors.password && (
              <Label className="font-normal text-red-600">
                *{errors.password.message}
              </Label>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          {loginError && (
            <Label className="font-normal text-red-600 break-all">*{loginError}</Label>
          )}
          <Button data-testid="login-button" disabled={isPending} className="w-full">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Log In"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
