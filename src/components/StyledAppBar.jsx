import {
  Typography,
  AppBar,
  Toolbar,
  Box,
  ButtonBase,
  TextField,
  Modal,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { useState } from "react";

import Logo from "./Logo";

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
            <Box display="flex" alignItems="center">
              <Logo />
              <Typography variant="h4">Adote um PIX</Typography>
            </Box>

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
        <Box
          borderRadius={7}
          bgcolor="background.paper"
          position="absolute"
          top={120}
          left="50vw"
          marginLeft="-165px"
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box width={300} m={2}>
              <Typography variant="h6">Email</Typography>
              <TextField fullWidth required />
              <Typography variant="h6">Password</Typography>
              <TextField fullWidth required />
            </Box>

            <Typography> ou </Typography>

            <Box width={300} m={2}>
              <Typography variant="h6">Telefone</Typography>
              <TextField fullWidth required />
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};
export default StyledAppBar;
