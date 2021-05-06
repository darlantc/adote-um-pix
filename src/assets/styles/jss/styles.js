import { makeStyles } from "@material-ui/core/styles";

import PixBackground from "../../images/pix-background.png";

const useStyles = makeStyles((theme) => ({
  paperBG: {
    backgroundColor: "#FFFFFF",
  },
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
  adoteButton: {
    backgroundColor: "#0088AA",
    color: "#FFFFFF",
    marginTop: "10px",
  },
  adoteBox: {
    backgroundColor: "#00CCFF",
    color: "#FFFFFF",
    borderRadius: "7px",
    border: "2px",
    borderColor: "#0088AA",
    padding: "10px",
  },
  soliciteButton: {
    backgroundColor: "#2CA089",
    color: "#FFFFFF",
    marginTop: "10px",
  },
  soliciteBox: {
    backgroundColor: "#00D4AA",
    color: "#FFFFFF",
    borderRadius: "7px",
    borderColor: "#2CA089",
    borderRadius: "7px",
    padding: "10px",
  },
  textField: {
    backgroundColor: "#FFFFFF",
    borderRadius: "5px",
  },
  infoDisplay: {
    margin: "10px",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  gridContainer: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
  },
  gridItem: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
}));

export default useStyles;
