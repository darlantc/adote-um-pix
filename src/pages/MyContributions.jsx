import { Typography } from "@material-ui/core";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";

const MyContributions = observer(() => {
    const { userRequestStore } = useMainStoreContext();
    const { userRequests } = userRequestStore;

    return (
        <>
            <Typography variant="h3">Minhas Contribuições</Typography>
            {userRequests.map()}
        </>
    );
});

export default MyContributions;
