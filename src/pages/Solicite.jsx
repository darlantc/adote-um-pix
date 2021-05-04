import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import UserRequestForm from "../components/forms/UserRequestForm";

const Solicite = () => {
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Solicite
      </Typography>
      <Button
        variant="outlined"
        style={{ textDecoration: "none" }}
        component={Link}
        to="/"
      >
        Home
      </Button>
      <Button
        variant="outlined"
        style={{ textDecoration: "none" }}
        component={Link}
        to="/perfil"
      >
        Perfil
      </Button>
      <Button
        variant="outlined"
        style={{ textDecoration: "none" }}
        component={Link}
        to="/adote"
      >
        Adote
      </Button>
      <UserRequestForm />
    </div>
  );
};

export default Solicite;
