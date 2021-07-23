import { Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { formatDate } from "../utils/formatting";

const useStyles = makeStyles(() => ({
    adoteButton: {
        backgroundColor: "#0088AA",
        color: "#FFFFFF",
        marginTop: "10px",
    },
    adoteBox: {
        backgroundColor: "#00CCFF",
        color: "#FFFFFF",
        borderRadius: "7px",
        border: "2px",
        borderColor: "#0088AA",
        padding: "10px",
        maxWidth: "655px",
        margin: "5px",
    },
}));

const UserRequestDisplayForAdoption = ({ request }) => {
    const classes = useStyles();

    const { name, timestamp, description } = request;

    return (
        <Box className={classes.adoteBox}>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="h5">{formatDate(timestamp)}</Typography>
            <p>{description}</p>
        </Box>
    );
};

export default UserRequestDisplayForAdoption;