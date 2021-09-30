import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";

import { formatDate } from "../utils/formatting";
import { useMainStoreContext } from "../contexts/mainStoreContext";
import DefaultUserFoto from "../assets/images/defaultUserPhoto.png";
import LoadingAnimation from "./LoadingAnimation";

const useStyles = makeStyles((theme) => ({
    adoteButton: {
        backgroundColor: "#0088AA",
        color: "#FFFFFF",
        marginLeft: "10px",
    },
    adoteBox: {
        backgroundColor: "#00CCFF",
        color: "#FFFFFF",
        borderRadius: "7px",
        border: "2px",
        height: "fit-content",
        width: "100%",
        padding: "10px",
        maxWidth: "655px",
        margin: "5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
}));

const UserRequestFullInfoDisplay = observer(({ request, close }) => {
    const classes = useStyles();
    const { userStore } = useMainStoreContext();

    const { user, createdAt, description, pixKey } = request;

    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState(null);



    useEffect(() => {
        setIsLoading(true);
        async function loadUserProfile() {
            const response = await userStore.getUserProfile(user.id);
            setUserProfile(response);
            setIsLoading(false);
        }

        loadUserProfile();
    }, [userStore, user.id]);

    if (isLoading) {
        return <LoadingAnimation />;
    }

    if (!userProfile) {
        return null;
    }

        console.log("userProfile", userProfile)


    const fullName = userProfile.fullName;
    const linkedIn = userProfile.linkedIn;
    const bio = userProfile.bio;
    const userImage = userProfile.photoUrl | DefaultUserFoto;

    return (
        <Box className={classes.adoteBox} data-testid="UserRequestFullInfo">
            <Typography variant="h6">{formatDate(createdAt)}</Typography>
            <div
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
                <Button variant="outlined" onClick={close}>
                    Voltar
                </Button>
                <Button variant="outlined" className={classes.adoteButton}>
                    Adotar
                </Button>
            </Box>
        </Box>
    );
});

export default UserRequestFullInfoDisplay;
