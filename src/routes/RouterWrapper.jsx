import { Route, Redirect } from "react-router-dom";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import { APP_ROUTES } from "../routes/Routes";

const RouterWrapper = observer(
  ({ component: Component, isPrivate, ...rest }) => {
    const { authStore } = useMainStoreContext();
    const { loggedUser } = authStore;

    const loading = false;

    if (loading) {
      return <div></div>;
    }

    if (!loggedUser && isPrivate) {
      return <Redirect to={APP_ROUTES.home} />;
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
);

export default RouterWrapper;
