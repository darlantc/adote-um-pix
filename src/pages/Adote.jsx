import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Adote = () => {
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Adote
      </Typography>
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
        to="/solicite"
      >
        Solicite
      </Button>
    </div>
  );
};

export default Adote;
