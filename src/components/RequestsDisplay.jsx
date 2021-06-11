import { Typography, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { formatDate } from "../utils/formatting";

const useStyles = makeStyles((theme) => ({
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

const RequestsDisplay = ({ item }) => {
    const classes = useStyles();

    const { name, timestamp, description } = item;

    return (
        <Box className={classes.adoteBox}>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="h5">{formatDate(timestamp)}</Typography>
            <p>{description}</p>

            <Box display="flex" justifyContent="center">
                <Button
                    className={classes.adoteButton}
                    variant="outlined"
                    size="medium"
                >
                    Salvar
                </Button>
            </Box>
        </Box>
    );
};

export default RequestsDisplay;
