import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Card, Typography, Grid, Avatar, Box } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const UserRequestDisplayForApproval = ({ userProfile, request }) => {
    const classes = useStyles();

    if (!userProfile || !request) {
        return null;
    }

    return (
        <Grid item xs={12}>
            <Card className={classes.root} aria-label="card">
                <CardContent>
                    <Box display="flex" alignItems="center">
                        <Box m={1}>
                            <Avatar src={userProfile.photoUrl} className={classes.orange}>
                                {userProfile.fullName[0].toUpperCase()}
                            </Avatar>
                        </Box>
                        <Box m={1} display="flex" alignItems="center">
                            <Typography variant="h5" component="h2" gutterBottom>
                                {userProfile.fullName}
                            </Typography>
                        </Box>
                    </Box>
                    {userProfile && <Typography variant="h6">{userProfile.email || userProfile.phone}</Typography>}
                    <Typography variant="h6">Bio:</Typography>
                    <Typography variant="body1">{userProfile.bio}</Typography>
                    <Typography variant="h6">Descrição:</Typography>
                    <Typography variant="body1">{request.description}</Typography>
                    <Typography variant="h6">Chave Pix: {request.pixKey}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default UserRequestDisplayForApproval;
