import { BrowserRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";

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
        maxWidth: "1200px",
        backgroundImage: `url(${PixBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "100%",
    },
}));

const App = observer(() => {
    const classes = useStyles();

    const { authStore, internalEventsStore, userStore } = useMainStoreContext();
    const { loginStatus, uid } = authStore;
    const { subscribeTo, unsubscribe } = internalEventsStore;

    const [userProfile, setUserProfile] = useState(null);
    const [isRequesting, setIsRequesting] = useState(false);

    useEffect(() => {
        setIsRequesting(true);

        async function getLoggedUserProfile() {
            const user = await userStore.getUserProfile(uid);
            if (user) {
                setUserProfile(user);
            }

            setIsRequesting(false);
        }

        getLoggedUserProfile();
    }, [setUserProfile, uid, userStore]);

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

    const isAdmin = userProfile?.role === "admin";

    if (loginStatus === LoginStatus.loading || isRequesting) {
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
                <StyledAppBar isAdmin={isAdmin} />
                <Container className={classes.container}>
                    <Routes isAdmin={isAdmin} />
                </Container>
            </ThemeProvider>
        </BrowserRouter>
    );
});

export default App;
