import { TextField, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { observer } from "mobx-react";

import DefaultUserPhoto from "../assets/images/defaultUserPhoto.png";
import { useState } from "react";
import { useMainStoreContext } from "../contexts/mainStoreContext";

const useStyles = makeStyles(() => ({
    textField: {
        backgroundColor: "#FFFFFF",
        borderRadius: "5px",
        margin: "5px",
    },
}));

const ProfileInfo = observer(() => {
    const { authStore } = useMainStoreContext();
    const { loggedUser, handleUserDataUpdate, handlePhotoUpload } = authStore;

    const classes = useStyles();

    const [currentImage, setCurrentImage] = useState(DefaultUserPhoto);
    const [displayName, setDisplayName] = useState("");
    const [bio, setBio] = useState("");
    const [linkedIn, setLinkedIn] = useState("");

    const handleFile = (event) => {
        if (event.target.files[0]) {
            const image = event.target.files[0];

            if (image.type === "image/jpeg" || image.type === "image/png") {
                setCurrentImage(URL.createObjectURL(image));

                handlePhotoUpload(image);
            } else {
                alert("Envie uma imagem do tipo PNG ou JPEG");
            }
        }
    };

    const didUpdateProfile = (event) => {
        event.preventDefault();
        if (loggedUser) {
            handleUserDataUpdate(displayName, bio, linkedIn);

            setDisplayName("");
            setBio("");
            setLinkedIn("");
        }
    };

    return (
        <div>
            <Box display="flex" justifyContent="center">
                <label htmlFor="photo" style={{ cursor: "pointer" }}>
                    <input
                        id="photo"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFile}
                    />
                    <img
                        style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "50%",
                            margin: "5px",
                        }}
                        src={currentImage}
                        alt="user"
                    />
                </label>
            </Box>

            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyItems: "center",
                    alignItems: "center",
                }}
                onSubmit={didUpdateProfile}
            >
                <TextField
                    className={classes.textField}
                    value={displayName}
                    onChange={(event) => {
                        setDisplayName(event.target.value);
                    }}
                    justify="center"
                    placeholder={
                        loggedUser && loggedUser.displayName
                            ? loggedUser.displayName
                            : "Nome de Usuário"
                    }
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
                    placeholder={
                        loggedUser && loggedUser.bio ? loggedUser.bio : "Bio"
                    }
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
                    placeholder={
                        loggedUser && loggedUser.linkedIn
                            ? loggedUser.linkedIn
                            : "Perfil LinkedIn"
                    }
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
                    <Button type="submit" variant="outlined">
                        Salvar Perfil
                    </Button>
                </Box>
            </form>
        </div>
    );
});

export default ProfileInfo;
