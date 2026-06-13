import type { AvatarValues } from "../PortfolioDialog/AvatarAssets";
import { twMerge } from "tailwind-merge";

type PortfolioIconProps = AvatarValues & {
  size?: "small" | "medium" | "large";
  className?: string;
};

const sizeClasses = {
  small: "size-6 text-base",
  medium: "size-8 text-xl",
  large: "size-16 text-3xl pb-0.5",
};

export default function PortfolioIcon({
  color,
  avatar,
  size = "medium",
  className,
}: PortfolioIconProps) {
  return (
    <div
      style={{ backgroundColor: color }}
      className={twMerge(
        `${sizeClasses[size]} m-2 flex aspect-square items-center justify-center rounded-full`,
        className
      )}
    >
      <span>{avatar}</span>
    </div>
  );
}
