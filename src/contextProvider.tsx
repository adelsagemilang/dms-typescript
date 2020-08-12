import * as React from 'react';
import {
  globalFilterTypeObj,
  initialState,
  reducer,
  Action,
} from './store/globalState';

type ContextProps = {
  state: globalFilterTypeObj;
  dispatch: React.Dispatch<Action>;
};

export const AppContext = React.createContext({} as ContextProps);

export function ContextProvider(props: any) {
  const [, dispatch] = React.useReducer(reducer, initialState);

  const value = { state: initialState, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}
