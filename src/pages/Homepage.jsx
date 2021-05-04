import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Home
      </Typography>
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
    </div>
  );
};

export default Homepage;
