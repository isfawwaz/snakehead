import React from "react";
import { Switch, Route } from "react-router-dom";

const mapRouter = (routes, extraProps) => {
  return routes.map((route, i) => (
    <Route
      key={route.key || i}
      path={route.path}
      exact={route.exact}
      strict={route.strict}
      render={props => {
        return <route.component {...props} {...extraProps} route={route} />;
      }}
    />
  ));
};

const renderRoutes = params => {
  const { routes, extraProps, switchProps, location, modal } = params;
  const { isModal, previousLocation } = modal;

  if (routes) {
    return (
      <div>
        <Switch
          {...switchProps}
          location={isModal ? previousLocation : location}
        >
          {mapRouter(routes, extraProps)}
        </Switch>
      </div>
    );
  } else {
    return null;
  }
};

export default renderRoutes;
