import { Typography, Box } from "@material-ui/core";
import { useEffect } from "react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import LoadingAnimation from "../components/LoadingAnimation";
import UserPromotionModal from "../components/UserPromotionModal";

const UserPromotionSection = () => {
    const { userRolesStore } = useMainStoreContext();
    const { usersToPromote, getListOfUsersToPromote, isLoadingUsers } = userRolesStore;

    useEffect(() => {
        getListOfUsersToPromote();
    });

    if (isLoadingUsers) {
        return <LoadingAnimation />;
    }

    if (usersToPromote.length < 1) {
        return <Typography variant="h4">Não foram encontrados usuários elegíveis.</Typography>;
    }

    return (
        <>
            <Typography variant="h4" style={{ width: "100%" }}>
                {usersToPromote.length !== 1 ? "Foram encontrados" : "Foi encontrado"} {usersToPromote.length} usuário
                {usersToPromote.length !== 1 ? "s" : ""}
            </Typography>
            <Typography variant="h5">Selecione o usuário para ser promovido a administrador:</Typography>
            <Box m={3} maxHeight={200} display="flex" flexDirection="column" overflow="auto" width={"100%"}>
                {usersToPromote.map((user) => {
                    return <UserPromotionModal user={user} />;
                })}
            </Box>
        </>
    );
};

export default UserPromotionSection;
