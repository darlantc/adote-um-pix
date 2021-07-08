import { Typography, Button, Box, Modal, TextField } from "@material-ui/core";
import { useState } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import { emailValidation } from "../utils/validation";

const ModalEmailRequest = observer(() => {
    const { authStore } = useMainStoreContext();
    const { confirmEmailSignIn, needEmailForSignIn } = authStore;

    const [email, setEmail] = useState("");
    const [validationError, setValidationError] = useState("");

    const didConfirmEmail = (event) => {
        event.preventDefault();
        if (emailValidation(email)) {
            confirmEmailSignIn(email);
            setEmail("");
        } else {
            // TODO: Avaliar o uso desse else para exibição de erros
            setValidationError("O email digitado parece não ser válido");
            setTimeout(() => {
                setValidationError("");
            }, 5000);
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
                    {/* TODO: Garantir em teste que quando o usuário digita nesse input o valor muda realmente */}
                    <TextField value={email} onChange={(event) => setEmail(event.target.value)} fullWidth required />
                    <Box m={2} display="flex" justifyContent="center">
                        <Button variant="outlined" size="medium" onClick={didConfirmEmail}>
                            Confirmar
                        </Button>
                    </Box>
                    {/* TODO: Validar que esse erro é exibido corretamente em testes */}
                    <p>{validationError}</p>
                </Box>
            </Box>
        </Modal>
    );
});

export default ModalEmailRequest;
