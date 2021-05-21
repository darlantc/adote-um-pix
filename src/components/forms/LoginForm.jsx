import { Typography, Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";

import { useMainStoreContext } from "../../contexts/mainStoreContext";

const LoginForm = () => {
  const { authStore } = useMainStoreContext();
  const { sendSignInLinkToEmail } = authStore;

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSendLink = async () => {
    const error = await sendSignInLinkToEmail(email);
    console.log("2");
    if (error) {
      setMessage(error.message);
    } else {
      console.log("4");
      setMessage(
        "Agora entre no seu email e faça login pelo link que lhe enviamos."
      );
    }
  };

  const didSendLink = (event) => {
    event.preventDefault();
    console.log("1");

    setEmail("");
    setPhone("");

    handleSendLink();
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box width={300} m={2}>
        <Typography variant="h6">Email</Typography>
        <TextField
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
          required
        />
      </Box>

      <Typography> ou </Typography>

      <Box width={300} m={2}>
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
    </form>
  );
};

export default LoginForm;
