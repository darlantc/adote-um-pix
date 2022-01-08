import { Modal, Box, Typography } from "@material-ui/core";
import { useState } from "react";
import { observer } from "mobx-react";

import Default from "../assets/images/defaultUserPhoto.png";
import CardForUserPromotionDisplay from "../components/CardForUserPromotionDisplay";

const UserPromotionModal = observer(({ user, title, action }) => {
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

    const didChange = () => {
        action(user);
        setIsModalOpen(false);
    };

    return (
        <>
            <CardForUserPromotionDisplay
                image={userImage}
                fullName={fullName}
                display="flex"
                imageSize="40px"
                buttonAction={openClose}
                buttonTitle="Selecionar"
                justify="space-between"
                width="100%"
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
                            Deseja {title.toLowerCase()} este usuário?
                        </Typography>
                        <CardForUserPromotionDisplay
                            display="flex"
                            flexDirection="column"
                            image={userImage}
                            fullName={fullName}
                            bio={bio}
                            imageSize="200px"
                            buttonAction={didChange}
                            buttonTitle={title}
                            justify="center"
                            width="280px"
                            extraMargin={1}
                            cancelAction={openClose}
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    );
});

export default UserPromotionModal;
