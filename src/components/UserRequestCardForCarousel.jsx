import { Typography, Button, Box, Paper, Modal } from "@material-ui/core";
import { useState } from "react";
import { observer } from "mobx-react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import { formatDate } from "../utils/formatting";
import UserRequestForm from "./forms/UserRequestForm";
import CustomToast from "./CustomToast";

const UserRequestCardForCarousel = observer(({ request }) => {
    const { userRequestStore } = useMainStoreContext();
    const { removeUserRequest } = userRequestStore;

    const { description, pixKey, createdAt, id } = request;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alternateModalPresentation, setAlternateModalPresentation] = useState("");

    const openModal = (event) => {
        event.preventDefault();
        setAlternateModalPresentation("");
        setIsModalOpen(true);
    };

    const closeModal = (event) => {
        setIsModalOpen(false);
    };

    const openRemovePopup = (event) => {
        setIsModalOpen(true);
        setAlternateModalPresentation("remove");
    };

    const didRemove = (event) => {
        event.preventDefault();
        removeUserRequest(id);
        toast(<CustomToast message="Solicitação excluída!" />);
    };

    return (
        <Paper variant="outlined" elevation={3}>
            <Box p={1}>
                <Box display="flex" justifyContent="space-between">
                    <p>{description}</p>
                    <Typography variant="h6">{formatDate(createdAt)}</Typography>
                </Box>
                <Typography variant="h6">Chave{`: ${pixKey}`}</Typography>

                <Box display="flex" justifyContent="space-around">
                    <Button variant="outlined" onClick={openModal}>
                        Editar Solicitação
                    </Button>
                    <Button variant="outlined" onClick={openRemovePopup}>
                        Excluir Solicitação
                    </Button>
                </Box>
            </Box>
            <Modal open={isModalOpen} onClose={closeModal}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Box borderRadius={7} bgcolor="background.paper" padding="10px" position="absolute" top="15vh">
                        {alternateModalPresentation === "remove" ? (
                            <>
                                <Typography variant="h6">Confirmar exclusão de solicitação?</Typography>
                                <Box display="flex" justifyContent="space-between" width="310px">
                                    <Button variant="outlined" onClick={closeModal}>
                                        Voltar
                                    </Button>
                                    <Button variant="outlined" onClick={didRemove}>
                                        Excluir
                                    </Button>
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
