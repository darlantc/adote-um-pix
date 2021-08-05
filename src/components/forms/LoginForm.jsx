import { Typography, Box, Button, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../../contexts/mainStoreContext";
import { InternalEvents } from "../../stores/InternalEventsStore";
import { customNotification } from "../CustomToast";
import { emailValidation, phoneValidation } from "../../utils/validation";
import { formatPhoneNumber } from "../../utils/formatting";
import EmailRedirectOptions from "../EmailRedirectOptions";
import LoadingAnimation from "../LoadingAnimation";

const LoginForm = observer(() => {
    const { authStore, internalEventsStore } = useMainStoreContext();
    const { subscribeTo, unsubscribe } = internalEventsStore;
    const { sendSignInLinkToEmail, errorMessage, signInWithPhoneNumber, displayEmailRedirectOptions } = authStore;

    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [validationError, setValidationError] = useState("");

    useEffect(() => {
        subscribeTo({
            event: InternalEvents.notification,
            observer: "LoginForm",
            callback: (params) => {
                customNotification(params);
            },
        });

        return () => {
            unsubscribe("LoginForm", InternalEvents.notification);
        };
    }, [subscribeTo, unsubscribe]);

    useEffect(() => {
        const formattedNumber = formatPhoneNumber(phoneNumber);
        if (formattedNumber) {
            setPhoneNumber(formattedNumber);
        }
    }, [phoneNumber]);

    const didSendLinkByEmail = (event) => {
        event.preventDefault();
        if (emailValidation(email)) {
            sendSignInLinkToEmail(email);

            setEmail("");
        } else {
            setValidationError("O email digitado parece não ser válido.");
        }
    };

    const didSendCodeBySMS = (event) => {
        event.preventDefault();

        const validNumber = phoneValidation(phoneNumber);

        if (validNumber) {
            signInWithPhoneNumber(validNumber);

            setPhoneNumber("");
        } else {
            setValidationError("O número digitado parece não ser válido.");
        }
    };

    if (displayEmailRedirectOptions === "loading") {
        return <LoadingAnimation />;
    }

    return (
        <div
            style={{
                width: "320px",
                padding: "10px",
            }}
        >
            {displayEmailRedirectOptions ? (
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
                                onChange={(event) => setEmail(event.target.value)}
                                aria-label="email"
                                fullWidth
                                required
                            />
                        </Box>

                        <Box m={2} display="flex" justifyContent="center">
                            <Button type="submit" variant="outlined" size="medium" aria-label="email-login">
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
                                onChange={(event) => setPhoneNumber(event.target.value)}
                                aria-label="phone"
                                fullWidth
                                required
                            />
                        </Box>

                        <Box m={2} display="flex" justifyContent="center">
                            <Button type="submit" variant="outlined" size="medium" aria-label="phone-login">
                                Entrar
                            </Button>
                        </Box>
                    </form>

                    <div id="recatcha-container"></div>

                    <p>{errorMessage}</p>
                    <p>{validationError}</p>
                </div>
            )}
        </div>
    );
});

export default LoginForm;
