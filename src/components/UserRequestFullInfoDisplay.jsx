import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { observer } from "mobx-react";

import { formatDate } from "../utils/formatting";
import { useMainStoreContext } from "../contexts/mainStoreContext";
import Default from "../assets/images/defaultUserPhoto.png";
import { useEffect } from "react";

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
    useEffect(() => {
        userFullInfo = getUserProfile(user.id);
        console.log("🚀 ~ file: UserRequestFullInfoDisplay.jsx ~ line 44 ~ useEffect ~ userFullInfo", userFullInfo);
    });

    const classes = useStyles();

    const { userStore } = useMainStoreContext();
    const { getUserProfile } = userStore;

    let userFullInfo = {};

    const { user, createdAt, description, pixKey } = request;

    const { photoUrl, fullName, linkedIn, bio } = userFullInfo;
    console.log(
        "🚀 ~ file: UserRequestFullInfoDisplay.jsx ~ line 44 ~ UserRequestFullInfoDisplay ~ userFullInfo",
        userFullInfo
    );

    const userImage = photoUrl | Default;

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
                <a href={linkedIn} style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
                    <LinkedInIcon />
                </a>
                <Typography variant="body1" align="center" gutterBottom>
                    {bio}
                </Typography>
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
