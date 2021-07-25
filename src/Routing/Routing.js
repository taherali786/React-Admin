import React from 'react'
import { Switch,Route } from 'react-router-dom';


const ReactLazyPreload = importStatement => {
    const Component = React.lazy(importStatement);
    Component.preload = importStatement;
    return Component;
};

const Home = ReactLazyPreload(() => import('../components/Home Component/Home'));
const Dasboard = ReactLazyPreload(() => import('../components/Dasboard'));
const About = ReactLazyPreload(() => import('../components/About Component/About'));

const routes = [
    { path: "/", exact: true, component: Dasboard },
    { path:"/home", exact: true, component: Home },
    { path:"/about", exact: true, component: About }
  ];



function Routing() {
    return (
        <div>
            {/* <Router> */}
            <React.Suspense fallback={"Loading"}>
                <Switch>
                    {routes.map(route => (
		            <Route
		              key={route.path}
		              exact={route.exact}
		              path={route.path}
		              component={route.component}
		            />
          		))}	 
                </Switch>
            </React.Suspense>
            {/* </Router> */}
        </div>
    )
}

export default Routing
