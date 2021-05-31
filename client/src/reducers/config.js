import { SET_THEME } from "../actions/config/types";
import defaultTheme from "../theme/DefaultTheme";

const initialState = {
  currentTheme: defaultTheme,
};

export default function configStateManagement(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_THEME:
      return {
        ...state,
        currentTheme: payload,
      };
    default:
      return state;
  }
}
