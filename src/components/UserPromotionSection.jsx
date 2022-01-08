import { Typography, Box } from "@material-ui/core";
import { useEffect } from "react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import LoadingAnimation from "../components/LoadingAnimation";
import UserPromotionModal from "../components/UserPromotionModal";
import SingularPluralTypography from "../components/SingularPluralTypography";

const UserPromotionSection = () => {
    const { userRolesStore } = useMainStoreContext();
    const { usersToPromote, usersToDowngrade, getListOfUsers, isLoadingUsers, upgradeUserRole, downgradeUserRole } =
        userRolesStore;

    useEffect(() => {
        getListOfUsers();
    }, [getListOfUsers]);

    if (isLoadingUsers) {
        return <LoadingAnimation />;
    }

    return (
        <Box bgcolor={`rgba(255, 255, 255, 0.5)`} p={2} marginTop={"-32px"} paddingBottom={"32px"}>
            <SingularPluralTypography
                variant="h5"
                zero="Não foram encontrados usuários elegíveis."
                singular="Foi encontrado 1 usuário."
                plural={`Foram encontrados ${usersToPromote.length} usuários.`}
                amount={usersToPromote.length}
            ></SingularPluralTypography>

            {usersToPromote?.length > 0 && (
                <>
                    <Typography variant="h6">Selecione para promover:</Typography>
                    <div
                        style={{
                            width: "100%",
                            height: "38vh",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {usersToPromote.map((user) => {
                            return (
                                <UserPromotionModal
                                    user={user}
                                    key={user.id}
                                    title="Promover"
                                    action={upgradeUserRole}
                                />
                            );
                        })}
                    </div>
                </>
            )}
            {usersToDowngrade?.length > 0 && (
                <>
                    <Typography variant="h6">Selecione para rebaixar:</Typography>
                    <div
                        style={{
                            width: "100%",
                            height: "38vh",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {usersToDowngrade.map((user) => {
                            return (
                                <UserPromotionModal
                                    user={user}
                                    key={user.id}
                                    title="Rebaixar"
                                    action={downgradeUserRole}
                                />
                            );
                        })}
                    </div>
                </>
            )}
        </Box>
    );
};

export default UserPromotionSection;
