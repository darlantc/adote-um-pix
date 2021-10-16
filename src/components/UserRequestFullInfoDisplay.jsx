import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router-dom";

import { formatDate } from "../utils/formatting";
import DefaultUserFoto from "../assets/images/defaultUserPhoto.png";
import LoadingAnimation from "./LoadingAnimation";
import APP_ROUTES from "../routes/Routes";
import useUserProfile from "../hooks/useUserProfile";
import useGetUserRequestByUrl from "../hooks/useGetUserRequestByUrl";

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

const UserRequestFullInfoDisplay = observer(() => {
    const classes = useStyles();
    const history = useHistory();
    const params = useParams();

    const { isLoading: isLoadingRequest, request } = useGetUserRequestByUrl(params.request);
    const { isLoading: isLoadingUserProfile, userProfile } = useUserProfile(request?.user?.id);

    const goBackToList = (event) => {
        event.preventDefault();
        history.push(APP_ROUTES.adopt);
    };

    if (isLoadingRequest || isLoadingUserProfile) {
        return <LoadingAnimation />;
    }

    if (!request) {
        return <p>Página não encontrada</p>;
    }

    if (!userProfile) {
        return null;
    }

    const { createdAt, description, pixKey } = request;

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
