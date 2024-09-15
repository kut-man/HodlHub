import { avatarValues } from "./AvatarAssets";

type SelectColorAction = {
  type: typeof ACTIONS.SELECTED_COLOR;
  payload: avatarValues["color"];
};

type SelectLogoAction = {
  type: typeof ACTIONS.SELECTED_LOGO;
  payload: avatarValues["avatar"];
};

type HoverColorAction = {
  type: typeof ACTIONS.HOVERED_COLOR;
  payload: avatarValues["color"];
};

type HoverLogoAction = {
  type: typeof ACTIONS.HOVERED_LOGO;
  payload: avatarValues["avatar"];
};

export type Action =
  | SelectColorAction
  | SelectLogoAction
  | HoverColorAction
  | HoverLogoAction;

export interface ChangeAvatarProps {
  iconProperties: avatarValues;
  changeProfileAvatar: (avatarProperties: avatarValues) => void;
}

export interface State {
  selectedColor: avatarValues["color"];
  selectedLogo: avatarValues["avatar"];
  hoveredColor: avatarValues["color"];
  hoveredLogo: avatarValues["avatar"];
}

export interface PortfolioDialogProps {
  iconProperties: avatarValues;
  changeCurrentDialogPage: () => void;
  onPortfolioCreate: () => void;
}

export enum ACTIONS {
  SELECTED_COLOR = "changeSelectedColor",
  SELECTED_LOGO = "changeSelectedLogo",
  HOVERED_COLOR = "changeHoveredColor",
  HOVERED_LOGO = "changeHoverLogo",
}

export type CreatePortfolioProps = (
  data: Pick<PortfolioFields, "name" | "avatar" | "color">,
) => Promise<void>;

export type Holding = {
  ticker: string;
  name: string;
  quantity: number;
  averagePurchasePrice: number;
  currentPrice: number;
  totalValue: number;
  oneHourChangePercent: number;
  yesterdayChangePercent: number;
  sevenDaysChangePercent: number;
  plValue: number;
  plPercentValue: number;
};

type Statistics = {
  totalPlValue: number;
  totalPlPercentValue: number;
  allTotalBuySpent: number;
  bestPlValue: number;
  bestPlPercentValue: number;
  bestName: string;
  bestTicker: string;
  worstPlValue: number;
  worstPlPercentValue: number;
  worstName: string;
  worstTicker: string;
};

export type PortfolioFields = avatarValues & {
  id: number;
  name: string;
  totalAmount: number;
  valueChange24h: number;
  valueChangePercentage24h: number;
  holdings: Holding[];
  statistics: Statistics;
};

