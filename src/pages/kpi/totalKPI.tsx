import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Columns, Column } from 'bloomer';
import { globalFilterTypeObj } from 'store/globalState';
import { getDataKPITotal } from 'store/kpi/actions';
import { ApplicationState } from 'store/rootState';
import { withHooksHOC } from 'components/withHooksHOC';

interface IProps {
  state?: globalFilterTypeObj;
  dataKPITotal?: any;
}

interface PropsFromDispatch {
  getDataKPITotal?: typeof getDataKPITotal;
}

type AllProps = IProps & PropsFromDispatch;

class TotalKPI extends Component<AllProps> {
  componentDidMount() {
    const { getDataKPITotal } = this.props;
    if (getDataKPITotal) {
      getDataKPITotal();
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      this.props.state &&
      prevProps.state.globalFilter !== this.props.state.globalFilter
    ) {
      const { getDataKPITotal } = this.props;

      if (getDataKPITotal) {
        getDataKPITotal();
      }
    }
  }

  buildList() {
    const { dataKPITotal } = this.props;

    const totalPercentage =
      dataKPITotal && dataKPITotal.data.ok
        ? dataKPITotal.data.total
          ? Math.round((dataKPITotal.data.ok / dataKPITotal.data.total) * 100)
          : 0
        : 0;

    return (
      <>
        <Columns>
          <Column isSize={3}>%</Column>
          <Column isSize={3}>{dataKPITotal && totalPercentage}%</Column>
          <Column isSize={3}>#OK</Column>
          <Column isSize={3}>{dataKPITotal && dataKPITotal.data.ok}</Column>
        </Columns>
        <Columns>
          <Column isSize={3}>#Alert</Column>
          <Column isSize={3}>{dataKPITotal && dataKPITotal.data.alert}</Column>
          <Column isSize={3}>Total</Column>
          <Column isSize={3}>{dataKPITotal && dataKPITotal.data.total}</Column>
        </Columns>
      </>
    );
  }

  render() {
    return <div className="kpi-total-panel">{this.buildList()}</div>;
  }
}

const mapStateToProps = ({ KPI }: ApplicationState) => ({
  loading: KPI.loading,
  errors: KPI.errors,
  dataKPITotal: KPI.dataKPITotal,
  filterData: KPI.filterData,
});

const mapDispatchToProps: PropsFromDispatch = {
  getDataKPITotal,
};

export default withHooksHOC(
  connect(mapStateToProps, mapDispatchToProps)(TotalKPI),
);
