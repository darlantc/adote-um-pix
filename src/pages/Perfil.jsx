import { Typography, Button, Box, FormHelperText } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";

import { APP_ROUTES } from "../routes/Routes";
import PerfilInfo from "../components/PerfilInfo";

const useStyles = makeStyles(() => ({
    button: {
        width: "95%",
        margin: "5px",
    },
}));

const Perfil = observer(() => {
    const classes = useStyles();

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
                    to={APP_ROUTES.myRequests}
                >
                    Solicitações
                </Button>
                <Button
                    className={classes.button}
                    variant="outlined"
                    component={Link}
                    to={APP_ROUTES.myContributions}
                >
                    Contribuições
                </Button>

                <FormHelperText variant="outlined">
                    O preenchimento dos campos do seu perfil possibilitam um
                    maior engajamento do nosso time de doadores, preencha todos
                    os campos e deixe que eles te conheçam melhor!
                </FormHelperText>
            </Box>

            <Box width="65%">
                <PerfilInfo />
            </Box>
        </Box>
    );
});

export default Perfil;
