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
    }, [getListOfUsersToPromote]);

    if (isLoadingUsers) {
        return <LoadingAnimation />;
    }

    if (usersToPromote.length < 1) {
        return <Typography variant="h4">Não foram encontrados usuários elegíveis.</Typography>;
    }

    const thereIsAnyUsersToPromote = usersToPromote.length !== 1;

    return (
        <>
            <Typography variant="h4" style={{ width: "100%" }}>
                {thereIsAnyUsersToPromote ? "Foram encontrados" : "Foi encontrado"} {usersToPromote.length}
                {thereIsAnyUsersToPromote ? "usuários" : "usuário"}
            </Typography>
            <Typography variant="h5">Selecione o usuário para ser promovido a administrador:</Typography>
            <Box m={3} maxHeight={200} display="flex" flexDirection="column" overflow="auto" width={"100%"}>
                {usersToPromote.map((user) => (
                    <UserPromotionModal key={user.id} user={user} />
                ))}
            </Box>
        </>
    );
};

export default UserPromotionSection;
