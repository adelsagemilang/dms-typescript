import { rootReducer as createRootReducer } from 'store/rootReducer';
import { devMiddlewares } from 'store/middlewares/devMiddlewares';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import { Store, createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { ApplicationState } from 'store/rootState';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from 'store/rootSaga';
import { History } from 'history';

interface StoreTypes {
  store: Store<ApplicationState>;
  persistor: any;
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['layout', 'settingFilterValues'],
};

export default function configureStore(history: History): StoreTypes {
  // Put enhancers here (composed with devtools)
  const composeEnhancers = composeWithDevTools({});

  // Saga Middlewares
  const sagaMiddleware = createSagaMiddleware();

  // Redux Persist
  const persistedReducer = persistReducer(
    persistConfig,
    createRootReducer(history),
  );

  const store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
        ...devMiddlewares,
      ),
    ),
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);
  return {
    store,
    persistor,
  };
}
