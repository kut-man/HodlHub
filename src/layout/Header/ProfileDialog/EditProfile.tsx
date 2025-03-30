import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { editProfileAsync } from "./ProfileDialogFunctions";
import { useAuthContext } from "@/lib/useAuthContext";
import { Holder } from "@/lib/AuthContextProvider";
import AvatarWithSkeleton from "@/components/ui/AvatarWithSkeleton";

type FormValues = {
  name: string;
};

export function EditProfile({
  changeCurrentDialogPage,
  onProfileEdit,
  formData,
  onNameChange,
}: {
  changeCurrentDialogPage: () => void;
  onProfileEdit: () => void;
  formData: {
    profileUrl: string;
    profileName: string;
  };
  onNameChange: (name: string) => void;
}) {
  const { data } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { name: formData.profileName } });

  const queryClient = useQueryClient();

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: (data: Holder) => editProfileAsync(data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onSuccess: onProfileEdit,
  });

  const onSubmit: SubmitHandler<FormValues> = ({ name }) =>
    mutate({
      ...data,
      avatar: formData.profileUrl,
      name,
    });

  return (
    <>
      <div className="flex flex-col gap-4 py-4">
        <Label>Profile Avatar</Label>
        <div className="flex items-center justify-between mb-2">
          <AvatarWithSkeleton
            className="h-16 w-16"
            alt="Profile Avatar"
            src={formData.profileUrl}
          />
          <Button onClick={changeCurrentDialogPage}>Change</Button>
        </div>
        <Label htmlFor="name">Profile Name</Label>
        <Input
          {...register("name", {
            required: "Name is empty!",
            maxLength: {
              value: 24,
              message: "Name can not be longer that 24 characters!",
            },
          })}
          className="col-span-3"
          onChange={(e) => {
            onNameChange(e.target.value);
          }}
        />
      </div>
      <DialogFooter className="sm:space-x-0 sm:flex-col flex flex-col gap-6">
        {isError && (
          <Label className="font-normal text-red-600">*{error.message}</Label>
        )}
        {errors.name && (
          <Label className="font-normal text-red-600">
            *{errors.name.message}
          </Label>
        )}
        <Button
          disabled={isPending || errors.name ? true : false}
          onClick={handleSubmit(onSubmit)}
          className="w-full"
          size="lg"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Edit Profile"
          )}
        </Button>
      </DialogFooter>
    </>
  );
}
