import { connect } from 'react-redux';
import * as actions from 'store/kpi-progress/actions';
import * as actionsLayout from 'layout/actions';
import KPIProgressTable from './template';

export const mapStateToProps = (state: any) => ({
  isLoadingQuantity: state.summary.isLoadingQuantity,
  data: state.kpiProgress.data.data,
  totalPages: state.kpiProgress.data.total_page,
});

export const mapDispatchProps = {
  getKpiProgress: actions.getKpiProgress.request,
  showBackButton: actionsLayout.showBackButton,
  showViewSettings: actionsLayout.showViewSettings,
};

const KPIProgress = connect(
  mapStateToProps,
  mapDispatchProps,
)(KPIProgressTable);

export default KPIProgress;
