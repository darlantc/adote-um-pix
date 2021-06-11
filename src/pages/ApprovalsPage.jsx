import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Typography, Grid } from "@material-ui/core";
import ChevronRight from "@material-ui/icons/ChevronRight";

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

export default function ApprovalsPage() {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid container item xs={12} justify="flex-end">
                <Typography>1/97</Typography>
            </Grid>
            <Grid item xs={12}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Nome da pessoa
                        </Typography>
                        <Typography variant="h6">Email/Telefone</Typography>
                        <Typography variant="h6">Bio:</Typography>
                        <Typography>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos dolor voluptatum
                            recusandae suscipit facere sequi tempore, nobis quae commodi vel magni natus, magnam sit
                            dolorum, illum quibusdam aliquid. Eum, harum?
                        </Typography>
                        <Typography variant="h6">Descrição:</Typography>
                        <Typography>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos dolor voluptatum
                            recusandae suscipit facere sequi tempore, nobis quae commodi vel magni natus, magnam sit
                            dolorum, illum quibusdam aliquid. Eum, harum?
                        </Typography>
                        <Typography>Chave Pix:</Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" size="small">
                            Aprovar
                        </Button>
                        <Button variant="contained" color="secondary" size="small">
                            Recusar
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid container item xs={12} justify="flex-end">
                <IconButton variant="contained" color="primary">
                    <ChevronRight />
                </IconButton>
            </Grid>
        </Grid>
    );
}
