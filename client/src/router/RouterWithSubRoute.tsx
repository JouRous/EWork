import { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { IRoute } from './config';

const RouteWithSubRoutes = (route: IRoute) => {
  const isAuthenticated = useAppSelector((state) => state.auth.user)
    ? true
    : false;

  return (
    <Suspense fallback={route.fallback}>
      <Route
        path={route.path}
        render={(props) =>
          route.redirect ? (
            <Redirect to={route.redirect} />
          ) : route.private ? (
            isAuthenticated ? (
              route.component && (
                <route.component {...props} routes={route.routes} />
              )
            ) : (
              <Redirect to="/auth/login" />
            )
          ) : (
            route.component && (
              <route.component {...props} routes={route.routes} />
            )
          )
        }
      />
    </Suspense>
  );
};

export default RouteWithSubRoutes;
