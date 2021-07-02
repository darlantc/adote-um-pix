import { Typography, Box, Modal, Button } from "@material-ui/core";
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

    return (
        <Box>
            <Box className={classes.adoteBox}>
                <Box>
                    <img src={userImage} alt="Imagem de usuário" />
                    <Box>
                        <Typography variant="h4">{user.name}</Typography>
                        <Typography variant="h5">{formatDate(createdAt)}</Typography>
                    </Box>
                </Box>
                <Typography variant="h6">{description}</Typography>
                <Box>
                    <Button variant="outlined" className={classes.adoteButton} onClick={openModal}>
                        Mais Informações
                    </Button>
                </Box>
            </Box>
            <Modal open={isModalOpen}>
                <UserRequestFullInfoDisplay request={request} />
            </Modal>
        </Box>
    );
};

export default UserRequestsDisplayForAdoption;
