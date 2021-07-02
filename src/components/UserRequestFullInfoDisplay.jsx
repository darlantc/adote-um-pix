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
        marginTop: "10px",
    },
    adoteBox: {
        backgroundColor: "#00CCFF",
        color: "#FFFFFF",
        borderRadius: "7px",
        border: "2px",
        borderColor: "#0088AA",
        padding: "10px",
        maxWidth: "655px",
        margin: "5px",
    },
}));

const UserRequestFullInfoDisplay = observer(({ request }) => {
    const classes = useStyles();

    const { userStore } = useMainStoreContext();
    const { getUser } = userStore;

    const { user, createdAt, description } = request;

    const userFullInfo = getUser(user.id);

    const { photoUrl, name, linkedIn, bio, pixKey } = userFullInfo;

    const userImage = photoUrl ? photoUrl : Default;

    return (
        <Box>
            <Typography variant="h5">{formatDate(createdAt)}</Typography>
            <img src={userImage} alt="userImage" />
            <Typography variant="h2">{name}</Typography>
            <a href={linkedIn}>
                <Typography variant="h4">{linkedIn}</Typography>
            </a>
            <Typography variant="body1">{bio}</Typography>
            <Box className={classes.adoteBox}>
                <Typography variant="h6">{description} </Typography>
                <Typography variant="h5">{pixKey} </Typography>
                <Box>
                    <Button variant="outlined" className={classes.adoteButton}>
                        Adotar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
});

export default UserRequestFullInfoDisplay;
