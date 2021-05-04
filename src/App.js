import { BrowserRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import useStyles from "./assets/styles/jss/styles";
import StyledAppBar from "./components/StyledAppBar";
import Routes from "./routes/Routes";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Original Surfer",
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <StyledAppBar />
        <Container className={classes.container}>
          <Routes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
