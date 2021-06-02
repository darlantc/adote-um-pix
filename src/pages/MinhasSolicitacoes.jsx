import { Typography, Box } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import { useState, useEffect } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import SolicitacaoCard from "../components/SolicitacaoCard";

const MinhasSolicitacoes = observer(() => {
  const { userRequestStore, authStore } = useMainStoreContext();
  const { userRequests, getUserRequests } = userRequestStore;
  const { loggedUser } = authStore;

  const [myRequests, setMyRequests] = useState([]);

  useEffect(() => {
    getUserRequests();
    if (userRequests && loggedUser) {
      const filtered = userRequests.filter((request) => {
        return request.userId === loggedUser.uid;
      });
      setMyRequests(filtered);
    }
  });

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Minhas Solicitações
      </Typography>
      <Box>
        {myRequests ? (
          <Carousel>
            {myRequests.map((request) => {
              return <SolicitacaoCard key={request.id} item={request} />;
            })}
          </Carousel>
        ) : (
          <Typography variant="h5">Nenhuma solicitação encontrada.</Typography>
        )}
      </Box>
    </div>
  );
});

export default MinhasSolicitacoes;
