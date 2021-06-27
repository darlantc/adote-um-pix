import { Button } from "@material-ui/core";

const EmailRedirectButton = ({ href, src, alt }) => {
    return (
        <a
            href={href}
            style={{
                textDecoration: "none",
                margin: "5px",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Button variant="outlined" size="medium">
                <img src={src} alt={alt} style={{ width: "200px" }} />
            </Button>
        </a>
    );
};

export default EmailRedirectButton;
