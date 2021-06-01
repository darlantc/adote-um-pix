import {
  TextField,
  FormHelperText,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";

import {
  cpfValidation,
  phoneValidation,
  pixRandomKeyValidation,
  emailValidation,
} from "../../utils/validation";
import { useMainStoreContext } from "../../contexts/mainStoreContext";
import { formatCpf } from "../../utils/formatting";

const useStyles = makeStyles((theme) => ({
  soliciteButton: {
    backgroundColor: "#2CA089",
    color: "#FFFFFF",
    marginTop: "10px",
  },
  textField: {
    backgroundColor: "#FFFFFF",
    borderRadius: "5px",
  },
}));

const UserRequestForm = observer(() => {
  const { authStore, userRequestStore } = useMainStoreContext();
  const { addUserRequest } = userRequestStore;

  const userId = authStore.loggedUser.uid;

  const classes = useStyles();

  const [description, setDescription] = useState("");
  const [pixKey, setPixKey] = useState("");

  const [firstTry, setFirstTry] = useState(true);
  const [validationError, setValidationError] = useState("");

  const handleSave = (event) => {
    event.preventDefault();
    setFirstTry(false);

    const request = { userId, pixKey, description };
    addUserRequest(request);
  };

  const fourWayValidation = (event) => {
    event.preventDefault();
    setPixKey(event.target.value);

    const cpf = cpfValidation(event.target.value);
    const contact = phoneValidation(event.target.value);
    const email = emailValidation(event.target.value);
    const key = pixRandomKeyValidation(event.target.value);

    if (cpf && !contact) {
      const formattedCpf = formatCpf(cpf);

      setPixKey(formattedCpf);
      setValidationError("");
    } else if (contact && !cpf) {
      const formattedContact = `(${contact.slice(0, 2)}) ${
        contact[2]
      } ${contact.slice(3, 7)}-${contact.slice(7)}`;

      setPixKey(formattedContact);
      setValidationError("");
    } else if (email || key) {
      setValidationError("");
    } else if (!cpf && !contact && !email && !key && !firstTry) {
      setValidationError("Aparentemente a chave digitada não é válida.");
    }
  };

  return (
    <form onSubmit={handleSave}>
      <Typography variant="h5" gutterBottom>
        Descreva sua necessidade
      </Typography>
      <TextField
        className={classes.textField}
        onChange={(event) => setDescription(event.target.value)}
        value={description}
        variant="outlined"
        multiline
        rows="7"
        fullWidth
        required
      />
      <FormHelperText gutterBottom>
        Descrever em detalhes pode aumentar suas chances de encontrar um doador
        para ajuda-lo
      </FormHelperText>
      <Typography variant="h5" gutterBottom>
        Digite sua chave PIX
      </Typography>
      <TextField
        className={classes.textField}
        onChange={fourWayValidation}
        value={pixKey}
        label="CPF, Celular, e-mail ou chave aleatória"
        variant="outlined"
        fullWidth
        required
      />
      <FormHelperText error>{validationError}</FormHelperText>
      <Box display="flex" justifyContent="center" fullWidth>
        <Button
          className={classes.soliciteButton}
          type="submit"
          variant="outlined"
          size="medium"
        >
          Salvar
        </Button>
      </Box>
    </form>
  );
});

export default UserRequestForm;
