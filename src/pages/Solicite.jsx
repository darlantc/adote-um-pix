import { Typography } from "@material-ui/core";

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
