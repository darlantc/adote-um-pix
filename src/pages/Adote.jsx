import { Typography, Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import SolicitacoesDisplay from "../components/SolicitacoesDisplay";

const Adote = observer(() => {
    const { userRequestStore } = useMainStoreContext();
    const { userRequests, getUserRequests } = userRequestStore;

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        getUserRequests();
        console.log(
            "🚀 ~ file: Adote.jsx ~ line 17 ~ useEffect ~ userRequests",
            userRequests
        );
        if (userRequests) {
            setRequests(userRequests);
        }
    }, [userRequests, getUserRequests]);

    return (
        <div>
            <Typography variant="h3" gutterBottom>
                Adote
            </Typography>
            <Box
                margin="5px"
                maxWidth="700px"
                border="2px solid"
                borderRadius="7px"
            >
                {requests &&
                    requests.map((request) => {
                        return (
                            <SolicitacoesDisplay
                                item={request}
                                key={request.id}
                            />
                        );
                    })}
            </Box>
        </div>
    );
});

export default Adote;
