import { SET_THEME } from "./types";

// Set Theme
export const setTheme = (theme) => async (dispatch) => {
  dispatch({
    type: SET_THEME,
    payload: theme,
  });
};
