import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { observer } from "mobx-react";
import { useParams, Link } from "react-router-dom";

import { formatDate } from "../utils/formatting";
import Error404 from "./Error404";
import DefaultUserFoto from "../assets/images/defaultUserPhoto.png";
import LoadingAnimation from "../components/LoadingAnimation";
import { APP_ROUTES } from "../routes/Routes";
import useUserProfile from "../hooks/useUserProfile";
import useGetUserRequestByUrl from "../hooks/useGetUserRequestByUrl";

const useStyles = makeStyles({
    adoteButton: {
        backgroundColor: "#0088AA",
        height: "36px",
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
        width: "100%",
        maxWidth: "655px",
        margin: "5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
});

const UserRequestFullInfoDisplay = observer(() => {
    const classes = useStyles();
    const params = useParams();

    const { isLoading: isLoadingRequest, request } = useGetUserRequestByUrl(params.request);
    const { isLoading: isLoadingUserProfile, userProfile } = useUserProfile(request?.user?.id);

    if (isLoadingRequest || isLoadingUserProfile) {
        return <LoadingAnimation />;
    }

    if (!request) {
        return <Error404 />;
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
                        <a
                            aria-label={`Perfil no LinkedIn de ${fullName}`}
                            href={linkedIn}
                            style={{ textDecoration: "none" }}
                            target="_blank"
                            rel="noreferrer"
                        >
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
                    <Link to={APP_ROUTES.adopt} style={{ color: "inherit", textDecoration: "inherit" }}>
                        <Button variant="outlined">Voltar</Button>
                    </Link>
                    <Button variant="outlined" className={classes.adoteButton}>
                        Adotar
                    </Button>
                </Box>
            </Box>
        </>
    );
});

export default UserRequestFullInfoDisplay;
