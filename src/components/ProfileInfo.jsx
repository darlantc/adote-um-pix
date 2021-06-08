import { TextField, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { observer } from "mobx-react";

import DefaultUserPhoto from "../assets/images/defaultUserPhoto.png";
import { useEffect, useState } from "react";
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
    const { loggedUserProfile, handleUserDataUpdate, handlePhotoUpload } =
        authStore;

    const classes = useStyles();

    const [currentImage, setCurrentImage] = useState(
        loggedUserProfile.photoUrl || DefaultUserPhoto
    );
    const [fullName, setFullName] = useState(loggedUserProfile.fullName || "");
    const [bio, setBio] = useState(loggedUserProfile.bio || "");
    const [linkedIn, setLinkedIn] = useState(loggedUserProfile.linkedIn || "");

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
        if (loggedUserProfile) {
            handleUserDataUpdate(fullName, bio, linkedIn);

            setFullName("");
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
                    value={fullName}
                    onChange={(event) => {
                        setFullName(event.target.value);
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
                    placeholder="Bio"
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
                    <Button type="submit" variant="outlined">
                        Salvar Perfil
                    </Button>
                </Box>
            </form>
        </div>
    );
});

export default ProfileInfo;
