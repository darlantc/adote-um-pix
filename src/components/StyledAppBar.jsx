import { Typography, AppBar, Toolbar, Box, ButtonBase, Modal } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

import Logo from "./Logo";
import ModalEmailRequest from "./ModalEmailRequest";
import LoginForm from "./forms/LoginForm";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import { APP_ROUTES } from "../routes/Routes";

const PixAppBar = styled(AppBar)({
    background: "linear-gradient(45deg, #FFF 30%, #000000 90%)",
    color: "#000000",
    height: 60,
});

const RegistrationButton = styled(ButtonBase)({
    textDecoration: "none",
    border: "1px solid white",
    borderRadius: "3px",
    color: "#FFFFFF",
    fontFamily: "Original Surfer",
    height: "30px",
    width: "100px",
    trasition: "0.5s",
    opacity: "0.8",
    "&:hover": {
        opacity: "1",
    },
});

const StyledAppBar = observer(() => {
    const { authStore } = useMainStoreContext();
    const { isAuthenticated, isAnonymous, logout } = authStore;

    const [displayModal, setDisplayModal] = useState(false);

    const openModal = (event) => {
        event.preventDefault();
        setDisplayModal(true);
    };

    const closeModal = () => {
        setDisplayModal(false);
    };

    const didLogOut = (event) => {
        event.preventDefault();
        logout();
    };

    return (
        <>
            <PixAppBar position="relative">
                <Toolbar>
                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                        <ButtonBase style={{ textDecoration: "none" }} component={Link} to={APP_ROUTES.home}>
                            <Box display="flex" alignItems="center">
                                <Logo />
                                <Typography variant="h4">Adote um PIX</Typography>
                            </Box>
                        </ButtonBase>

                        {isAuthenticated && !isAnonymous ? (
                            <Box>
                                <Link to={APP_ROUTES.profile}>
                                    <RegistrationButton>Perfil</RegistrationButton>
                                </Link>
                                <RegistrationButton onClick={didLogOut}>Sair</RegistrationButton>
                            </Box>
                        ) : (
                            <RegistrationButton onClick={openModal}>Entre</RegistrationButton>
                        )}
                    </Box>
                </Toolbar>
            </PixAppBar>
            <Modal open={displayModal} onClose={closeModal}>
                <Box display="flex" justifyContent="center">
                    <Box borderRadius={7} position="absolute" top="15vh" bgcolor="background.paper">
                        <LoginForm />
                    </Box>
                </Box>
            </Modal>
            <ModalEmailRequest />
        </>
    );
});
export default StyledAppBar;
