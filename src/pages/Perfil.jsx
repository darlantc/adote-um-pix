import { Typography, Button, Box, FormHelperText } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { useEffect, useState } from "react";

import PerfilInfo from "../components/PerfilInfo";

const useStyles = makeStyles(() => ({
  button: {
    width: "95%",
    margin: "5px",
  },
}));

const Perfil = () => {
  const classes = useStyles();

  const [engajamento, setEngajamento] = useState(50);
  const [nivel, setNivel] = useState("");

  useEffect(() => {
    if (engajamento <= 24) {
      setNivel("Baixo");
    } else if (24 < engajamento < 49) {
      setNivel("Moderado");
    } else if (50 < engajamento < 74) {
      setNivel("Bom");
    } else {
      setNivel("Alto");
    }
  }, [engajamento]);

  return (
    <Box display="flex" justifyContent="space-between">
      <Box width="35%">
        <Typography variant="h3" gutterBottom>
          Perfil
        </Typography>
        <Button
          className={classes.button}
          variant="outlined"
          component={Link}
          to="/minhassolicitacoes"
        >
          Solicitações
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          component={Link}
          to="/minhascontribuicoes"
        >
          Contribuições
        </Button>

        <Box width="90%" margin="10px">
          <Typography align="center" id="potecial-de-perfil" gutterBottom>
            {`Engajamento: ${nivel}`}
          </Typography>
          <Slider value={engajamento} aria-labelledby="potecial-de-perfil" />
        </Box>

        <FormHelperText variant="outlined" gutterBottom>
          O preenchimento dos campos do seu perfil possibilitam um maior
          engajamento do nosso time de doadores, preencha todos os campos e
          deixe que eles te conheçam melhor!
        </FormHelperText>
      </Box>

      <Box width="65%">
        <PerfilInfo />
      </Box>
    </Box>
  );
};

export default Perfil;
