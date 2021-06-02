import { SET_THEME } from "./types";

// Set Theme
export const setTheme = (theme, themeName) => async (dispatch) => {
  dispatch({
    type: SET_THEME,
    payload: { theme, themeName },
  });
};
