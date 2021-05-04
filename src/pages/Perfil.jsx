import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Perfil = () => {
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Perfil
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
        to="/solicite"
      >
        Solicite
      </Button>
      <Button
        variant="outlined"
        style={{ textDecoration: "none" }}
        component={Link}
        to="/adote"
      >
        Adote
      </Button>
    </div>
  );
};

export default Perfil;
