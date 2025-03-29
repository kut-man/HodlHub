import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { RegisterFields } from "../HeaderTypes";
import { registerUser } from "./AuthenticationFunctions";
import VerifyEmail from "./VerifyEmail";

export default function Register({ onRegister }: { onRegister: () => void }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<RegisterFields>();

  const [registrationError, setRegistrationError] = useState("");
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: RegisterFields) => {
      delete (data as { repeatPassword?: string }).repeatPassword;
      return registerUser(
        data,
        () => setShowEmailVerification(true),
        setRegistrationError
      );
    },
  });

  const onSubmit: SubmitHandler<RegisterFields> = (data) => {
    mutate(data);
  };

  if (showEmailVerification) {
    return (
      <VerifyEmail
        email={getValues("email")}
        password={getValues("password")}
        onVerify={onRegister}
      />
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              {...register("name", {
                required: "Name is required!",
                minLength: {
                  value: 2,
                  message: "Name should be at least 6 characters!",
                },
              })}
              id="name"
              type="text"
            />
            {errors.name && (
              <Label className="font-normal text-red-600">
                *{errors.name.message}
              </Label>
            )}
          </div>
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
          <div className="space-y-1">
            <Label htmlFor="repeatPassword">Repeat Password</Label>
            <Input
              {...register("repeatPassword", {
                required: "Repeat Password is required!",
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match!";
                  }
                },
              })}
              id="repeatPassword"
              type="password"
            />
            {errors.repeatPassword && (
              <Label className="font-normal text-red-600">
                *{errors.repeatPassword.message}
              </Label>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          {registrationError && (
            <Label className="font-normal text-red-600">
              *{registrationError}
            </Label>
          )}
          <Button disabled={isPending} className="w-full">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create an account"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
