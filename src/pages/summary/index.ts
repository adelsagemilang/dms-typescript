import { connect } from 'react-redux';
import * as actions from 'store/summary/actions';
import * as actionsLayout from 'layout/actions';
import SummaryComponent from './template';

export const mapStateToProps = (state: any) => ({
  isLoadingQuantity: state.summary.isLoadingQuantity,
  quantity: state.summary.quantity,
  isLoadingFinancial: state.summary.isLoadingFinancial,
  financial: state.summary.financial,
});

export const mapDispatchProps = {
  getQuantity: actions.getQuantityAsync.request,
  getFinancial: actions.getFinancialAsync.request,
  showBackButton: actionsLayout.showBackButton,
  showViewSettings: actionsLayout.showViewSettings,
};

const Summary = connect(mapStateToProps, mapDispatchProps)(SummaryComponent);

export default Summary;
