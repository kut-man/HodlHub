import React from "react";
import { twMerge } from "tailwind-merge";

type JustifyContent = "start" | "end" | "center" | "between" | "around" | "evenly";
type AlignItems = "start" | "end" | "center" | "baseline" | "stretch";
type FlexDirection = "row" | "col" | "row-reverse" | "col-reverse";

const justifyContentClassNames: Record<JustifyContent, string> = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const alignItemsClassNames: Record<AlignItems, string> = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
  stretch: "items-stretch",
};

const flexDirectionClassNames: Record<FlexDirection, string> = {
  row: "flex-row",
  col: "flex-col",
  "row-reverse": "flex-row-reverse",
  "col-reverse": "flex-col-reverse",
};

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  flexDirection?: FlexDirection;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  children: React.ReactNode;
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const {
    flexDirection = "row",
    justifyContent = "between",
    alignItems = "center",
    children,
    className,
    ...other
  } = props;

  return (
    <div
      ref={ref}
      className={twMerge(
        "flex w-full",
        flexDirectionClassNames[flexDirection],
        justifyContentClassNames[justifyContent],
        alignItemsClassNames[alignItems],
        className,
      )}
      {...other}
    >
      {children}
    </div>
  );
});

Flex.displayName = "Flex";

export default Flex;