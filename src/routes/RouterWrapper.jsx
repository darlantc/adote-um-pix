import { Route, Redirect } from "react-router-dom";

import { APP_ROUTES } from "../routes/Routes";
import { useMainStoreContext } from "../contexts/mainStoreContext";

export default function RouterWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { authStore } = useMainStoreContext();
  const { loggedUser } = authStore;

  if (!loggedUser && isPrivate) {
    return <Redirect to={APP_ROUTES.home} />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
