import { Typography, Box, Button } from "@material-ui/core";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import EmailRedirectButton from "./EmailRedirectButton";
import Google from "../assets/images/Gmail.jpg";
import Outlook from "../assets/images/Outlook.jpg";
import Yahoo from "../assets/images/Yahoo.jpg";

const EmailRedirectOptions = observer(() => {
    const { authStore } = useMainStoreContext();
    const { setDisplayEmailRedirectOptions } = authStore;

    const buttonList = [
        { href: "https://mail.google.com/mail/", title: "Google", image: Google },
        { href: "https://outlook.live.com/", title: "Outlook", image: Outlook },
        { href: "https://mail.yahoo.com/", title: "Yahoo", image: Yahoo },
    ];

    const didGoBack = (event) => {
        event.preventDefault();
        // TODO: escrever um testes para cobrir essa funcionalidade
        setDisplayEmailRedirectOptions(false);
    };

    return (
        <div>
            <Typography variant="h6" align="center">
                Obrigado! Agora por favor abra o link que enviamos para seu e-mail.
            </Typography>
            <Typography variant="h6" color="primary" align="center" gutterBottom>
                {window.localStorage.getItem("emailForSignIn")}
            </Typography>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                {buttonList.map((button, index) => {
                    const { href, image, title } = button;

                    return <EmailRedirectButton href={href} image={image} title={title} key={index} />;
                })}
            </div>

            {/* TODO: cobrir com teste unitário */}
            <Typography variant="h6" align="center">
                Não é esse email?
            </Typography>
            <Box m={1} display="flex" justifyContent="center">
                <Button variant="outlined" size="medium" onClick={didGoBack}>
                    Voltar
                </Button>
            </Box>
        </div>
    );
});

export default EmailRedirectOptions;
