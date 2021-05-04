import { Container } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import useStyles from "./assets/styles/jss/styles";
import StyledAppBar from "./components/StyledAppBar";
import UserRequestForm from "./components/forms/UserRequestForm";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Original Surfer",
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <StyledAppBar />
      <Container className={classes.container}>
        <UserRequestForm />
      </Container>
    </ThemeProvider>
  );
};

export default App;
