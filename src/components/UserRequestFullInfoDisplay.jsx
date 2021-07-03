import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";

import { formatDate } from "../utils/formatting";
import { useMainStoreContext } from "../contexts/mainStoreContext";
import Default from "../assets/images/defaultUserPhoto.png";

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
    const { getUserProfile } = userStore;

    const { user, createdAt, description } = request;

    const userFullInfo = getUserProfile(user.id);

    const { photoUrl, name, linkedIn, bio, pixKey } = userFullInfo;

    const userImage = photoUrl ? photoUrl : Default;

    return (
        <Box className={classes.adoteBox}>
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
                <img src={userImage} alt="userImage" style={{ width: "150px", borderRadius: "50%" }} />
                <Typography variant="h4">{name}</Typography>
                <a href={linkedIn} style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
                    <Typography variant="h6" align="center">
                        {linkedIn}
                    </Typography>
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
