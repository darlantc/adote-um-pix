import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Typography, Grid, Avatar } from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { useState } from "react";

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

export default function ApprovalsPage({ requestsList, onReject, onApprove }) {
    const classes = useStyles();
    const [index, setIndex] = useState(0);

    if (!requestsList) {
        return null;
    }

    if (requestsList.length < 1) {
        return (
            <Grid container justify="center">
                <Grid item xs={12}>
                    <Typography>Não existe nada para avaliar no momento.</Typography>
                </Grid>
            </Grid>
        );
    }

    const request = requestsList[index];

    // TODO: Nós temos o id do usuário em request.user.id
    // Em posse desse id eu preciso descobrir os dados do usuário
    // name, bio, email / phone

    return (
        <Grid container>
            <Grid container item xs={12} justify="flex-end">
                <Typography>
                    {index + 1} de {requestsList.length}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Card className={classes.root} aria-label="card">
                    <CardContent>
                        <Grid container item xs={12}>
                            <Avatar className={classes.orange}>N</Avatar>

                            {request.user.name && (
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {request.user.name}
                                </Typography>
                            )}
                        </Grid>
                        {(request.user.email || request.user.phone) && (
                            <Typography variant="h6">{request.user.email || request.user.phone}</Typography>
                        )}
                        <Typography variant="h6">Bio:</Typography>
                        <Typography>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos dolor voluptatum
                            recusandae suscipit facere sequi tempore, nobis quae commodi vel magni natus, magnam sit
                            dolorum, illum quibusdam aliquid. Eum, harum?
                        </Typography>
                        <Typography variant="h6">Descrição:</Typography>
                        <Typography>{request.description}</Typography>
                        <Typography>Chave Pix:</Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" size="small" onClick={onApprove}>
                            Aprovar
                        </Button>
                        <Button variant="contained" color="secondary" size="small" onClick={onReject}>
                            Recusar
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid container item xs={12}>
                <Grid container item xs={6} justify="flex-start">
                    {index > 0 && (
                        <IconButton variant="contained" color="primary" onClick={backRequest} aria-label="Voltar">
                            <ChevronLeft />
                        </IconButton>
                    )}
                </Grid>
                <Grid container item xs={6} justify="flex-end">
                    {requestsList.length > index + 1 && (
                        <IconButton variant="contained" color="primary" onClick={nextRequest} aria-label="Avançar">
                            <ChevronRight />
                        </IconButton>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );

    function nextRequest() {
        setIndex(index + 1);
    }
    function backRequest() {
        setIndex(index - 1);
    }
}
