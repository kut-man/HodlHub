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

export interface ChanageAvatarProps {
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
  HOVERED_LOGO = "changeHovereLogo",
}

export type PortfolioFields = avatarValues | { name: string };

export type CreatePortfolioProps = (
  data: PortfolioFields,
  onSuccess: () => void,
  onError: React.Dispatch<React.SetStateAction<string>>
) => Promise<void>;
