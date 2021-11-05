import { IconButton, Typography, Grid, Button } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons/ChevronLeft";
import { useMainStoreContext } from "../contexts/mainStoreContext";
import useUserProfile from "../hooks/useUserProfile";
import { useEffect, useState } from "react";

import LoadingAnimation from "../components/LoadingAnimation";
import UserRequestDisplayForApproval from "../components/UserRequestDisplayForApproval";

export default function ApprovalsPage() {
    const { userRolesStore } = useMainStoreContext();
    const { getRequestsToEvaluate, requestsToEvaluate, approveRequest, denyRequest } = userRolesStore;

    const [requestIndex, setRequestIndex] = useState(0);
    const [request, setRequest] = useState(null);
    console.log("🚀 ~ file: ApprovalsPage.jsx ~ line 16 ~ ApprovalsPage ~ request", request);

    const { isLoading: isLoadingUserProfile, userProfile } = useUserProfile(request?.user?.id);
    console.log("🚀 ~ file: ApprovalsPage.jsx ~ line 18 ~ ApprovalsPage ~ userProfile", userProfile);

    useEffect(() => {
        async function updateRequests() {
            await getRequestsToEvaluate();
            console.log("🚀 ~ file: ApprovalsPage.jsx ~ line 24 ~ updateRequests ~ getRequestsToEvaluate");
        }

        updateRequests();
        if (requestsToEvaluate) {
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
            <Grid container item xs={12} justify="flex-end">
                <UserRequestDisplayForApproval userProfile={userProfile} request={request} />
                <Grid container item xs={12} justify="flex">
                    <Grid item xs={6} justify="flex">
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => approveRequest(request)}
                        >
                            Aprovar
                        </Button>
                    </Grid>
                    <Grid item xs={6} justify="flex">
                        <Button variant="contained" color="secondary" size="small" onClick={() => denyRequest(request)}>
                            Cancelar
                        </Button>
                    </Grid>
                </Grid>
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
}
