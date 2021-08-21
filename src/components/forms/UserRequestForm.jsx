import { TextField, FormHelperText, Typography, Button, Box, Modal } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import { useMainStoreContext } from "../../contexts/mainStoreContext";
import { cpfValidation, phoneValidation, pixRandomKeyValidation, emailValidation } from "../../utils/validation";
import { formatCpf, formatPhoneNumber } from "../../utils/formatting";
import { APP_ROUTES } from "../../routes/Routes";

const useStyles = makeStyles(() => ({
    soliciteButton: {
        backgroundColor: "#2CA089",
        color: "#FFFFFF",
        marginTop: "10px",
    },
    textField: {
        backgroundColor: "#FFFFFF",
        borderRadius: "5px",
    },
}));

const UserRequestForm = observer(({ id, currentPixKey, currentDescription, close }) => {
    const { authStore, userRequestStore } = useMainStoreContext();
    const { addUserRequest, updateUserRequest } = userRequestStore;
    const { loggedUser } = authStore;

    const classes = useStyles();

    const [description, setDescription] = useState(currentDescription || "");
    const [pixKey, setPixKey] = useState(currentPixKey || "");
    const [isFirstTry, setIsFirstTry] = useState(true);
    const [validationError, setValidationError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdatePopUpOpen, setIsUpdatePopUpOpen] = useState(false);

    const handleSave = (event) => {
        event.preventDefault();
        setIsFirstTry(false);

        if (loggedUser) {
            const request = { id, pixKey, description };

            if (id) {
                updateUserRequest(request);
                setIsUpdatePopUpOpen(true);
            } else {
                addUserRequest(request);
                setIsModalOpen(true);
            }
        }

        setPixKey("");
        setDescription("");
    };

    const closeFormForUpdate = (event) => {
        event.preventDefault();
        setIsUpdatePopUpOpen(false);
        close();
    };

    const fourWayValidation = (event) => {
        event.preventDefault();
        setPixKey(event.target.value);

        const cpf = cpfValidation(event.target.value);
        const phoneNumber = phoneValidation(event.target.value);
        const email = emailValidation(event.target.value);
        const key = pixRandomKeyValidation(event.target.value);

        if (cpf && !phoneNumber) {
            const formattedCpf = formatCpf(cpf);

            setPixKey(formattedCpf);
            setValidationError("");
        } else if (phoneNumber && !cpf) {
            const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

            setPixKey(formattedPhoneNumber);
            setValidationError("");
        } else if (email || key) {
            setValidationError("");
        } else if (!cpf && !phoneNumber && !email && !key && !isFirstTry) {
            setValidationError("Aparentemente a chave digitada não é válida.");
        }
    };

    return (
        <form onSubmit={handleSave}>
            <Typography variant="h5" gutterBottom>
                Descreva sua necessidade
            </Typography>
            <TextField
                className={classes.textField}
                onChange={(event) => setDescription(event.target.value)}
                value={description}
                variant="outlined"
                multiline
                aria-label="description"
                rows="7"
                fullWidth
                required
            />
            <FormHelperText>
                Descrever em detalhes pode aumentar suas chances de encontrar um doador para ajuda-lo
            </FormHelperText>
            <Typography variant="h5" gutterBottom>
                Digite sua chave PIX
            </Typography>
            <TextField
                className={classes.textField}
                onChange={fourWayValidation}
                value={pixKey}
                label="CPF, Celular, e-mail ou chave aleatória"
                variant="outlined"
                aria-label="pixKey"
                fullWidth
                required
            />
            <FormHelperText error>{validationError}</FormHelperText>
            <Box display="flex" justifyContent="center">
                <Button className={classes.soliciteButton} type="submit" variant="outlined" size="medium">
                    Salvar
                </Button>
            </Box>
            <Modal open={isModalOpen}>
                <Box display="flex" alignContent="center" justifyContent="center">
                    <Box borderRadius={7} position="absolute" top="15vh" bgcolor="background.paper" padding="10px">
                        <Typography variant="h6"> Sua solicitação foi registrada com sucesso. </Typography>
                        <Box display="flex" justifyContent="space-between">
                            <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
                                Nova Solicitação
                            </Button>
                            <Button variant="outlined" component={Link} to={APP_ROUTES.myRequests}>
                                Ir para Solicitações
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            <Modal open={isUpdatePopUpOpen}>
                <Box display="flex" alignContent="center" justifyContent="center">
                    <Box borderRadius={7} position="absolute" top="15vh" bgcolor="background.paper" padding="10px">
                        <Typography variant="h6"> Sua solicitação foi atualizada. </Typography>
                        <Box display="flex" justifyContent="center">
                            <Button variant="outlined" onClick={closeFormForUpdate}>
                                Voltar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </form>
    );
});

export default UserRequestForm;
