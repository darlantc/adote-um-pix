import { Typography, Box } from "@material-ui/core";
import { useEffect } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import RequestsDisplay from "../components/RequestsDisplay";

const Adopt = observer(() => {
    const { userRequestStore } = useMainStoreContext();
    const { userRequests, getUserRequests } = userRequestStore;

    useEffect(() => {
        getUserRequests();
    }, []);

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
                {userRequests &&
                    userRequests.map((request) => {
                        return (
                            <RequestsDisplay item={request} key={request.id} />
                        );
                    })}
            </Box>
        </div>
    );
});

export default Adopt;
