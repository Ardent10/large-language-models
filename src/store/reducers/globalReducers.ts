/* eslint-disable @typescript-eslint/no-explicit-any */
import { initialState } from ".";

type State = {
  [key: string]: any;
};
type Action = {
  type: string;
  payload: object;
};

const globalReducers = (state: State, action: Action) => {
  const { type } = action;
  switch (type) {
    case "toggleSideBar": {
      return {
        ...state,
        openCloseSideBar: action.payload,
      };
    }
    case "setToggleSnackbar": {
      return {
        ...state,
        toggleSnackbar: {
          ...action.payload,
        },
      };
    }
    case "setUserProfile": {
      return {
        ...state,
        userProfile: action.payload,
      };
    }
    case "setIsLoading": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "setAllCardModels": {
      return {
        ...state,
        cardModels: action.payload,
      };
    }
    case "setParentModels": {
      return {
        ...state,
        parentModels: action.payload,
      };
    }
    case "setSubModels": {
      return {
        ...state,
        subModels: action.payload,
      };
    }

    case "logout": {
      return initialState;
    }

    default:
      return state;
  }
};

export { globalReducers };
