import { BrowserRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import {
    createMuiTheme,
    ThemeProvider,
    makeStyles,
} from "@material-ui/core/styles";
import { observer } from "mobx-react";

import { useMainStoreContext } from "./contexts/mainStoreContext";

import PixBackground from "./assets/images/pix-background.png";
import StyledAppBar from "./components/StyledAppBar";
import Routes from "./routes/Routes";
import LoginStatus from "./models/LoginStatus";
import LoadingAnimation from "./components/LoadingAnimation";

const theme = createMuiTheme({
    typography: {
        fontFamily: "Original Surfer",
    },
});

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

const App = observer(() => {
    const { authStore } = useMainStoreContext();
    const { loggedUser, loginStatus } = authStore;
    console.log(
        "🚀 ~ file: Routes.jsx ~ line 24 ~ Routes ~ loginStatus",
        loginStatus
    );
    console.log(
        "🚀 ~ file: Routes.jsx ~ line 24 ~ Routes ~ loggedUser",
        loggedUser
    );

    const classes = useStyles();

    if (loginStatus === LoginStatus.loading) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <LoadingAnimation />
            </div>
        );
    }

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
});

export default App;
