import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from './components/public/main';
import routes from './components/public/routes';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({ path, Component }, key) => (
            <Route
              exact
              path={path}
              key={key}
              render={props => {
                // const crumbs = routes
                //   // Get all routes that contain the current one.
                //   .filter(({ path }) => props.match.path.includes(path))
                //   // Swap out any dynamic routes with their param values.
                //   // E.g. "/pizza/:pizzaId" will become "/pizza/1"
                //   .map(({ path, ...rest }) => ({
                //     path: Object.keys(props.match.params).length
                //       ? Object.keys(props.match.params).reduce(
                //         (path, param) => path.replace(
                //           `:${param}`, props.match.params[param]
                //         ), path
                //         )
                //       : path,
                //     ...rest
                //   }));
                // props.crumbs = crumbs;
                return (
                    <Main {...props}> <Component {...props} /> </Main>
                );
              }}
            />
        ))}
        </Switch>
    </BrowserRouter>
  );
}

export default App;
