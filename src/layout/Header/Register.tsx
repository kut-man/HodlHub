import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Registration successful");
        } else {
          console.error("Registration failed");
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
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
        <CardFooter>
          <Button className="w-full">Create an account</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
