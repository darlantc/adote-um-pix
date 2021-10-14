import { Typography, Box, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import { formatDate } from "../utils/formatting";
import { APP_ROUTES } from "../routes/Routes";
import Default from "../assets/images/defaultUserPhoto.png";
import UserRequestFullInfoDisplay from "./UserRequestFullInfoDisplay";
import DescriptionSizes from "../models/DescriptionSizes";

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
        maxHeight: "250px",
        overflow: "hidden",
    },
}));

const UserRequestDisplayForAdoption = ({ request }) => {
    const classes = useStyles();

    const history = useHistory();

    const [descriptionSize, setDescriptionSize] = useState(DescriptionSizes.small);

    const { user, createdAt, url, description } = request;

    const userImage = user?.photoUrl || Default;

    const isModalOpen = history.location.pathname === `${APP_ROUTES.adopt}/${url}`;

    const closeModal = (event) => {
        event.preventDefault();
        history.push(APP_ROUTES.adopt);
    };

    useEffect(() => {
        let height = document.getElementById("descriptionBox").offsetHeight;
        console.log("🚀 ~ file: UserRequestDisplayForAdoption.jsx ~ line 60 ~ useEffect ~ height", height);
        if (height > 200) {
            setDescriptionSize(DescriptionSizes.big);
            console.log(
                "🚀 ~ file: UserRequestDisplayForAdoption.jsx ~ line 42 ~ UserRequestDisplayForAdoption ~ descriptionSize",
                descriptionSize
            );
        }
    }, []);

    return (
        <Box>
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
                    {descriptionSize === DescriptionSizes.big && (
                        <Typography variant="h5" align="center">
                            ...
                        </Typography>
                    )}
                </Link>
            </Box>

            <Modal open={isModalOpen}>
                <Box display="flex" justifyContent="center" width="100%" height="100%" alignContent="center">
                    <UserRequestFullInfoDisplay request={request} close={closeModal} />
                </Box>
            </Modal>
        </Box>
    );
};

export default UserRequestDisplayForAdoption;
