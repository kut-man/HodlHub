import { avatarValues } from "./AvatarAssets";

type SelectColorAction = {
  type: typeof ACTIONS.SELECTED_COLOR;
  payload: avatarValues["color"];
};

type SelectLogoAction = {
  type: typeof ACTIONS.SELECTED_LOGO;
  payload: avatarValues["logo"];
};

type HoverColorAction = {
  type: typeof ACTIONS.HOVERED_COLOR;
  payload: avatarValues["color"];
};

type HoverLogoAction = {
  type: typeof ACTIONS.HOVERED_LOGO;
  payload: avatarValues["logo"];
};

export type Action =
  | SelectColorAction
  | SelectLogoAction
  | HoverColorAction
  | HoverLogoAction;

export interface ChanageAvatarProps {
  avatarProperties: avatarValues;
  changeProfileAvatar: (avatarProperties: avatarValues) => void;
}

export interface State {
  selectedColor: avatarValues["color"];
  selectedLogo: avatarValues["logo"];
  hoveredColor: avatarValues["color"];
  hoveredLogo: avatarValues["logo"];
}

export interface PortfolioDialogProps {
  avatarProperties: avatarValues;
  changeCurrentDialogPage: () => void;
}

export enum ACTIONS {
  SELECTED_COLOR = "changeSelectedColor",
  SELECTED_LOGO = "changeSelectedLogo",
  HOVERED_COLOR = "changeHoveredColor",
  HOVERED_LOGO = "changeHovereLogo",
}
