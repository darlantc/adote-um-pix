import { Switch } from "react-router-dom";

import Route from "./RouterWrapper";
import Homepage from "../pages/Homepage";
import Adopt from "../pages/Adopt";
import Profile from "../pages/Profile";
import Request from "../pages/Request";
import MyRequests from "../pages/MyRequests";
import MyContributions from "../pages/MyContributions";
import UserRequestFullInfoDisplay from "../pages/UserRequestFullInfoDisplay";
import Error404 from "../pages/Error404";

export const APP_ROUTES = Object.freeze({
    myRequests: "/minhas-solicitacoes",
    home: "/",
    request: "/solicite",
    adopt: "/adote",
    adoptRequest: "/adote/:request",
    profile: "/perfil",
    myContributions: "/minhas-contribuicoes",
});

export default function Routes() {
    return (
        <Switch>
            <Route exact path={APP_ROUTES.home} component={Homepage} />
            <Route exact path={APP_ROUTES.request} component={Request} />
            <Route exact path={APP_ROUTES.myRequests} component={MyRequests} isPrivate />
            <Route exact path={APP_ROUTES.myContributions} component={MyContributions} isPrivate />
            <Route exact path={APP_ROUTES.adopt} component={Adopt} isPrivate />
            <Route exact path={APP_ROUTES.adoptRequest} component={UserRequestFullInfoDisplay} isPrivate />
            <Route exact path={APP_ROUTES.profile} component={Profile} isPrivate />
            <Route component={Error404} />
        </Switch>
    );
}
