import { AvatarValues } from "./AvatarAssets";

type SelectColorAction = {
  type: typeof ACTIONS.SELECTED_COLOR;
  payload: AvatarValues["color"];
};

type SelectLogoAction = {
  type: typeof ACTIONS.SELECTED_LOGO;
  payload: AvatarValues["avatar"];
};

type HoverColorAction = {
  type: typeof ACTIONS.HOVERED_COLOR;
  payload: AvatarValues["color"];
};

type HoverLogoAction = {
  type: typeof ACTIONS.HOVERED_LOGO;
  payload: AvatarValues["avatar"];
};

export type Action =
  | SelectColorAction
  | SelectLogoAction
  | HoverColorAction
  | HoverLogoAction;

export interface ChangeAvatarProps {
  iconProperties: AvatarValues;
  changeProfileAvatar: (avatarProperties: AvatarValues) => void;
}

export interface State {
  selectedColor: AvatarValues["color"];
  selectedLogo: AvatarValues["avatar"];
  hoveredColor: AvatarValues["color"];
  hoveredLogo: AvatarValues["avatar"];
}

export interface PortfolioDialogProps {
  iconProperties: AvatarValues;
  changeCurrentDialogPage: () => void;
  onPortfolioCreate: () => void;
  editPortfolio?: boolean;
}

export enum ACTIONS {
  SELECTED_COLOR = "changeSelectedColor",
  SELECTED_LOGO = "changeSelectedLogo",
  HOVERED_COLOR = "changeHoveredColor",
  HOVERED_LOGO = "changeHoverLogo",
}

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

export type PortfolioFields = AvatarValues & {
  id: number;
  name: string;
  totalAmount: number;
  valueChange24h: number;
  valueChangePercentage24h: number;
  holdings: Holding[];
  statistics: Statistics;
};
