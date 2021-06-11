import { TextField, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

import DefaultUserPhoto from "../assets/images/defaultUserPhoto.png";
import { useState } from "react";

const useStyles = makeStyles(() => ({
    textField: {
        backgroundColor: "#FFFFFF",
        borderRadius: "5px",
        margin: "5px",
    },
}));

const ProfileInfo = () => {
    const classes = useStyles();

    const [foto, setFoto] = useState();
    const [nome, setNome] = useState("");
    const [bio, setBio] = useState("");
    const [linkedIn, setLinkedIn] = useState("");

    const handleFile = (event) => {
        if (event.target.files[0]) {
            const image = event.target.files[0];

            if (image.type === "image/jpeg" || image.type === "image/png") {
                setFoto(URL.createObjectURL(image));
            } else {
                alert("Envie uma imagem do tipo PNG ou JPEG");
            }
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyItems="center"
            alignItems="center"
        >
            <Box>
                <label htmlFor="foto" style={{ cursor: "pointer" }}>
                    <input
                        id="foto"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFile}
                    />
                    {foto ? (
                        <img
                            style={{
                                width: "200px",
                                height: "200px",
                                borderRadius: "50%",
                                margin: "5px",
                                objectFit: "cover",
                            }}
                            src={foto}
                            alt="user"
                        />
                    ) : (
                        <img
                            style={{
                                width: "200px",
                                height: "200px",
                                borderRadius: "50%",
                                margin: "5px",
                            }}
                            src={DefaultUserPhoto}
                            alt="user"
                        />
                    )}
                </label>
            </Box>

            <TextField
                className={classes.textField}
                value={nome}
                onChange={(event) => {
                    setNome(event.target.value);
                }}
                justify="center"
                placeholder="Nome de Usuário"
                variant="outlined"
                size="small"
                fullWidth
            />
            <TextField
                className={classes.textField}
                value={bio}
                onChange={(event) => {
                    setBio(event.target.value);
                }}
                placeholder="Bio de Usuário"
                multiline
                rows="7"
                variant="outlined"
                size="small"
                fullWidth
            />
            <TextField
                className={classes.textField}
                value={linkedIn}
                onChange={(event) => {
                    setLinkedIn(event.target.value);
                }}
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
            <Box m={0.5}>
                <Button variant="outlined">Salvar Perfil</Button>
            </Box>
        </Box>
    );
};

export default ProfileInfo;
