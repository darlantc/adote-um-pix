import { BrowserRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";
import { useEffect } from "react";

import { useMainStoreContext } from "./contexts/mainStoreContext";
import { InternalEvents } from "./stores/InternalEventsStore";
import PixBackground from "./assets/images/pix-background.png";
import StyledAppBar from "./components/StyledAppBar";
import Routes from "./routes/Routes";
import LoginStatus from "./models/LoginStatus";
import LoadingAnimation from "./components/LoadingAnimation";
import { displayToastNotification, userLoginNotification } from "./services/ToastifyService";

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

const App = observer(() => {
    const { authStore, internalEventsStore } = useMainStoreContext();
    const { loginStatus } = authStore;
    const { subscribeTo, unsubscribe } = internalEventsStore;

    const classes = useStyles();

    useEffect(() => {
        subscribeTo({
            event: InternalEvents.notification,
            observer: "App",
            callback: displayToastNotification,
        });

        subscribeTo({
            event: InternalEvents.login,
            observer: "App",
            callback: userLoginNotification,
        });

        return () => {
            unsubscribe({ observerToRemove: "App", event: InternalEvents.notification });
            unsubscribe({ observerToRemove: "App", event: InternalEvents.login });
        };
    }, [subscribeTo, unsubscribe]);

    if (loginStatus === LoginStatus.loading) {
        return <LoadingAnimation />;
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
