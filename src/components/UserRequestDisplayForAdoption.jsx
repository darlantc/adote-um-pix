import { Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import { formatDate } from "../utils/formatting";
import { APP_ROUTES } from "../routes/Routes";
import Default from "../assets/images/defaultUserPhoto.png";

const useStyles = makeStyles(() => ({
    adoteBox: {
        backgroundColor: "#00CCFF",
        color: "#FFFFFF",
        borderRadius: "7px",
        border: "2px",
        borderColor: "#0088AA",
        padding: "10px",
        maxWidth: "580px",
        maxHeight: "400px",
        margin: "5px",
        transition: "0.5s",
        cursor: "pointer",
        "&:hover": {
            transform: "scale(1.05)",
        },
    },
    descriptionBox: {
        maxHeight: "150px",
        overflow: "hidden",
    },
}));

const UserRequestDisplayForAdoption = ({ request }) => {
    const classes = useStyles();

    const { user, createdAt, url, description } = request;

    const userImage = user?.photoUrl || Default;

    return (
        <Box data-testid="UserRequestDisplay" className={classes.adoteBox}>
            <Link to={`${APP_ROUTES.adopt}/${url}`} style={{ color: "inherit", textDecoration: "inherit" }}>
                <Box display="flex" justifyContent="center">
                    <img
                        src={userImage}
                        alt="Imagem de usuário"
                        style={{ width: "70px", marginRight: "10px", borderRadius: "50%" }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                        <Typography variant="h5">{user?.name}</Typography>
                        <Typography variant="h6">{formatDate(createdAt)}</Typography>
                    </div>
                </Box>
                <div className={classes.descriptionBox} id="descriptionBox">
                    <Typography variant="body1" align="center">
                        {description}
                    </Typography>
                </div>
                {description?.length > 600 && (
                    <Typography variant="h5" align="center">
                        ...
                    </Typography>
                )}
            </Link>
        </Box>
    );
};

export default UserRequestDisplayForAdoption;
