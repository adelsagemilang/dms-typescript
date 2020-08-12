import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LoginActions from 'store/login/actions';
import LoginComponent from './template';

// function mapStateToProps(state: any) {
//   const { login } = state;
//   return login;
// }

export const mapStateToProps = (state: any) => ({
  login: state,
});

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(LoginActions, dispatch);
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

export default Login;
