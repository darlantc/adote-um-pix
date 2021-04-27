const classes = {
  logo: {
    margin: 10,
    width: 40,
    height: 40,
    objectFit: "cover",
  },
};

const Logo = () => (
  <img
    src="./assets/utility/adote-um-pix-logo.svg"
    className={classes.logo}
    alt="logo"
  />
);

export default Logo;
