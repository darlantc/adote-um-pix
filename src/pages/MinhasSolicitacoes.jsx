import { Typography, Box } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";

import SolicitacaoCard from "../components/SolicitacaoCard";

const MinhasSolicitacoes = () => {
  const solicitacoes = [
    {
      id: "3",
      status: "waitingForApproval",
      chavePix: "71982792321",
      descricao:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum ",
      timestamp: 1620276234582,
    },
    {
      id: "5",
      status: "waitingForApproval",
      chavePix: "06029908588",
      descricao:
        "Five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum ",
      timestamp: 1620276235030,
    },
    {
      id: "11",
      status: "waitingForApproval",
      chavePix: "joana@hotlinda.com",
      descricao:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
      timestamp: 1620276521252,
    },
  ];

  const edit = () => {};

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Minhas Solicitações
      </Typography>
      <Box>
        <Carousel>
          {solicitacoes.map((item, i) => {
            return <SolicitacaoCard key={i} item={item} edit={edit} />;
          })}
        </Carousel>
      </Box>
    </div>
  );
};

export default MinhasSolicitacoes;
