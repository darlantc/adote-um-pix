import { Typography, Button, Box, Modal, TextField } from "@material-ui/core";
import { useState } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import { emailValidation } from "../utils/validation";

const ModalEmailRequest = observer(() => {
    const { authStore } = useMainStoreContext();
    const { confirmEmailSignIn, emailForSignIn } = authStore;

    const [email, setEmail] = useState("");
    const [validationError, setValidationError] = useState("");

    const didConfirmEmail = (event) => {
        event.preventDefault();
        if (emailValidation(email)) {
            confirmEmailSignIn(email);
            setEmail("");
        } else {
            setValidationError("O email digitado parece não ser válido");
            setInterval(() => {
                setValidationError("");
            }, 5000);
        }
    };

    return (
        <Modal open={emailForSignIn}>
            <Box display="flex" justifyContent="center">
                <Box borderRadius={7} position="absolute" top="15vh" bgcolor="background.paper" padding="10px">
                    <Typography variant="h6">Confirme o seu email:</Typography>
                    <TextField value={email} onChange={(event) => setEmail(event.target.value)} fullWidth required />
                    <Box m={1} display="flex" justifyContent="center">
                        <Button variant="outlined" size="medium" onClick={didConfirmEmail}>
                            Confirmar
                        </Button>
                    </Box>
                    <Typography variant="p">{validationError}</Typography>
                </Box>
            </Box>
        </Modal>
    );
});

export default ModalEmailRequest;
