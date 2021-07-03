import { Typography, Box, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

import { formatDate } from "../utils/formatting";
import Default from "../assets/images/defaultUserPhoto.png";
import UserRequestFullInfoDisplay from "./UserRequestFullInfoDisplay";

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
        transition: "0.5s",
        cursor: "pointer",
        "&:hover": {
            transform: "scale(1.05)",
        },
    },
}));

const UserRequestsDisplayForAdoption = ({ request }) => {
    const classes = useStyles();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { user, createdAt, description } = request;

    const userImage = user.photoUrl ? user.photoUrl : Default;

    const openModal = (event) => {
        event.preventDefault();
        setIsModalOpen(true);
    };

    const closeModal = (event) => {
        event.preventDefault();
        setIsModalOpen(false);
    };

    return (
        <Box>
            <Box className={classes.adoteBox} onClick={openModal}>
                <Box display="flex" justifyContent="center">
                    <img
                        src={userImage}
                        alt="Imagem de usuário"
                        style={{ width: "70px", marginRight: "10px", borderRadius: "50%" }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                        <Typography variant="h5">{user.name}</Typography>
                        <Typography variant="h6">{formatDate(createdAt)}</Typography>
                    </div>
                </Box>
                <Typography variant="body1" align="center">
                    {description}
                </Typography>
            </Box>
            <Modal open={isModalOpen}>
                <Box display="flex" justifyContent="center" width="100%" height="100%" alignContent="center">
                    <UserRequestFullInfoDisplay request={request} close={closeModal} />
                </Box>
            </Modal>
        </Box>
    );
};

export default UserRequestsDisplayForAdoption;
