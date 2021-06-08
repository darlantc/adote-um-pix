import { Switch } from "react-router-dom";
import Route from "./RouterWrapper";
import Homepage from "../pages/Homepage";
import Adote from "../pages/Adote";
import Perfil from "../pages/Perfil";
import Solicite from "../pages/Solicite";
import MinhasSolicitacoes from "../pages/MinhasSolicitacoes";
import ApprovalsPage from "../pages/ApprovalsPage";

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
            <Route exact path={APP_ROUTES.request} component={Solicite} />
            <Route exact path={APP_ROUTES.myRequests} component={MinhasSolicitacoes} isPrivate />
            <Route exact path={APP_ROUTES.adopt} component={Adote} isPrivate />
            <Route exact path={APP_ROUTES.profile} component={Perfil} isPrivate />
            <Route exact path={APP_ROUTES.approvals} component={ApprovalsPage} />
        </Switch>
    );
}
