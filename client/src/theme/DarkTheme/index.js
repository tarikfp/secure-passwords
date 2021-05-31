import { createMuiTheme } from "@material-ui/core/styles";
import {
  blue,
  red,
  cyan,
  brown,
  lightBlue,
  orange,
} from "@material-ui/core/colors";

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: red[500],
      dark: brown[500],
      light: "#bdbdbd",
    },
    secondary: {
      main: cyan[500],
      dark: brown[500],
      light: blue[500],
    },
    background: {
      default: "#1b1b1b",
      paper: "#42424",
    },
  },
});
export default darkTheme;
