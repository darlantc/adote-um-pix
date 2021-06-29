import { Typography, Button, Grid, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import SubjectIcon from "@material-ui/icons/Subject";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { makeStyles } from "@material-ui/core/styles";
import { APP_ROUTES } from "../routes/Routes";

const useStyles = makeStyles((theme) => ({
    adoteButton: {
        backgroundColor: "#0088AA",
        color: "#FFFFFF",
        marginTop: "10px",
    },
    adoteBox: {
        backgroundColor: "#00CCFF",
        color: "#FFFFFF",
        borderRadius: "7px",
        border: "2px",
        borderColor: "#0088AA",
        padding: "10px",
    },
    soliciteButton: {
        backgroundColor: "#2CA089",
        color: "#FFFFFF",
        marginTop: "10px",
    },
    soliciteBox: {
        backgroundColor: "#00D4AA",
        color: "#FFFFFF",
        borderRadius: "7px",
        borderColor: "#2CA089",
        padding: "10px",
    },
    infoDisplay: {
        margin: "10px",
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    infoItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    gridContainer: {
        marginTop: "10px",
        display: "flex",
        justifyContent: "center",
    },
    gridItem: {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
    },
}));

const Homepage = () => {
    const classes = useStyles();

    return (
        <>
            <Typography variant="h3">Adote um PIX</Typography>
            <Typography variant="h6" gutterBottom>
                Aproximando grandes corações e boas oportunidades.
            </Typography>
            <Grid container className={classes.infoDisplay} spacing={4}>
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
            <Grid container className={classes.gridContainer} spacing={4}>
                <Grid item className={classes.gridItem}>
                    <Box className={classes.soliciteBox}>
                        <Typography variant="h5" gutterBottom>
                            Como obter ajuda?
                        </Typography>

                        <p data-testid="need-help">
                            Está precisando daquele empurrãozinho para voltar ao mercado de trabalho? Compartilhe a sua
                            necessidade conosco. Nós da Adote um PIX acolhemos e conectamos a sua história com alguém
                            que pode te ajudar.
                        </p>

                        <Box display="flex" justifyContent="center">
                            <Button
                                className={classes.soliciteButton}
                                variant="outlined"
                                component={Link}
                                to={APP_ROUTES.request}
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

                        <p data-testid="can-help">
                            Está com disponibilidade financeira e o coração aberto para contribuir com aquele salve que
                            pode mudar a trajetória de alguém? Faça parte do nosso time de padrinhos PIX. Com certeza
                            tem alguém aqui acreditando em você.
                        </p>

                        <Box display="flex" justifyContent="center">
                            <Button
                                className={classes.adoteButton}
                                variant="outlined"
                                component={Link}
                                to={APP_ROUTES.adopt}
                            >
                                Adote
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default Homepage;
