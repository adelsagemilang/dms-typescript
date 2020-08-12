import * as React from 'react';
import { Redirect } from 'react-router';

export class Logout extends React.Component<any> {
  componentDidMount() {
    localStorage.removeItem('authdata');
  }

  render() {
    return <Redirect to="/login" push={true} />;
  }
}

export default Logout;
