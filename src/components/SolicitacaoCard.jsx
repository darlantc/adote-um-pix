import { Typography, Button, Box, Paper, Modal } from "@material-ui/core";
import { useState } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import { formatDate } from "../utils/formatting";
import UserRequestForm from "./forms/UserRequestForm";

const SolicitacaoCard = observer(({ item }) => {
    const { userRequestStore } = useMainStoreContext();
    const { removeUserRequest } = userRequestStore;

    const { description, pixKey, createdAt, status, id } = item;

    const [displayModal, setDisplayModal] = useState(false);

    const openModal = (event) => {
        event.preventDefault();
        setDisplayModal(true);
    };

    const closeModal = () => {
        setDisplayModal(false);
    };

    const didRemove = (event) => {
        event.preventDefault();
        removeUserRequest(id);
    };

    return (
        <Paper variant="outlined" elevation={3}>
            <Box p={1}>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5" gutterBottom>
                        Solicitação
                    </Typography>
                    <Typography variant="h6">
                        {formatDate(createdAt)}
                    </Typography>
                </Box>
                <Typography
                    variant="h6"
                    gutterBottom
                >{`- ${status} -`}</Typography>
                <p>{description}</p>
                <Typography variant="h6" gutterBottom>
                    Chave{`: ${pixKey}`}
                </Typography>

                <Box display="flex" justifyContent="space-around">
                    <Button variant="outlined" onClick={openModal}>
                        Editar Solicitação
                    </Button>
                    <Button variant="outlined" onClick={didRemove}>
                        Excluir Solicitação
                    </Button>
                </Box>
            </Box>
            <Modal open={displayModal} onClose={closeModal}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Box
                        borderRadius={7}
                        bgcolor="background.paper"
                        padding="10px"
                        position="absolute"
                        top="15vh"
                    >
                        <UserRequestForm id={item.id} />
                    </Box>
                </Box>
            </Modal>
        </Paper>
    );
});

export default SolicitacaoCard;
