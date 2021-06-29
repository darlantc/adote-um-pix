import { Button } from "@material-ui/core";

const EmailRedirectButton = ({ href, image, title }) => {
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
                <img src={image} alt={title} style={{ width: "200px" }} />
            </Button>
        </a>
    );
};

export default EmailRedirectButton;
