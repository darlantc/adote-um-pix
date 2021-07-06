import { Switch } from "react-router-dom";

import Route from "./RouterWrapper";
import Homepage from "../pages/Homepage";
import Adopt from "../pages/Adopt";
import Profile from "../pages/Profile";
import Request from "../pages/Request";
import MyRequests from "../pages/MyRequests";
import MyContributions from "../pages/MyContributions";

export const APP_ROUTES = Object.freeze({
    myRequests: "/minhas-solicitacoes",
    home: "/",
    request: "/solicite",
    adopt: "/adote",
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
            <Route path={APP_ROUTES.adopt} component={Adopt} isPrivate />
            <Route exact path={APP_ROUTES.profile} component={Profile} isPrivate />
        </Switch>
    );
}
