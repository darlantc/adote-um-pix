import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

import { formatDate } from "../utils/formatting";
import Default from "../assets/images/defaultUserPhoto.png";

const UserRequestFullInfoDisplay = ({ request }) => {
    const { user, createdAt, description } = request;

    const userFullInfo = "getUser";

    const { photoUrl, name, linkedIn, bio } = userFullInfo;

    const userImage = photoUrl ? photoUrl : Default;
    return (
        <Box>
            <Typography variant="h5">{formatDate(createdAt)}</Typography>
            <img src={userImage} alt="userImage" />
            <Typography variant="h2">{name}</Typography>
            <a href={linkedIn}>
                <Typography variant="h4">{linkedIn}</Typography>
            </a>
            <Typography variant="body1">{bio}</Typography>
            <Box>
                <Typography variant="h6">{description} </Typography>
                <Typography variant="h5">{pixKey} </Typography>
            </Box>
        </Box>
    );
};

export default UserRequestFullInfoDisplay;
