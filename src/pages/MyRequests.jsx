import { Typography, Box } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import { useEffect } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import RequestCard from "../components/RequestCard";

const MyRequests = observer(() => {
    const { userRequestStore } = useMainStoreContext();
    const { userRequests, getUserRequests } = userRequestStore;

    useEffect(() => {
        getUserRequests();
    }, [getUserRequests]);

    return (
        <div>
            <Typography variant="h3" gutterBottom>
                Minhas Solicitações
            </Typography>
            <Box>
                {userRequests ? (
                    <Carousel>
                        {userRequests.map((request) => {
                            return <RequestCard key={request.id} item={request} />;
                        })}
                    </Carousel>
                ) : (
                    <Typography variant="h5">Nenhuma solicitação encontrada.</Typography>
                )}
            </Box>
        </div>
    );
});

export default MyRequests;
