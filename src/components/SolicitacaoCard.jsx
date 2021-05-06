import { Typography, Button, Box, Paper, CardContent } from "@material-ui/core";

const SolicitacaoCard = ({ item, edit }) => {
  const { descricao, chavePix, timestamp, status } = item;

  function timeConverter(stamp) {
    var a = new Date(stamp);
    var months = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      hour +
      ":" +
      min +
      ":" +
      sec +
      " - " +
      date +
      " / " +
      month +
      " / " +
      year;
    return time;
  }

  return (
    <Paper variant="outlined" elevation={3}>
      <Box p={1}>
        <Box display="flex" justifyContent="space-between" fullWidth>
          <Typography variant="h5" gutterBottom>
            Solicitação
          </Typography>
          <Typography variant="h6">{timeConverter(timestamp)}</Typography>
        </Box>
        <Typography variant="h6" gutterBottom>{`- ${status} -`}</Typography>
        <Typography variant="p" gutterBottom>
          {descricao}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Chave{`: ${chavePix}`}
        </Typography>

        <Box display="flex" justifyContent="center" fullWidth>
          <Button variant="outlined" onClick={edit}>
            Editar Solicitação
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default SolicitacaoCard;
