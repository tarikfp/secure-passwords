import { SET_THEME } from "../actions/config/types";
import darkTheme from "../theme/DarkTheme";
import defaultTheme, { DEFAULT_THEME } from "../theme/DefaultTheme";

const initialState = {
  theme:
    localStorage.getItem("theme") !== null
      ? localStorage.getItem("theme") === DEFAULT_THEME
        ? defaultTheme
        : darkTheme
      : defaultTheme,
  themeName:
    localStorage.getItem("theme") !== null
      ? localStorage.getItem("theme")
      : DEFAULT_THEME,
};

export default function configStateManagement(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_THEME:
      localStorage.setItem("theme", payload.themeName);
      return {
        ...state,
        theme: payload.theme,
        themeName: payload.themeName,
      };
    default:
      return state;
  }
}
