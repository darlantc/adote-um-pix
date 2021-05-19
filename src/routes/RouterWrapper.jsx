import { Route, Redirect } from "react-router-dom";

import { APP_ROUTES } from "../routes/Routes";

export default function RouterWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const loading = false;
  const signed = true;

  if (loading) {
    return <div></div>;
  }

  if (!signed && isPrivate) {
    return <Redirect to={APP_ROUTES.home} />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
