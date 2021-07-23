import { Typography, Box } from "@material-ui/core";
import { useEffect } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import UserRequestDisplayForAdoption from "../components/UserRequestDisplayForAdoption";

const Adopt = observer(() => {
    const { userRequestStore } = useMainStoreContext();
    const { userRequests, getUserRequests } = userRequestStore;
    console.log("🚀 userRequests", userRequests);

    useEffect(() => {
        getUserRequests();
    }, [getUserRequests]);

    return (
        <>
            <Typography variant="h3" gutterBottom>
                Adote
            </Typography>
            <Box margin="5px" maxWidth="700px" border="2px solid" borderRadius="7px">
                {userRequests.length > 0 ? (
                    userRequests.map((request) => {
                        return <UserRequestDisplayForAdoption request={request} key={request.id} />;
                    })
                ) : (
                    <Box
                        borderRadius={7}
                        bgcolor="background.paper"
                        display="flex"
                        padding="20px"
                        flexDirection="column"
                    >
                        <Typography variant="h5" align="center" gutterbottom>
                            Nenhuma solicitação encontrada, retorne mais tarde.
                        </Typography>
                    </Box>
                )}
            </Box>
        </>
    );
});

export default Adopt;
