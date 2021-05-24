import { Typography, Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../../contexts/mainStoreContext";
import { emailValidation } from "../../utils/validation";
import EmailRedirectOptions from "../EmailRedirectOptions";

const LoginForm = observer(() => {
  const { authStore } = useMainStoreContext();
  const { sendSignInLinkToEmail, loginStatus, error } = authStore;

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSendLink = async () => {
    await sendSignInLinkToEmail(email);
    if (error) {
      setMessage(error.message);
    }
  };

  const didSendLink = (event) => {
    event.preventDefault();
    if (emailValidation(email)) {
      handleSendLink(email);

      setEmail("");
    }
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

          <Box m={2} display="flex" justifyContent="center">
            <Button variant="outlined" size="medium" onClick={didSendLink}>
              Entrar
            </Button>
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
            <Button variant="outlined" size="medium">
              Entrar
            </Button>
          </Box>

          <Typography variant="h6">{message}</Typography>
        </div>
      ) : (
        <EmailRedirectOptions />
      )}
    </form>
  );
});

export default LoginForm;
