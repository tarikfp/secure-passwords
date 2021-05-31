import { createMuiTheme } from "@material-ui/core/styles";
import { red, cyan, brown, lightBlue } from "@material-ui/core/colors";

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: cyan[500],
      dark: brown[500],
      light: "#bdbdbd",
    },
    secondary: {
      main: cyan[500],
      dark: brown[500],
      light: red[500],
    },
    background: {
      default: cyan[500],
      paper: lightBlue[500],
    },
  },
});

export default defaultTheme;
