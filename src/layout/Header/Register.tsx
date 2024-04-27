import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { ReactNode, useState } from "react";
import { ErrorResponse, FormFields } from "./HeaderTypes";

export default function Register({ onRegister }: { onRegister: () => void }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>();

  const [registrationError, setRegistrationError] = useState<ReactNode[]>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormFields) => {
      try {
        const response = await fetch("http://localhost:8080/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          onRegister();
        } else {
          response.json().then(({ errors }: ErrorResponse) =>
            errors.map((obj, idx) =>
              setRegistrationError([
                <Label key={idx} className="font-normal text-red-600">
                  *{obj.value}
                </Label>,
              ])
            )
          );
          console.error("Registration failed");
        }
      } catch (error) {
        setRegistrationError([
          <Label className="font-normal text-red-600">
            Something went wrong!
          </Label>,
        ]);
        console.error("Error during registration:", error);
      }
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    mutate(data);
  };

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
          {registrationError && [...registrationError]}
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
