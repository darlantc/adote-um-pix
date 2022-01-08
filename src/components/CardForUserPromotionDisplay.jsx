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
    width,
    extraMargin,
    cancelAction,
}) => {
    return (
        <Box
            display={display}
            flexDirection={flexDirection}
            bgcolor={"rgba(220, 220, 220, 0.4)"}
            marginTop={1}
            m={extraMargin}
            borderRadius="7px"
            justifyContent={justify}
            alignItems="center"
            width={width}
        >
            <Box
                m={1}
                display={display}
                flexDirection={flexDirection}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                }}
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
                <Typography variant="h6">{fullName}</Typography>
                <Typography variant="h6" align="center">
                    {bio}
                </Typography>
            </Box>
            <Box
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                }}
            >
                {cancelAction && (
                    <Button color="secondary" onClick={cancelAction} style={{ marginRight: "5px" }}>
                        Voltar
                    </Button>
                )}
                <Button color="primary" onClick={buttonAction}>
                    {buttonTitle}
                </Button>
            </Box>
        </Box>
    );
};

export default CardForUserPromotionDisplay;
