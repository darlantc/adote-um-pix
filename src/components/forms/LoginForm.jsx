import { Typography, Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");

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
        <Typography variant="h6">Password</Typography>
        <TextField
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
        <Button variant="outlined" size="medium">
          Entrar
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
