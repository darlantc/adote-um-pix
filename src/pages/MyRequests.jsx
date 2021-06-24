import { Typography, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { useEffect } from "react";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import UserRequestCardForCarousel from "../components/UserRequestCardForCarousel";
import { APP_ROUTES } from "../routes/Routes";

const MyRequests = observer(() => {
    const { userRequestStore } = useMainStoreContext();
    const { userRequests, getUserRequests } = userRequestStore;

    useEffect(() => {
        getUserRequests();
    }, [getUserRequests]);

    return (
        <>
            <Typography variant="h3" gutterBottom>
                Minhas Solicitações
            </Typography>
            <Box>
                {userRequests.length > 0 ? (
                    <Carousel>
                        {userRequests.map((request) => {
                            return <UserRequestCardForCarousel key={request.id} request={request} />;
                        })}
                    </Carousel>
                ) : (
                    <Box
                        borderRadius={7}
                        bgcolor="background.paper"
                        display="flex"
                        padding="20px"
                        flexDirection="column"
                    >
                        <Typography variant="h5" align="center" gutterbottom>
                            Nenhuma solicitação encontrada.
                        </Typography>
                        <Box m={1} display="flex" justifyContent="center">
                            <Button variant="outlined" component={Link} to={APP_ROUTES.request}>
                                Solicite
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
});

export default MyRequests;
