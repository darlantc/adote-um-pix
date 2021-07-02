import { Switch } from "react-router-dom";

import Route from "./RouterWrapper";
import Homepage from "../pages/Homepage";
import Adopt from "../pages/Adopt";
import Profile from "../pages/Profile";
import Request from "../pages/Request";
import MyRequests from "../pages/MyRequests";
import ApprovalsPage from "../pages/ApprovalsPage";
import UserRequestBuilder from "../models/builders/UserRequestBuilder";

export const APP_ROUTES = Object.freeze({
    approvals: "/aprovacoes",
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
            <Route exact path={APP_ROUTES.adopt} component={Adopt} isPrivate />
            <Route exact path={APP_ROUTES.profile} component={Profile} isPrivate />
            <Route exact path={APP_ROUTES.approvals} component={ApprovalsPage}>
                {/* TODO: Remover esse código temporário  */}
                <ApprovalsPage
                    requestsList={[
                        UserRequestBuilder.aUserRequest().build(),
                        UserRequestBuilder.aUserRequest().build(),
                        UserRequestBuilder.aUserRequest().build(),
                    ]}
                />
            </Route>
        </Switch>
    );
}
