import { IconButton, Typography, Grid, Button, Box } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { observer } from "mobx-react";
import { useEffect } from "react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import UserRequestDisplayForApproval from "./UserRequestDisplayForApproval";
import useUserProfile from "../hooks/useUserProfile";
import LoadingAnimation from "./LoadingAnimation";

const UserRequestApprovalSection = observer(() => {
    const { userRolesStore } = useMainStoreContext();
    const {
        isLoadingRequests,
        getRequestsToEvaluate,
        requestsToEvaluate,
        approveRequest,
        denyRequest,
        selectedRequest,
        requestIndex,
        increaseRequestIndex,
        decreaseRequestIndex,
    } = userRolesStore;

    useEffect(() => {
        async function updateRequests() {
            await getRequestsToEvaluate();
        }
        updateRequests();
    }, [getRequestsToEvaluate]);

    const { isLoading: isLoadingUserProfile, userProfile } = useUserProfile(selectedRequest?.user?.id);

    const displayNextRequest = () => {
        increaseRequestIndex();
    };

    const displayPreviousRequest = () => {
        decreaseRequestIndex();
    };

    if (isLoadingRequests || isLoadingUserProfile) {
        return <LoadingAnimation />;
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

    return (
        <Box flexDirection="column" m={2} width="100%" height="100%" alignItems="flex-start">
            <Typography variant="h3" gutterBottom>
                Aprovação de Requisições
            </Typography>
            <Grid container item xs={12} justify="flex-end">
                <Typography variant="h5">
                    {requestIndex}º de {requestsToEvaluate.length}
                </Typography>
            </Grid>
            <Grid container item xs={12} justify="space-evenly">
                <UserRequestDisplayForApproval userProfile={userProfile} request={selectedRequest} />
                <Box display="flex">
                    <Box m={1}>
                        <Button variant="contained" color="primary" size="small" onClick={approveRequest}>
                            Aprovar
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button variant="contained" color="secondary" size="small" onClick={denyRequest}>
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
        </Box>
    );
});

export default UserRequestApprovalSection;
