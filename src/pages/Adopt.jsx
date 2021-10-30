import { Typography, Box } from "@material-ui/core";
import { useEffect } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import UserRequestDisplayForAdoption from "../components/UserRequestDisplayForAdoption";
import LoadingAnimation from "../components/LoadingAnimation";

const Adopt = observer(() => {
    const { userRequestStore } = useMainStoreContext();
    const { userRequests, getUserRequests, isFetching } = userRequestStore;

    useEffect(() => {
        getUserRequests();
    }, [getUserRequests]);

    if (isFetching) {
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
                {userRequests?.map((request) => {
                    return <UserRequestDisplayForAdoption request={request} key={request.id} />;
                })}
                {userRequests.length === 0 && (
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
