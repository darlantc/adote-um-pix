import { Typography, Button, Box, FormHelperText } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { observer } from "mobx-react";

import { APP_ROUTES } from "../routes/Routes";
import ProfileInfo from "../components/ProfileInfo";
import { useMainStoreContext } from "../contexts/mainStoreContext";

const useStyles = makeStyles(() => ({
    button: {
        width: "95%",
        margin: "5px",
    },
}));

const Perfil = observer(() => {
    const { authStore } = useMainStoreContext();
    const { loggedUserProfile } = authStore;

    const classes = useStyles();

    const getEngajamento = () => {
        let result = 0;
        if (loggedUserProfile) {
            if (loggedUserProfile.photoUrl) {
                result += 25;
            }
            if (loggedUserProfile.fullName) {
                result += 25;
            }
            if (loggedUserProfile.bio) {
                result += 25;
            }
            if (loggedUserProfile.linkedIn) {
                result += 25;
            }
        }

        return result;
    };

    const engajamento = getEngajamento();

    const getNivel = () => {
        if (engajamento <= 24) {
            return "Baixo";
        } else if (24 < engajamento < 49) {
            return "Moderado";
        } else if (50 < engajamento < 74) {
            return "Bom";
        }
        return "Alto";
    };

    const nivel = getNivel();

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

                <Box width="90%" margin="10px">
                    <Typography
                        align="center"
                        id="potecial-de-perfil"
                        gutterBottom
                    >
                        Engajamento: {nivel}
                    </Typography>
                    <Slider
                        value={engajamento}
                        aria-labelledby="potecial-de-perfil"
                    />
                </Box>

                <FormHelperText variant="outlined">
                    O preenchimento dos campos do seu perfil possibilitam um
                    maior engajamento do nosso time de doadores, preencha todos
                    os campos e deixe que eles te conheçam melhor!
                </FormHelperText>
            </Box>

            <Box width="65%">
                <ProfileInfo />
            </Box>
        </Box>
    );
});

export default Perfil;
