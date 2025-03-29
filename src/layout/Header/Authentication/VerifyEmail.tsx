import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { LoginFields, VerifyEmailFields } from "../HeaderTypes";
import { verifyEmail } from "./AuthenticationFunctions";
import { toast } from "sonner";

export default function VerifyEmail({
  email,
  password,
  onVerify,
}: LoginFields & {
  onVerify: () => void;
}) {
  const [verificationError, setVerificationError] = useState("");

  const onVerifyEmail = () => {
    toast.success("Registration successful!", {
      description:
        "Your email has been verified, and you have been logged in automatically.",
    });
    onVerify();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: VerifyEmailFields) => {
      return verifyEmail(data, onVerifyEmail, setVerificationError);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Your Email</CardTitle>
        <CardDescription>
          {`We already send a code to `}
          <b>{email}</b>
          {` , please check your inbox and insert the code in form below to verify your email.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 flex justify-center items-center">
        <InputOTP
          pattern={REGEXP_ONLY_DIGITS}
          disabled={isPending}
          onComplete={(code) => {
            mutate({ email, code, password });
          }}
          maxLength={6}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {verificationError && (
          <Label className="font-normal text-red-600">
            *{verificationError}
          </Label>
        )}
      </CardFooter>
    </Card>
  );
}
