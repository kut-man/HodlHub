import { AvatarValues } from "../PortfolioDialog/AvatarAssets";

type PortfolioIconProps = AvatarValues & {
  size?: "small" | "medium" | "large";
  className?: string;
};

const sizeClasses = {
  small: "size-6 text-base",
  medium: "size-10 text-xl pb-px",
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
      className={`${sizeClasses[size]} flex justify-center items-center aspect-square rounded-full m-2 bg-${color}-500 ${className}`}
    >
      <span>{avatar}</span>
    </div>
  );
}
