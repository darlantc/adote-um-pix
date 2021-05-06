import {
  Typography,
  AppBar,
  Toolbar,
  Box,
  ButtonBase,
  Modal,
  Grid,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "./Logo";
import LoginForm from "./forms/LoginForm";

const PixAppBar = styled(AppBar)({
  background: "linear-gradient(45deg, #FFF 30%, #000000 90%)",
  color: "#000000",
  height: 60,
});

const RegistrationButton = styled(ButtonBase)({
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

const StyledAppBar = () => {
  const [displayModal, setDisplayModal] = useState(false);

  const openModal = (event) => {
    event.preventDefault();
    setDisplayModal(true);
  };

  const closeModal = () => {
    setDisplayModal(false);
  };

  return (
    <>
      <PixAppBar position="relative">
        <Toolbar>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <ButtonBase
              style={{ textDecoration: "none" }}
              component={Link}
              to="/"
            >
              <Box display="flex" alignItems="center">
                <Logo />
                <Typography variant="h4">Adote um PIX</Typography>
              </Box>
            </ButtonBase>

            <RegistrationButton variant="outlined" onClick={openModal}>
              Registre-se
            </RegistrationButton>
          </Box>
        </Toolbar>
      </PixAppBar>
      <Modal
        open={displayModal}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Box borderRadius={7} bgcolor="background.paper">
              <LoginForm />
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};
export default StyledAppBar;
