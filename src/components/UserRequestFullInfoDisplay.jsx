import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import { formatDate } from "../utils/formatting";
import { useMainStoreContext } from "../contexts/mainStoreContext";
import DefaultUserFoto from "../assets/images/defaultUserPhoto.png";
import LoadingAnimation from "./LoadingAnimation";
import APP_ROUTES from "../routes/Routes";

const useStyles = makeStyles((theme) => ({
    adoteButton: {
        backgroundColor: "#0088AA",
        color: "#FFFFFF",
        marginLeft: "10px",
    },
    adoteBox: {
        padding: "10px",
        backgroundColor: "#00CCFF",
        color: "#FFFFFF",
        borderRadius: "7px",
        border: "2px",
        height: "fit-content",
        overflow: "auto",
        width: "100%",
        maxWidth: "655px",
        margin: "5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
}));

const UserRequestFullInfoDisplay = observer((props) => {
    const classes = useStyles();
    const { userStore, userRequestStore } = useMainStoreContext();

    let history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [request, setRequest] = useState(null);

    const goBackToList = (event) => {
        event.preventDefault();

        history.push(APP_ROUTES.adopt);
    };

    useEffect(() => {
        setIsLoading(true);
        async function loadRequest() {
            const url = props.match.params.request;

            const request = await userRequestStore.getSpecificUserRequest(url);
            setRequest(request);
        }

        loadRequest();
    }, [props, userRequestStore]);

    if (!request) {
        return null;
    }

    const { user, createdAt, description, pixKey } = request;

    useEffect(() => {
        async function loadProfile() {
            const profile = await userStore.getUserProfile(user.id);
            console.log("🚀 ~ file: UserRequestFullInfoDisplay.jsx ~ line 80 ~ loadProfile ~ profile", profile);
            setUserProfile(profile);

            setIsLoading(false);
        }

        loadProfile();
    }, [userStore, user.id]);

    if (isLoading) {
        return <LoadingAnimation />;
    }

    if (!userProfile) {
        return null;
    }

    const { fullName, linkedIn, bio } = userProfile;
    const userImage = userProfile.photoUrl | DefaultUserFoto;

    return (
        <>
            <Typography variant="h3" gutterBottom>
                Requisição para Adoção
            </Typography>
            <Box className={classes.adoteBox} data-testid="UserRequestFullInfo">
                <Typography variant="h6">{formatDate(createdAt)}</Typography>
                <div
                    data-testid="UsersInfoDiv"
                    style={{
                        backgroundColor: "#0088AA",
                        borderRadius: "7px",
                        width: "96%",
                        padding: "10px",
                        margin: "5px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <img src={userImage} alt={fullName} style={{ width: "150px", borderRadius: "50%" }} />
                    <Typography variant="h4">{fullName}</Typography>
                    {linkedIn && (
                        <a href={linkedIn} style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
                            <LinkedInIcon />
                        </a>
                    )}
                    {bio && (
                        <Typography variant="body1" align="center" gutterBottom>
                            {bio}
                        </Typography>
                    )}
                </div>
                <Typography variant="body1" align="center">
                    {description}
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                    {pixKey}
                </Typography>
                <Box display="flex" alignContent="center" justifyContent="center" height="30px">
                    <Button variant="outlined" onClick={goBackToList}>
                        Voltar
                    </Button>
                    <Button variant="outlined" className={classes.adoteButton}>
                        Adotar
                    </Button>
                </Box>
            </Box>
        </>
    );
});

export default UserRequestFullInfoDisplay;
