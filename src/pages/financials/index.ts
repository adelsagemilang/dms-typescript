import { connect } from 'react-redux';
import * as actions from 'store/financial/actions';
import { getQuantityAsync } from 'store/summary/actions';
import { yearMonth } from 'utils/chart/commons';
import FinancialsComponent from './template';

export const mapStateToProps = (state: any) => ({
  financial: state.financial,
  totalOrder: state.summary.quantity.total_trips,
  monthYear: yearMonth(
    state.settingFilterValues.globalFilter.year,
    state.settingFilterValues.globalFilter.month,
  ),
});

export const mapDispatchProps = {
  getTotalCosts: actions.getTotalCost.request,
  getAveragePrice: actions.getAveragePrice.request,
  getTotalOrder: actions.getTotalOrder.request,
  getSummary: getQuantityAsync.request,
};

const Financials = connect(
  mapStateToProps,
  mapDispatchProps,
)(FinancialsComponent);

export default Financials;
