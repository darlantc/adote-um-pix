import { Button } from "@material-ui/core";

const EmailRedirectButton = ({ href, src, alt }) => {
  return (
    <a href={href} style={{ textDecoration: "none", margin: "5px" }}>
      <Button variant="outlined" size="medium" fullWidth>
        <img src={src} alt={alt} />
      </Button>
    </a>
  );
};

export default EmailRedirectButton;
