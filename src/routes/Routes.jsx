import { Switch } from "react-router-dom";
import Route from "./RouterWraper";
import Homepage from "../pages/Homepage";
import Adote from "../pages/Adote";
import Perfil from "../pages/Perfil";
import Solicite from "../pages/Solicite";
import MinhasSolicitacoes from "../pages/MinhasSolicitacoes";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/solicite" component={Solicite} />
      <Route
        exact
        path="/minhassolicitacoes"
        component={MinhasSolicitacoes}
        isPrivate
      />
      <Route exact path="/adote" component={Adote} isPrivate />
      <Route exact path="/perfil" component={Perfil} isPrivate />
    </Switch>
  );
}
