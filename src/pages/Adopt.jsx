import { Typography, Box } from "@material-ui/core";
import { useEffect } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import UserRequestDisplayForAdoption from "../components/UserRequestDisplayForAdoption";
import RequestForUserRequestsStatus from "../models/RequestForUserRequestsStatus";
import LoadingAnimation from "../components/LoadingAnimation";

const Adopt = observer(() => {
    const { userRequestStore } = useMainStoreContext();
    const { userRequests, getUserRequests, requestForUserRequestsStatus } = userRequestStore;

    useEffect(() => {
        getUserRequests();
    }, [getUserRequests]);

    if (requestForUserRequestsStatus === RequestForUserRequestsStatus.loading) {
        return <LoadingAnimation />;
    }

    return (
        <>
            <Typography variant="h3" gutterBottom>
                Adote
            </Typography>
            <Box
                margin="5px"
                borderRadius="7px"
                style={{
                    maxHeight: "70vh",
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {requestForUserRequestsStatus === RequestForUserRequestsStatus.finished &&
                    userRequests.map((request) => {
                        return <UserRequestDisplayForAdoption request={request} key={request.id} />;
                    })}
                {requestForUserRequestsStatus === RequestForUserRequestsStatus.noUserRequests && (
                    <Box
                        borderRadius={7}
                        bgcolor="background.paper"
                        display="flex"
                        padding="20px"
                        flexDirection="column"
                    >
                        <Typography variant="h5" align="center" gutterBottom>
                            Nenhuma solicitação encontrada, retorne mais tarde.
                        </Typography>
                    </Box>
                )}
            </Box>
        </>
    );
});

export default Adopt;
