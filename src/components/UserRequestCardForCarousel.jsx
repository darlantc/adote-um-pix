import { Typography, Button, Box, Paper, Modal } from "@material-ui/core";
import { useState, useEffect } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import { userRequestNotification } from "./CustomToast";
import { formatDate } from "../utils/formatting";
import UserRequestForm from "./forms/UserRequestForm";
import { InternalEvents } from "../stores/InternalEventsStore";

const UserRequestCardForCarousel = observer(({ request }) => {
    const { userRequestStore, internalEventsStore } = useMainStoreContext();
    const { removeUserRequest } = userRequestStore;
    const { subscribeTo, unsubscribe } = internalEventsStore;

    const { description, pixKey, createdAt, id } = request;

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        subscribeTo({
            event: InternalEvents.notification,
            observer: "UserRequestCardForCarousel",
            callback: (params) => {
                userRequestNotification(params);
            },
        });

        return () => {
            unsubscribe("UserRequestCardForCarousel", InternalEvents.notification);
        };
    });

    const openModal = (event) => {
        event.preventDefault();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openRemovePopup = (event) => {
        event.preventDefault();
        setIsModalOpen("remove");
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
                        {isModalOpen === "remove" ? (
                            <>
                                <Typography variant="h6">Confirmar exclusão de solicitação?</Typography>
                                <Box display="flex" justifyContent="space-evenly">
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
