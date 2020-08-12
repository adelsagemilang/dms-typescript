import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'utils/history';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from 'store';
import Routes from 'routes';

import { Provider as ProviderState } from './store/globalState';

const { store, persistor } = configureStore(history);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ProviderState>
            <ConnectedRouter history={history}>
              <Routes />
            </ConnectedRouter>
          </ProviderState>
        </PersistGate>
      </Provider>
    );
  }
}
