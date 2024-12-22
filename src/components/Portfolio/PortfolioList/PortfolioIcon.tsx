import { avatarValues } from "../PortfolioDialog/AvatarAssets";

type PortfolioIconProps = avatarValues & {
  style?: React.CSSProperties;
  size?: "small" | "medium" | "large";
};

const sizes = {
  small: "2xl",
  medium: "3xl",
  large: "4xl",
};

export default function PortfolioIcon({
  color,
  avatar,
  style,
  size = "large",
}: PortfolioIconProps) {
  return (
    <div
      style={style}
      className={`text-${sizes[size]} flex justify-center items-center aspect-square rounded-full m-2 h-16 w-16 bg-${color}-500`}
    >
        <span className="mb-1">
        {avatar}
        </span>
    </div>
  );
}
