import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Card, Typography, Grid, Avatar } from "@material-ui/core";

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
                    <Grid container item xs={12}>
                        <Grid container item xs={1}>
                            <Avatar className={classes.orange}>N</Avatar>
                        </Grid>

                        {userProfile && (
                            <Typography variant="h5" component="h2" gutterBottom>
                                {userProfile.name}
                            </Typography>
                        )}
                    </Grid>
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
