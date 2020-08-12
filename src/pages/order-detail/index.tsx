import { connect } from 'react-redux';
import * as actionsLayout from 'layout/actions';
import OrderDetail from './template';

export const mapStateToProps = (state: any) => ({});

export const mapDispatchProps = {
  showBackButton: actionsLayout.showBackButton,
  showViewSettings: actionsLayout.showViewSettings,
};

export default connect(mapStateToProps, mapDispatchProps)(OrderDetail);
