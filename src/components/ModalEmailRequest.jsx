import { Typography, Button, Box, Modal, TextField } from "@material-ui/core";
import { useState } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import { emailValidation } from "../utils/validation";
import { useEffect } from "react";

const ModalEmailRequest = observer(() => {
    const { authStore } = useMainStoreContext();
    const { confirmEmailSignIn, needEmailForSignIn, errorMessage } = authStore;

    const [email, setEmail] = useState("");
    const [validationError, setValidationError] = useState("");

    useEffect(() => {
        if (errorMessage) {
            setValidationError(errorMessage);
        }
    }, [errorMessage]);

    const didConfirmEmail = (event) => {
        event.preventDefault();
        if (emailValidation(email)) {
            confirmEmailSignIn(email);
            setEmail("");
        } else {
            setValidationError("O email digitado não é válido.");
        }
    };

    return (
        <Modal open={needEmailForSignIn}>
            <Box display="flex" justifyContent="center">
                <Box
                    borderRadius={7}
                    position="absolute"
                    top="15vh"
                    bgcolor="background.paper"
                    padding="10px"
                    width="50%"
                >
                    <Typography variant="h6">Confirme o seu email:</Typography>
                    <TextField
                        value={email}
                        type="email"
                        onChange={(event) => setEmail(event.target.value)}
                        fullWidth
                        required
                    />
                    <Box m={2} display="flex" justifyContent="center">
                        <Button variant="outlined" size="medium" onClick={didConfirmEmail}>
                            Confirmar
                        </Button>
                    </Box>
                    <p>{validationError}</p>
                </Box>
            </Box>
        </Modal>
    );
});

export default ModalEmailRequest;
