import { Typography, Button, Box, Paper, Modal, ButtonBase } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { useState } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import { formatDate } from "../utils/formatting";
import UserRequestForm from "./forms/UserRequestForm";

const RemotionButton = styled(ButtonBase)({
    textDecoration: "none",
    border: "1px solid gray",
    borderRadius: "5px",
    backgroundColor: "#d9534f",
    height: "40px",
    width: "100px",
    fontFamily: "Original Surfer",
    trasition: "0.5s",
    color: "#F7F7F7",
    opacity: "0.8",
    "&:hover": {
        opacity: "1",
    },
});

const UserRequestCardForCarousel = observer(({ request }) => {
    const { userRequestStore } = useMainStoreContext();
    const { removeUserRequest } = userRequestStore;

    const { description, pixKey, createdAt, id } = request;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRemoveModal, setIsRemoveModal] = useState(false);

    const openModal = (event) => {
        event.preventDefault();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsRemoveModal(false);
    };

    const openRemoveModal = (event) => {
        event.preventDefault();
        setIsModalOpen(true);
        setIsRemoveModal(true);
    };

    const didRemove = (event) => {
        event.preventDefault();
        removeUserRequest(id);
    };

    return (
        <Paper variant="outlined" elevation={3}>
            <Box p={1}>
                <Box display="flex" justifyContent="space-between">
                    <p>{description}</p>
                    <Typography variant="h6">{formatDate(createdAt)}</Typography>
                </Box>
                <Typography variant="h6" gutterBottom>
                    {`Chave: ${pixKey}`}
                </Typography>

                <Box display="flex" justifyContent="space-around">
                    <Button variant="outlined" onClick={openModal}>
                        Editar Solicitação
                    </Button>
                    <Button variant="outlined" onClick={openRemoveModal}>
                        Excluir Solicitação
                    </Button>
                </Box>
            </Box>
            <Modal open={isModalOpen} onClose={closeModal}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Box borderRadius={7} bgcolor="background.paper" padding="10px" position="absolute" top="15vh">
                        {isRemoveModal ? (
                            <>
                                <Typography variant="h6">Confirmar exclusão de solicitação?</Typography>
                                <Box display="flex" justifyContent="space-evenly">
                                    <Button variant="outlined" onClick={closeModal}>
                                        Voltar
                                    </Button>
                                    <RemotionButton variant="outlined" onClick={didRemove}>
                                        EXCLUIR
                                    </RemotionButton>
                                </Box>
                            </>
                        ) : (
                            <UserRequestForm
                                id={id}
                                currentDescription={description}
                                currentPixKey={pixKey}
                                close={closeModal}
                            />
                        )}
                    </Box>
                </Box>
            </Modal>
        </Paper>
    );
});

export default UserRequestCardForCarousel;
