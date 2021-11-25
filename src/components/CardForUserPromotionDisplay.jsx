import { Typography, Button, Box } from "@material-ui/core";

const CardForUserPromotionDisplay = ({
    display,
    flexDirection,
    image,
    imageSize,
    fullName,
    bio,
    buttonAction,
    buttonTitle,
    justify,
}) => {
    return (
        <Box
            display={display}
            flexDirection={flexDirection}
            bgcolor={"rgba(220, 220, 220, 0.4)"}
            m={1}
            p={1}
            borderRadius="7px"
            justifyContent={justify}
            alignItems="center"
        >
            <img
                src={image}
                alt="Imagem de usuário"
                style={{
                    width: imageSize,
                    height: imageSize,
                    margin: "5px",
                    marginRight: "10px",
                    borderRadius: "50%",
                }}
            />
            <div
                m={2}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                }}
            >
                <Typography variant="h5">{fullName}</Typography>
                <Typography variant="h6">{bio}</Typography>
            </div>
            <Box
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <Button color="primary" onClick={buttonAction}>
                    {buttonTitle}
                </Button>
            </Box>
        </Box>
    );
};

export default CardForUserPromotionDisplay;
