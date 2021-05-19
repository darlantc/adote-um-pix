import { Typography, Button, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

import DefaultUserPhoto from "../assets/images/defaultUserPhoto.png";
import { APP_ROUTES } from "../routes/Routes";

const Perfil = () => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        <Typography variant="h3" gutterBottom>
          Perfil
        </Typography>
        <Button
          variant="outlined"
          style={{ textDecoration: "none" }}
          component={Link}
          to={APP_ROUTES.myRequests}
        >
          Minhas Solicitações
        </Button>
      </Box>

      <Box>
        <img
          style={{ width: "200px", borderRadius: "50%" }}
          src={DefaultUserPhoto}
          alt="user"
        ></img>
      </Box>
    </Box>
  );
};

export default Perfil;
