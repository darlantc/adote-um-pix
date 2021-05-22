import { Typography, Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../../contexts/mainStoreContext";
import EmailRedirectButton from "../EmailRedirectButton";
import Google from "../../assets/images/Gmail.jpg";
import Outlook from "../../assets/images/Outlook.jpg";
import Yahoo from "../../assets/images/Yahoo.jpg";

const LoginForm = observer(() => {
  const { authStore } = useMainStoreContext();
  const { sendSignInLinkToEmail, loginStatus, setLoginStatus } = authStore;

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSendLink = async () => {
    const error = await sendSignInLinkToEmail(email);
    if (error) {
      setMessage(error.message);
    }
  };

  const didSendLink = (event) => {
    event.preventDefault();

    setEmail("");
    setPhone("");

    handleSendLink();
  };

  return (
    <form
      style={{
        width: "300px",
        padding: "10px",
      }}
    >
      {loginStatus === "offline" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box m={2}>
            <Typography variant="h6">Email</Typography>
            <TextField
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              fullWidth
              required
            />
          </Box>

          <Typography> ou </Typography>

          <Box m={2}>
            <Typography variant="h6">Telefone</Typography>
            <TextField
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              fullWidth
              required
            />
          </Box>

          <Box m={2} display="flex" justifyContent="center">
            <Button variant="outlined" size="medium" onClick={didSendLink}>
              Entrar
            </Button>
          </Box>

          <Typography variant="h6">{message}</Typography>
        </div>
      ) : (
        <div>
          <Typography variant="h6" align="center">
            Agora é só fazer login pelo link que enviamos para o email:
          </Typography>
          <Typography variant="h6" color="primary" align="center" gutterbottom>
            {window.localStorage.getItem("emailForSignIn")}
          </Typography>

          <Box
            m={2}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <EmailRedirectButton
              href="https://mail.google.com/mail/"
              src={Google}
              alt="Google"
            />
            <EmailRedirectButton
              href="https://outlook.live.com/"
              src={Outlook}
              alt="Outlook"
            />
            <EmailRedirectButton
              href="https://mail.yahoo.com/"
              src={Yahoo}
              alt="Yahoo"
            />
          </Box>

          <Typography variant="h6" align="center">
            Não é esse email?
          </Typography>
          <Box m={1} display="flex" justifyContent="center">
            <Button
              variant="outlined"
              size="medium"
              onClick={() => setLoginStatus()}
            >
              Voltar
            </Button>
          </Box>
        </div>
      )}
    </form>
  );
});

export default LoginForm;
