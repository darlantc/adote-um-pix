import { Typography, Button, Grid, Box, Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import SubjectIcon from "@material-ui/icons/Subject";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";

import useStyles from "../assets/styles/jss/styles";

const Homepage = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h3">Adote um PIX</Typography>
      <Typography variant="h6" gutterBottom>
        Aproximando grandes corações e boas oportunidades.
      </Typography>
      <Grid container className={classes.infoDisplay} spacing="4">
        <Grid item className={classes.infoItem}>
          <SubjectIcon />
          <Typography variant="h6">{`${"23"} Histórias`}</Typography>
        </Grid>

        <Grid item className={classes.infoItem}>
          <FavoriteBorderIcon />
          <Typography variant="h6">{`${"4"} Padrinhos`}</Typography>
        </Grid>

        <Grid item className={classes.infoItem}>
          <DoneOutlineIcon />
          <Typography variant="h6">{`${"7"} Conexões`}</Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.gridContainer} spacing="4">
        <Grid item className={classes.gridItem}>
          <Box className={classes.soliciteBox}>
            <Typography variant="h5" gutterBottom>
              Como obter ajuda?
            </Typography>

            <Typography variant="p" gutterBottom>
              Está precisando daquele empurrãozinho para voltar ao mercado de
              trabalho? Compartilhe a sua necessidade conosco. Nós da Adote um
              PIX acolhemos e conectamos a sua história com alguém que pode te
              ajudar.
            </Typography>

            <Box display="flex" justifyContent="center" fullWidth>
              <Button
                className={classes.soliciteButton}
                variant="outlined"
                component={Link}
                to="/solicite"
              >
                Solicite
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item className={classes.gridItem}>
          <Box className={classes.adoteBox}>
            <Typography variant="h5" gutterBottom>
              Como ajudar?
            </Typography>

            <Typography variant="p" gutterBottom>
              Está com disponibilida finaceira e o coração aberto para
              contribuir com aquele salve que pode mudar a trajetória de alguém?
              Faça parte do nosso time de padrinhos PIX. Com certeza tem alguém
              aqui acreditando em você.
            </Typography>

            <Box display="flex" justifyContent="center" fullWidth>
              <Button
                className={classes.adoteButton}
                variant="outlined"
                component={Link}
                to="/adote"
              >
                Adote
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Homepage;
