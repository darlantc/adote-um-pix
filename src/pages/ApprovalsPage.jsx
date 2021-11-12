import { IconButton, Typography, Grid, Button, Box } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { useMainStoreContext } from "../contexts/mainStoreContext";
import useUserProfile from "../hooks/useUserProfile";
import { useEffect, useState } from "react";

import LoadingAnimation from "../components/LoadingAnimation";
import UserRequestDisplayForApproval from "../components/UserRequestDisplayForApproval";
import { observer } from "mobx-react";

const ApprovalsPage = observer(() => {
    const { userRolesStore } = useMainStoreContext();
    const { getRequestsToEvaluate, requestsToEvaluate, approveRequest, denyRequest } = userRolesStore;

    const [requestIndex, setRequestIndex] = useState(0);
    const [request, setRequest] = useState(null);

    const { isLoading: isLoadingUserProfile, userProfile } = useUserProfile(request?.user?.id);

    useEffect(() => {
        async function updateRequests() {
            await getRequestsToEvaluate();
        }

        updateRequests();
        if (requestsToEvaluate.length > 0) {
            setRequest(requestsToEvaluate[requestIndex]);
        }
    }, [getRequestsToEvaluate, requestsToEvaluate, requestIndex]);

    if (!requestsToEvaluate) {
        return null;
    }

    function displayNextRequest() {
        if (requestIndex + 1 <= requestsToEvaluate.length - 1) {
            setRequestIndex(requestIndex + 1);
        } else {
            setRequestIndex(0);
        }
    }

    function displayPreviousRequest() {
        if (requestIndex - 1 >= 0) {
            setRequestIndex(requestIndex - 1);
        } else {
            setRequestIndex(requestsToEvaluate.length - 1);
        }
    }

    if (requestsToEvaluate.length < 1) {
        return (
            <Grid container justify="center">
                <Grid item xs={12}>
                    <Typography>Não existe nada para avaliar no momento.</Typography>
                </Grid>
            </Grid>
        );
    }

    if (isLoadingUserProfile) {
        return <LoadingAnimation />;
    }

    return (
        <Grid container>
            <Grid container item xs={12} justify="flex-end">
                <Typography variant="h5">
                    {requestIndex + 1} de {requestsToEvaluate.length}
                </Typography>
            </Grid>
            <Grid container item xs={12} justify="space-evenly">
                <UserRequestDisplayForApproval userProfile={userProfile} request={request} />
                <Box display="flex">
                    <Box m={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => approveRequest(request)}
                        >
                            Aprovar
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button variant="contained" color="secondary" size="small" onClick={() => denyRequest(request)}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Grid container item xs={12}>
                <Grid container item xs={6} justify="flex-start">
                    <IconButton
                        variant="contained"
                        color="primary"
                        onClick={displayPreviousRequest}
                        aria-label="Voltar"
                    >
                        <ChevronLeft />
                    </IconButton>
                </Grid>
                <Grid container item xs={6} justify="flex-end">
                    <IconButton variant="contained" color="primary" onClick={displayNextRequest} aria-label="Avançar">
                        <ChevronRight />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
});

export default ApprovalsPage;
