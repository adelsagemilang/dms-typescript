import { connect } from 'react-redux';
import * as actions from 'store/quantity/actions';
import { yearMonth } from 'utils/chart/commons';
import QuantityComponent from './template';

export const mapStateToProps = (state: any) => ({
  quantity: state.quantity,
  monthYear: yearMonth(
    state.settingFilterValues.globalFilter.year,
    state.settingFilterValues.globalFilter.month,
  ),
});

export const mapDispatchProps = {
  getOrderDelivery: actions.getOrderDelivery.request,
  getActiveTransporter: actions.getActiveTransporter.request,
  getAverageVolume: actions.getAverageVolume.request,
  getDaysPerTrip: actions.getDaysPerTrip.request,
  getActiveTruck: actions.getActiveTruck.request,
  getAverageWeight: actions.getAverageWeight.request,
  getAverageOrderPerTransporter: actions.getAverageOrderPerTransporter.request,
  getAverageOrderPerTruck: actions.getAverageOrderPerTruck.request,
  getTripPerMonth: actions.getTripPerMonth.request,
  getKmPerTrip: actions.getKmPerTrip.request,
};

const Quantity = connect(mapStateToProps, mapDispatchProps)(QuantityComponent);

export default Quantity;
