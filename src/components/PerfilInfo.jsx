import { TextField, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

import DefaultUserPhoto from "../assets/images/defaultUserPhoto.png";

const useStyles = makeStyles(() => ({
  textField: {
    backgroundColor: "#FFFFFF",
    borderRadius: "5px",
    margin: "5px",
  },
}));

const PerfilInfo = () => {
  const classes = useStyles();

  return (
    <Box
      fullWidth
      display="flex"
      flexDirection="column"
      justifyItems="center"
      alignItems="center"
    >
      <img
        style={{ width: "50%", borderRadius: "50%", margin: "10px" }}
        src={DefaultUserPhoto}
        alt="user"
      />
      <TextField
        className={classes.textField}
        justify="center"
        placeholder="Nome de Usuário"
        variant="outlined"
        size="small"
        fullWidth
      />
      <TextField
        className={classes.textField}
        placeholder="Bio de Usuário"
        multiline
        rows="7"
        variant="outlined"
        size="small"
        fullWidth
      />
      <TextField
        className={classes.textField}
        placeholder="Perfil LinkedIn"
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkedInIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default PerfilInfo;
