import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LayoutComponent from 'layout/template';
import * as LayoutActions from './actions';

function mapStateToProps(state: any) {
  const { layout, router } = state;

  return {
    ...layout,
    router,
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(LayoutActions, dispatch);
}

const Layout = connect(mapStateToProps, mapDispatchToProps)(LayoutComponent);

export default Layout;
