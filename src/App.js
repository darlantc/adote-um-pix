import { BrowserRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";

import { useMainStoreContext } from "./contexts/mainStoreContext";
import { useState, useEffect } from "react";

import PixBackground from "./assets/images/pix-background.png";
import StyledAppBar from "./components/StyledAppBar";
import Routes from "./routes/Routes";
import LoginStatus from "./models/LoginStatus";
import LoadingAnimation from "./components/LoadingAnimation";

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

const App = observer((admin) => {
    const { authStore, userStore } = useMainStoreContext();
    const { loginStatus, uid } = authStore;

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

    const isAdmin = userProfile?.admin || false;

    const classes = useStyles();

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
