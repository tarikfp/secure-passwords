import { createMuiTheme } from "@material-ui/core/styles";
import { blue, brown } from "@material-ui/core/colors";

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff9800",
      dark: brown[500],
      light: "#f6685e",
    },
    secondary: {
      main: "#b26a00",
      dark: brown[500],
      light: blue[500],
    },
    text: {
      primary: "#ffff",
      secondary: "#ffff",
    },
    background: {
      default: "#212121",
      paper: "#424244",
    },
  },
});
export default darkTheme;
