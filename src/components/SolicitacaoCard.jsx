import { Typography, Button, Box, Paper } from "@material-ui/core";
import fromUnixTime from "date-fns/fromUnixTime";

const SolicitacaoCard = ({ item }) => {
  const { descricao, chavePix, timestamp, status } = item;

  const rawDate = String(fromUnixTime(timestamp));
  const requestDate = rawDate.slice(0, 25);

  return (
    <Paper variant="outlined" elevation={3}>
      <Box p={1}>
        <Box display="flex" justifyContent="space-between" fullWidth>
          <Typography variant="h5" gutterBottom>
            Solicitação
          </Typography>
          <Typography variant="h6">{requestDate}</Typography>
        </Box>
        <Typography variant="h6" gutterBottom>{`- ${status} -`}</Typography>
        <Typography variant="p" gutterBottom>
          {descricao}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Chave{`: ${chavePix}`}
        </Typography>

        <Box display="flex" justifyContent="center" fullWidth>
          <Button variant="outlined" onClick={""}>
            Editar Solicitação
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default SolicitacaoCard;
