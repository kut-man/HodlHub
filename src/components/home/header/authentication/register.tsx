import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import type { RegisterFields } from "../header-types";
import { registerUser } from "./authentication-functions";
import VerifyEmail from "./verify-email";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

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
  const { executeRecaptcha } = useGoogleReCaptcha();

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

  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    if (!executeRecaptcha) {
      setRegistrationError("reCAPTCHA not loaded yet");
      return;
    }
    const recaptchaToken = await executeRecaptcha();
    mutate({ ...data, recaptchaToken });
  };

  useEffect(() => {
    document.body.classList.add("pointer-events-auto!");
    return () => {
      document.body.classList.remove("pointer-events-auto");
    };
  }, []);

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
            autoFocus
          />
          {errors.name && (
            <p className="font-normal text-red-600">*{errors.name.message}</p>
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
            type="email"
          />
          {errors.email && (
            <p className="font-normal text-red-600">*{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password", {
              required: "Password is required!",
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters!",
              },
              pattern: {
                value: /^(?=.*\d).*$/,
                message: "Password must contain at least one number!",
              },
            })}
            id="password"
            type="password"
          />
          {errors.password && (
            <p className="font-normal text-red-600">
              *{errors.password.message}
            </p>
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
            <p className="font-normal text-red-600">
              *{errors.repeatPassword.message}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {registrationError ? (
          <p className="font-normal text-red-600">*{registrationError}</p>
        ) : (
          <p className="text-center text-xs leading-relaxed text-slate-500">
            {"This site is protected by reCAPTCHA and the Google "}
            <a
              href="https://policies.google.com/privacy"
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </a>
            {" and "}
            <a
              href="https://policies.google.com/terms"
              className="text-blue-600 hover:underline"
            >
              Terms of Service
            </a>
            {" apply."}
          </p>
        )}
        <Button
          disabled={isPending}
          className="w-full"
          onClick={handleSubmit(onSubmit)}
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Create an account"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
