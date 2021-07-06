import { TextField, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { useState, useEffect } from "react";
import { observer } from "mobx-react";

import DefaultUserPhoto from "../assets/images/defaultUserPhoto.png";
import { useMainStoreContext } from "../contexts/mainStoreContext";
import { formatLinkedIn } from "../utils/formatting";

const useStyles = makeStyles(() => ({
    textField: {
        backgroundColor: "#FFFFFF",
        borderRadius: "5px",
        margin: "5px",
    },
}));

const ProfileInfo = observer(() => {
    const { authStore } = useMainStoreContext();
    const { loggedUserProfile, handleUserDataUpdate, handlePhotoUpload } = authStore;

    const classes = useStyles();

    const [currentImage, setCurrentImage] = useState(
        (loggedUserProfile && loggedUserProfile.photoUrl) || DefaultUserPhoto
    );
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [linkedIn, setLinkedIn] = useState("");

    useEffect(() => {
        if (loggedUserProfile) {
            setName(loggedUserProfile.name);
            setBio(loggedUserProfile.bio);
            setLinkedIn(loggedUserProfile.linkedIn);
        }
    }, [loggedUserProfile]);

    useEffect(() => {
        const formattedLinkedIn = formatLinkedIn(linkedIn);
        if (formattedLinkedIn) {
            setLinkedIn(formattedLinkedIn);
        }
    }, [linkedIn]);

    const handleFile = (event) => {
        if (event.target.files[0]) {
            const image = event.target.files[0];

            if (["image/jpeg", "image/png"].includes(image.type)) {
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
            handleUserDataUpdate(name, bio, linkedIn);
        }
    };

    return (
        <>
            <Box display="flex" justifyContent="center">
                <label htmlFor="photo" style={{ cursor: "pointer" }}>
                    <input id="photo" type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
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
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                    justify="center"
                    placeholder="Seu nome completo"
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
                    placeholder="Biografia"
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
                    placeholder="LinkedIn"
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
        </>
    );
});

export default ProfileInfo;
