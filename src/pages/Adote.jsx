import { Typography, Box } from "@material-ui/core";
import SolicitacoesDisplay from "../components/SolicitacoesDisplay";

const Adote = () => {
  const solicitacoes = [
    {
      id: "3",
      status: "waitingForApproval",
      nome: "João Victor",
      chavePix: "71982792321",
      descricao:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum ",
      timestamp: 1620276234582,
    },
    {
      id: "5",
      status: "waitingForApproval",
      nome: "Ariel Santos",
      chavePix: "06029908588",
      descricao:
        "Five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum ",
      timestamp: 1620276235030,
    },
    {
      id: "11",
      status: "waitingForApproval",
      nome: "Joana Mello",
      chavePix: "joana@hotlinda.com",
      descricao:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
      timestamp: 1620276521252,
    },
  ];

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Adote
      </Typography>
      <Box margin="5px" maxWidth="700px" border="2px solid" borderRadius="7px">
        {solicitacoes.map((solicitacao) => {
          return <SolicitacoesDisplay item={solicitacao} />;
        })}
      </Box>
    </div>
  );
};

export default Adote;
