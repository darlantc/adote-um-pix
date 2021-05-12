import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import UserRequestForm from "../components/forms/UserRequestForm";

const Solicite = () => {
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Solicite
      </Typography>
      <UserRequestForm />
    </div>
  );
};

export default Solicite;
