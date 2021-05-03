import {
  Container,
  TextField,
  FormHelperText,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useState } from "react";

import useStyles from "./styles";
import StyledAppBar from "./components/StyledAppBar";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Original Surfer",
  },
});

const App = () => {
  const classes = useStyles();

  const [necessity, setNecessity] = useState("");
  const [currentKey, setCurrentKey] = useState("");
  const [firstTry, setFirstTry] = useState(true);
  const [validationError, setValidationError] = useState("");

  const handleSave = (event) => {
    event.preventDefault();
    setFirstTry(false);
  };

  const cpfValidation = (raw) => {
    const num = String(raw).replace(/\D/g, "");

    if (num.length === 11) {
      let sum1 = 0;

      for (let i = 0; i <= 8; i++) {
        let multiplication1 = Number(num[i]) * (10 - i);
        sum1 += multiplication1;
      }

      let result1 = (sum1 * 10) % 11;
      if (result1 >= 10) {
        result1 = 0;
      }

      if (result1 === Number(num[9])) {
        let sum2 = 0;

        for (let u = 0; u <= 9; u++) {
          let multiplication2 = Number(num[u]) * (11 - u);
          sum2 += multiplication2;
        }

        let result2 = (sum2 * 10) % 11;
        if (result2 >= 10) {
          result2 = 0;
        }

        if (result2 === Number(num[10])) {
          return num;
        }
      }
    }

    return false;
  };

  const contactValidation = (raw) => {
    const num = String(raw).replace(/\D/g, "");

    const numDDD = Number(`${num[0]}${num[1]}`);

    const ddds = [
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      21,
      22,
      24,
      27,
      28,
      31,
      32,
      33,
      34,
      35,
      37,
      38,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      51,
      53,
      54,
      55,
      61,
      62,
      63,
      64,
      65,
      66,
      67,
      68,
      69,
      71,
      73,
      74,
      75,
      77,
      79,
      81,
      82,
      83,
      84,
      85,
      86,
      87,
      88,
      89,
      91,
      92,
      93,
      94,
      95,
      96,
      97,
      98,
      99,
    ];

    if (num.length === 11 && ddds.includes(numDDD)) {
      return num;
    }
    return false;
  };

  const emailValidation = (raw) => {
    const pattern = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    const valid = pattern.test(raw);
    if (valid) {
      return true;
    }

    return false;
  };

  const randomKeyValidation = (raw) => {
    const keyValue = raw.trim().replace(/-/g, "");

    if (keyValue.length === 32) {
      const pattern = /^[a-zA-Z0-9]*$/;
      const valid = pattern.test(keyValue);
      if (valid) {
        return true;
      }
    }

    return false;
  };

  const fourWayValidation = (event) => {
    event.preventDefault();
    setCurrentKey(event.target.value);

    const cpf = cpfValidation(event.target.value);
    const contact = contactValidation(event.target.value);
    const email = emailValidation(event.target.value);
    const key = randomKeyValidation(event.target.value);

    if (cpf && !contact) {
      const formattedCpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
        6,
        9
      )}-${cpf.slice(9)}`;
      setCurrentKey(formattedCpf);
    } else if (contact && !cpf) {
      const formattedContact = `(${contact.slice(0, 2)}) ${
        contact[2]
      } ${contact.slice(3, 7)}-${contact.slice(7)}`;
      setCurrentKey(formattedContact);
    } else if (!cpf && !contact && !email && !key && !firstTry) {
      setValidationError("Aparentemente a chave digitada não é válida.");
    }
  };

  const number = "539.529.010-91";
  console.log("contact", contactValidation(number));
  console.log("cpf", cpfValidation(number));

  return (
    <ThemeProvider theme={theme}>
      <StyledAppBar />
      <Container className={classes.container}>
        <form>
          <Typography variant="h5" gutterBottom>
            Descreva sua necessidade
          </Typography>
          <TextField
            onChange={(event) => setNecessity(event.target.value)}
            value={necessity}
            variant="outlined"
            multiline
            rows="7"
            fullWidth
            required
          />
          <FormHelperText gutterBottom>
            Descrever em detalhes pode aumentar suas chances de encontrar um
            doador para ajuda-lo
          </FormHelperText>
          <Typography variant="h5" gutterBottom>
            Digite sua chave PIX
          </Typography>
          <TextField
            onChange={fourWayValidation}
            value={currentKey}
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
      </Container>
    </ThemeProvider>
  );
};

export default App;
