import { useState } from "react";
import { Avatar, AvatarImage } from "./avatar";
import { Skeleton } from "./skeleton";

type AvatarWithSkeletonProps = {
  className: string;
  alt: string;
  src: string;
};

export default function AvatarWithSkeleton({
  className,
  alt,
  src,
}: AvatarWithSkeletonProps) {
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
  return (
    <Avatar onLoad={() => setIsAvatarLoaded(true)} className={className}>
      {!isAvatarLoaded && <Skeleton className="h-full w-full" />}
      <AvatarImage alt={alt} src={src} />
    </Avatar>
  );
}
