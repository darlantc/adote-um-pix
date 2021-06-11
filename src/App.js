import { BrowserRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";

import PixBackground from "./assets/images/pix-background.png";
import StyledAppBar from "./components/StyledAppBar";
import Routes from "./routes/Routes";
import { theme } from "./assets/jss/styles.js";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4, 2, 4),
        maxWidth: "700px",
        backgroundImage: `url(${PixBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "100%",
    },
}));

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
