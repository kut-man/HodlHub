import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import Flex from "@/components/ui/flex.tsx";
import { Label } from "@/components/ui/label";
import { emojis, avatarBackground } from "./AvatarAssets";
import { useReducer } from "react";
import {
  ACTIONS,
  type Action,
  type ChangeAvatarProps,
  type State,
} from "./PortfolioDialogInterfaces";
import PortfolioIcon from "../PortfolioList/PortfolioIcon";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.SELECTED_COLOR:
      return { ...state, selectedColor: action.payload };
    case ACTIONS.SELECTED_LOGO:
      return { ...state, selectedLogo: action.payload };
    case ACTIONS.HOVERED_COLOR:
      return { ...state, hoveredColor: action.payload };
    case ACTIONS.HOVERED_LOGO:
      return { ...state, hoveredLogo: action.payload };
    default:
      return state;
  }
};

export function ChangeAvatar({
  changeProfileAvatar,
  iconProperties,
}: ChangeAvatarProps) {
  const initialState: State = {
    selectedColor: iconProperties.color,
    selectedLogo: iconProperties.avatar,
    hoveredColor: iconProperties.color,
    hoveredLogo: iconProperties.avatar,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <Flex className="gap-2" flexDirection="col">
        <PortfolioIcon color={state.hoveredColor} avatar={state.hoveredLogo} />
        <Flex className="max-w-72">
          {avatarBackground.map((color) => (
            <div
              key={color}
              onClick={() =>
                dispatch({ type: ACTIONS.SELECTED_COLOR, payload: color })
              }
              onMouseEnter={() =>
                dispatch({ type: ACTIONS.HOVERED_COLOR, payload: color })
              }
              onMouseLeave={() =>
                dispatch({
                  type: ACTIONS.HOVERED_COLOR,
                  payload: state.selectedColor,
                })
              }
              data-selected={state.selectedColor === color}
              className={`h-5 w-5 bg-${color}-600 rounded-full border-white hover:border-2 hover:outline-blue-500 hover:outline-solid data-[selected=true]:border-2 data-[selected=true]:outline-blue-500 data-[selected=true]:outline-solid`}
            ></div>
          ))}
        </Flex>
        <div className="mt-6 w-full">
          <Label className="text-gray-500">
            How are you feeling about this portfolio?
          </Label>
          <div className="flex flex-wrap justify-between gap-y-6">
            {emojis.map((emoji) => (
              <span
                onClick={() =>
                  dispatch({ type: ACTIONS.SELECTED_LOGO, payload: emoji })
                }
                onMouseEnter={() =>
                  dispatch({ type: ACTIONS.HOVERED_LOGO, payload: emoji })
                }
                onMouseLeave={() =>
                  dispatch({
                    type: ACTIONS.HOVERED_LOGO,
                    payload: state.selectedLogo,
                  })
                }
                key={emoji}
                className="cursor-pointer text-4xl hover:scale-110"
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </Flex>
      <DialogFooter>
        <Button
          onClick={() =>
            changeProfileAvatar({
              color: state.selectedColor,
              avatar: state.selectedLogo,
            })
          }
          className="w-full"
          size="lg"
          type="submit"
        >
          Save
        </Button>
      </DialogFooter>
    </>
  );
}
