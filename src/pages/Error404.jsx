import { Typography, Grid, Box, Button } from "@material-ui/core";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import NotFound from "../assets/images/adote-um-pix-not-found.svg";
import { APP_ROUTES } from "../routes/Routes";

const useStyles = makeStyles((theme) => ({
    adoteButton: {
        backgroundColor: "#0088AA",
        color: "#FFFFFF",
        marginTop: 10,
    },
    adoteBox: {
        backgroundColor: "#00CCFF",
        color: "#FFFFFF",
        borderRadius: "7px",
        border: "2px",
        borderColor: "#0088AA",
        padding: 10,
    },
    soliciteButton: {
        backgroundColor: "#2CA089",
        color: "#FFFFFF",
        marginTop: 10,
    },
    soliciteBox: {
        backgroundColor: "#00D4AA",
        color: "#FFFFFF",
        borderRadius: "7px",
        borderColor: "#2CA089",
        padding: 10,
    },
    gridContainer: {
        marginTop: 10,
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

const Error404 = observer(() => {
    const classes = useStyles();

    return (
        <>
            <Typography variant="h5" gutterBottom>
                A página que você está procurando não existe.
            </Typography>
            <div
                style={{
                    width: "100%",
                    height: 250,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "15px",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                }}
            >
                <img src={NotFound} style={{ width: "150px" }} alt="Página não encontrada" />
            </div>
            <Grid container className={classes.gridContainer} spacing={4}>
                <Grid item className={classes.gridItem}>
                    <Box className={classes.soliciteBox}>
                        <Typography variant="h5">Precisa de ajuda?</Typography>

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
                        <Typography variant="h5">Quer ajudar?</Typography>

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
});

export default Error404;
