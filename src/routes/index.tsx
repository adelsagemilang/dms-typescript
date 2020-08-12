import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Layout
import Layout from 'layout/containers';

// Pages
import Login from 'pages/login';
import Summary from 'pages/summary';
import PerformanceGraph from 'pages/summary/performance-graph';
import OTIFList from 'pages/otif-list';
import KPI from 'pages/kpi';
import KPIProgress from 'pages/kpi-progress';
import OrderDetail from 'pages/order-detail';
import Quantity from 'pages/quantity';
import Financials from 'pages/financials';
import Logout from 'pages/logout';

// Commons Component
import NotFound from 'components/routes/notFound';
import { PrivateRoute, PublicRoute } from './childRoute';

const routes = [
  {
    path: '/',
    component: Summary,
    isPrivate: true,
  },
  {
    path: '/login',
    component: Login,
    isPrivate: false,
  },
  {
    path: '/performance-graph',
    component: PerformanceGraph,
    isPrivate: true,
  },
  {
    path: '/otif',
    component: OTIFList,
    isPrivate: true,
  },
  {
    path: '/kpi',
    component: KPI,
    isPrivate: true,
  },
  {
    path: '/kpi-progress',
    component: KPIProgress,
    isPrivate: true,
  },
  {
    path: '/order-detail/:uuid',
    component: OrderDetail,
    isPrivate: true,
  },
  {
    path: '/quantity',
    component: Quantity,
    isPrivate: true,
  },
  {
    path: '/financials',
    component: Financials,
    isPrivate: true,
  },
  {
    path: '/logout',
    component: Logout,
    isPrivate: true,
  },
];

export default class Routes extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          {routes.map(route =>
            route.isPrivate ? (
              <PrivateRoute
                exact
                key={route.path}
                path={route.path}
                component={route.component}
              />
            ) : (
              <PublicRoute
                exact
                key={route.path}
                path={route.path}
                component={route.component}
              />
            ),
          )}
          <Route path="/404" component={NotFound} />
          <Redirect from="*" to="/404" />
        </Switch>
      </Layout>
    );
  }
}
