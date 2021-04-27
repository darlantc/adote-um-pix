import { Typography, AppBar, Toolbar } from "@material-ui/core";
import {
  styled,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

import Logo from "./components/Logo";

const PixAppBar = styled(AppBar)({
  background: "linear-gradient(45deg, #FFF 30%, #000000 90%)",
  color: "#000000",
  height: 60,
});

const theme = createMuiTheme({
  typography: {
    fontFamily: "Original Surfer",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <PixAppBar position="relative">
        <Toolbar>
          <Logo />
          <Typography variant="h4">Adote Um Pix</Typography>
        </Toolbar>
      </PixAppBar>
    </ThemeProvider>
  );
};

export default App;
