import { Typography, Box, Button, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../../contexts/mainStoreContext";
import { emailValidation, phoneValidation } from "../../utils/validation";
import { formatPhoneNumber } from "../../utils/formatting";
import EmailRedirectOptions from "../EmailRedirectOptions";
import LoadingAnimation from "../LoadingAnimation";
import ErrorMessageStatus from "../../models/ErrorMessageStatus";

const LoginForm = observer(() => {
    const { authStore } = useMainStoreContext();
    const { sendSignInLinkToEmail, errorMessage, signInWithPhoneNumber } =
        authStore;

    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errorMessageField, setErrorMessageField] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setErrorMessageField("");
        }, 5000);
    }, [errorMessageField]);

    useEffect(() => {
        if (errorMessage !== ErrorMessageStatus.loading) {
            setErrorMessageField(errorMessage);
        }
    }, [errorMessage]);

    const didSendLinkByEmail = (event) => {
        event.preventDefault();
        if (emailValidation(email)) {
            sendSignInLinkToEmail(email);

            setEmail("");
        } else {
            setErrorMessageField("O email digitado parece não ser válido.");
        }
    };

    const didSendCodeBySMS = (event) => {
        event.preventDefault();

        const validNumber = phoneValidation(phoneNumber);

        if (validNumber) {
            signInWithPhoneNumber(validNumber);

            setPhoneNumber("");
        } else {
            setErrorMessageField("O número digitado parece não ser válido.");
        }
    };

    useEffect(() => {
        const formattedNumber = formatPhoneNumber(phoneNumber);
        if (formattedNumber) {
            setPhoneNumber(formattedNumber);
        }
    }, [phoneNumber]);

    if (errorMessage === ErrorMessageStatus.loading) {
        return (
            <div
                style={{
                    width: "300px",
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <LoadingAnimation />
            </div>
        );
    }

    return (
        <div
            style={{
                width: "320px",
                padding: "10px",
            }}
        >
            {errorMessage === ErrorMessageStatus.none ? (
                <EmailRedirectOptions />
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <form onSubmit={didSendLinkByEmail}>
                        <Box m={2}>
                            <Typography variant="h6">Email</Typography>
                            <TextField
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                fullWidth
                            />
                        </Box>

                        <Box m={2} display="flex" justifyContent="center">
                            <Button
                                type="submit"
                                variant="outlined"
                                size="medium"
                            >
                                Entrar
                            </Button>
                        </Box>
                    </form>

                    <Typography> ou </Typography>

                    <form onSubmit={didSendCodeBySMS}>
                        <Box m={2}>
                            <Typography variant="h6">Telefone</Typography>
                            <TextField
                                value={phoneNumber}
                                onChange={(event) =>
                                    setPhoneNumber(event.target.value)
                                }
                                fullWidth
                                required
                            />
                        </Box>

                        <Box m={2} display="flex" justifyContent="center">
                            <Button
                                type="submit"
                                variant="outlined"
                                size="medium"
                            >
                                Entrar
                            </Button>
                        </Box>
                    </form>

                    <div id="recatcha-container"></div>

                    <Typography variant="p">{errorMessageField}</Typography>
                </div>
            )}
        </div>
    );
});

export default LoginForm;
