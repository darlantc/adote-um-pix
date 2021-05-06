import { withStyles } from "@material-ui/core/styles";

import LogoImage from "../assets/images/adote-um-pix-logo.svg";

const styles = {
  logo: {
    margin: 10,
    width: 40,
    height: 40,
    objectFit: "cover",
  },
};

const Logo = ({ classes }) => (
  <img src={LogoImage} className={classes.logo} alt="logo" />
);

export default withStyles(styles)(Logo);
