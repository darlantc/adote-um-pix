import { makeStyles } from "@material-ui/core/styles";

import PixBackground from "../../images/pix-background.png";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4, 2, 4),
    maxWidth: "700px",
    backgroundImage: `url(${PixBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    height: "100%",
  },
  textField: {
    backgroundColor: "#FFFFFF",
    borderRadius: "5px",
  },
}));

export default useStyles;
