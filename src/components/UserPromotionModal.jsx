import { Modal, Box, Typography } from "@material-ui/core";
import { useState } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import Default from "../assets/images/defaultUserPhoto.png";
import CardForUserPromotionDisplay from "../components/CardForUserPromotionDisplay";

const UserPromotionModal = observer(({ user }) => {
    const { userRolesStore } = useMainStoreContext();
    const { upgradeUserRole } = userRolesStore;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { fullName, photoUrl, bio } = user;
    const userImage = photoUrl || Default;

    const openClose = () => {
        if (isModalOpen) {
            setIsModalOpen(false);
        } else {
            setIsModalOpen(true);
        }
    };

    const didUpgrade = () => {
        upgradeUserRole(user);
        setIsModalOpen(false);
    };

    return (
        <>
            <CardForUserPromotionDisplay
                image={userImage}
                fullName={fullName}
                bio={bio}
                display="flex"
                imageSize="50px"
                buttonAction={openClose}
                buttonTitle="Selecionar"
                justify="left"
            />
            <Modal open={isModalOpen} onClose={openClose}>
                <Box display="flex" justifyContent="center">
                    <Box
                        borderRadius={7}
                        position="absolute"
                        top="15vh"
                        bgcolor="background.paper"
                        padding="10px"
                        width="300px"
                    >
                        <Typography variant="h6" align="center" gutterBottom>
                            Deseja promover este usuário?
                        </Typography>
                        <CardForUserPromotionDisplay
                            display="flex"
                            flexDirection="column"
                            image={userImage}
                            fullName={fullName}
                            bio={bio}
                            imageSize="200px"
                            buttonAction={didUpgrade}
                            buttonTitle="Promover"
                            justify="center"
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    );
});

export default UserPromotionModal;
