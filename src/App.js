import { Typography, AppBar, Toolbar } from "@material-ui/core";
import {
  styled,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

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

const classes = {
  logo: {
    margin: 10,
    width: 40,
    height: 40,
    objectFit: "cover",
  },
};

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <PixAppBar position="relative">
          <Toolbar>
            <img
              src="./assets/utility/adote-um-pix-logo.svg"
              className={classes.logo}
              alt="logo"
            />
            <Typography variant="h4">Adote Um Pix</Typography>
          </Toolbar>
        </PixAppBar>
      </ThemeProvider>
    </div>
  );
};

export default App;
