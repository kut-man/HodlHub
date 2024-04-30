import { useState } from "react";
import { Avatar, AvatarImage } from "./avatar";
import { Skeleton } from "./skeleton";

type AvatarWithSceletonProps = {
  className: string;
  alt: string;
  src: string;
};

export default function AvatarWithSceleton({
  className,
  alt,
  src,
}: AvatarWithSceletonProps) {
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
  return (
    <Avatar onLoad={() => setIsAvatarLoaded(true)} className={className}>
      {!isAvatarLoaded && <Skeleton className="w-full h-full" />}
      <AvatarImage alt={alt} src={src} />
    </Avatar>
  );
}
