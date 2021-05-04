import {
  TextField,
  FormHelperText,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import { useState } from "react";

import useStyles from "../../assets/styles/jss/styles";
import {
  cpfValidation,
  contactValidation,
  randomKeyValidation,
  emailValidation,
} from "../../utils/validation";

const UserRequestForm = () => {
  const classes = useStyles();

  const [description, setDescription] = useState("");
  const [pixKey, setPixKey] = useState("");
  const [firstTry, setFirstTry] = useState(true);
  const [validationError, setValidationError] = useState("");

  const handleSave = (event) => {
    event.preventDefault();
    setFirstTry(false);
  };

  const fourWayValidation = (event) => {
    event.preventDefault();
    setPixKey(event.target.value);

    const cpf = cpfValidation(event.target.value);
    const contact = contactValidation(event.target.value);
    const email = emailValidation(event.target.value);
    const key = randomKeyValidation(event.target.value);

    if (cpf && !contact) {
      const formattedCpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
        6,
        9
      )}-${cpf.slice(9)}`;
      setPixKey(formattedCpf);
    } else if (contact && !cpf) {
      const formattedContact = `(${contact.slice(0, 2)}) ${
        contact[2]
      } ${contact.slice(3, 7)}-${contact.slice(7)}`;
      setPixKey(formattedContact);
    } else if (!cpf && !contact && !email && !key && !firstTry) {
      setValidationError("Aparentemente a chave digitada não é válida.");
    }
  };

  return (
    <form>
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
        id="outlined-basic"
        label="CPF, Celular, e-mail ou chave aleatória"
        variant="outlined"
        fullWidth
        required
      />
      <FormHelperText error gutterBottom>
        {validationError}
      </FormHelperText>
      <Box m={2} display="flex" justifyContent="center" fullWidth>
        <Button onClick={handleSave} variant="outlined" size="medium">
          Salvar
        </Button>
      </Box>
    </form>
  );
};

export default UserRequestForm;
