import React from 'react';
import { useTracked } from '../store/globalState';
import { AppContext } from '../contextProvider';

export const withHooksHOC = (Component: any) => {
  return (props: any) => {
    const [state, dispatch] = useTracked();

    return <Component state={state} dispatch={dispatch} {...props} />;
  };
};

export const withHooksContext = (Component: any) => {
  return (props: any) => {
    const { state, dispatch } = React.useContext(AppContext);

    return (
      <Component stateContext={state} dispatchContext={dispatch} {...props} />
    );
  };
};
