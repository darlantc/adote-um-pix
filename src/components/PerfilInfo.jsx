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

const PerfilInfo = observer(() => {
  const { authStore } = useMainStoreContext();
  const { loggedUser, handleUserDataUpdate, handlePhotoUpload } = authStore;
  console.log(loggedUser);

  const classes = useStyles();

  const [photo, setPhoto] = useState();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [linkedIn, setLinkedIn] = useState("");

  let currentImage = DefaultUserPhoto;
  if (loggedUser && loggedUser.photoURL) {
    currentImage = loggedUser.photoURL;
  }

  const handleFile = (event) => {
    if (event.target.files[0]) {
      const image = event.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        setPhoto(URL.createObjectURL(image));
      } else {
        alert("Envie uma imagem do tipo PNG ou JPEG");
      }
    }
  };

  const didUpdatePhoto = (event) => {
    event.preventDefault();
    if (loggedUser) {
      handlePhotoUpload(photo, loggedUser.uid);
    }
  };

  const didUpdateProfile = (event) => {
    event.preventDefault();
    if (loggedUser) {
      handleUserDataUpdate(loggedUser.uid, name, bio, linkedIn);
      console.log(
        "🚀 ~ file: PerfilInfo.jsx ~ line 33 ~ PerfilInfo ~ loggedUser",
        loggedUser
      );

      setName("");
      setBio("");
      setLinkedIn("");
    }
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
        }}
        onSubmit={didUpdatePhoto}
      >
        <Box>
          <label for="photo" style={{ cursor: "pointer" }}>
            <input
              id="photo"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFile}
            />
            {photo ? (
              <img
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  margin: "5px",
                  objectFit: "cover",
                }}
                src={photo}
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
                src={currentImage}
                alt="user"
              />
            )}
          </label>
        </Box>
        <Box m={0.5}>
          <Button type="submit" variant="outlined">
            Salvar Foto
          </Button>
        </Box>
      </form>

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
          placeholder={
            loggedUser && loggedUser.name ? loggedUser.name : "Nome de Usuário"
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
          placeholder={loggedUser && loggedUser.bio ? loggedUser.bio : "Bio"}
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

export default PerfilInfo;
