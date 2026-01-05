import { AvatarValues } from "../PortfolioDialog/AvatarAssets";

type PortfolioIconProps = AvatarValues & {
  size?: "small" | "medium" | "large";
};

const sizeClasses = {
  small: "size-8 text-base pb-px",
  medium: "size-10 text-xl pb-0.5",
  large: "size-16 text-3xl pb-1",
};

export default function PortfolioIcon({
  color,
  avatar,
  size = "medium",
}: PortfolioIconProps) {
  return (
    <div
      className={`${sizeClasses[size]} flex justify-center items-center aspect-square rounded-full m-2 bg-${color}-500`}
    >
      <span>{avatar}</span>
    </div>
  );
}
