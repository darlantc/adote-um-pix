import { Typography, Box } from "@material-ui/core";
import { useEffect } from "react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import LoadingAnimation from "../components/LoadingAnimation";
import UserPromotionModal from "../components/UserPromotionModal";
import SingularPluralTypography from "../components/SingularPluralTypography";

const UserPromotionSection = () => {
    const { userRolesStore } = useMainStoreContext();
    const { usersToPromote, getListOfUsersToPromote, isLoadingUsers } = userRolesStore;

    useEffect(() => {
        getListOfUsersToPromote();
    }, [getListOfUsersToPromote]);

    if (isLoadingUsers) {
        return <LoadingAnimation />;
    }

    return (
        <>
            <SingularPluralTypography
                variant="h4"
                zero="Não foram encontrados usuários elegíveis."
                singular="Foi encontrado 1 usuário."
                plural={`Foram encontrados ${usersToPromote.length} usuários`}
                amount={usersToPromote.length}
            ></SingularPluralTypography>

            {usersToPromote.length > 0 ? (
                <>
                    <Typography variant="h5">Selecione o usuário para ser promovido a administrador:</Typography>
                    <Box m={3} maxHeight={200} display="flex" flexDirection="column" overflow="auto" width={"100%"}>
                        {usersToPromote.map((user) => {
                            return <UserPromotionModal user={user} />;
                        })}
                    </Box>
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default UserPromotionSection;
