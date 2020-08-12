import React, { Component } from 'react';
import { connect } from 'react-redux';
import { globalFilterTypeObj } from 'store/globalState';
import { KPIFetcher } from 'utils/table-helper';
import {
  getDataKPIPickup,
  getDataKPIDelivery,
  getDataKPIDropoff,
} from 'store/kpi/actions';
import { ApplicationState } from 'store/rootState';
import { withHooksHOC } from 'components/withHooksHOC';
import KPIStage from './KPIStage';

interface IProps {
  state?: globalFilterTypeObj;
  dataKPIPickup?: any;
  dataKPIDelivery?: any;
  dataKPIDropoff?: any;
}

interface PropsFromDispatch {
  getDataKPIPickup?: typeof getDataKPIPickup;
  getDataKPIDelivery?: typeof getDataKPIDelivery;
  getDataKPIDropoff?: typeof getDataKPIDropoff;
}

type AllProps = IProps & PropsFromDispatch;

interface IState {
  dataKPIPickup?: any;
  dataKPIDelivery?: any;
  dataKPIDropoff?: any;
}

class KPIExecution extends Component<AllProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataKPIPickup: [],
      dataKPIDelivery: [],
      dataKPIDropoff: [],
    };
  }

  componentDidMount() {
    const {
      getDataKPIPickup,
      getDataKPIDelivery,
      getDataKPIDropoff,
    } = this.props;

    if (getDataKPIPickup) {
      getDataKPIPickup();
    }

    if (getDataKPIDelivery) {
      getDataKPIDelivery();
    }

    if (getDataKPIDropoff) {
      getDataKPIDropoff();
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      this.props.state &&
      prevProps.state.globalFilter !== this.props.state.globalFilter
    ) {
      const {
        getDataKPIPickup,
        getDataKPIDelivery,
        getDataKPIDropoff,
      } = this.props;

      if (getDataKPIPickup) {
        getDataKPIPickup();
      }

      if (getDataKPIDelivery) {
        getDataKPIDelivery();
      }

      if (getDataKPIDropoff) {
        getDataKPIDropoff();
      }
    }
  }

  buildList(types: string) {
    const { dataKPIPickup, dataKPIDelivery, dataKPIDropoff } = this.props;

    switch (types) {
      case 'pickup':
        if (dataKPIPickup && dataKPIPickup.data) {
          return (
            <KPIStage data={KPIFetcher(dataKPIPickup.data)} types={types} />
          );
        }
        break;
      case 'delivery':
        if (dataKPIDelivery && dataKPIDelivery.data) {
          return (
            <KPIStage data={KPIFetcher(dataKPIDelivery.data)} types={types} />
          );
        }
        break;
      case 'dropoff':
        if (dataKPIDropoff && dataKPIDropoff.data) {
          return (
            <KPIStage data={KPIFetcher(dataKPIDropoff.data)} types={types} />
          );
        }
        break;
      default:
        return false;
    }
  }

  render() {
    return (
      <>
        {this.buildList('pickup')}
        {this.buildList('delivery')}
        {this.buildList('dropoff')}
      </>
    );
  }
}

const mapStateToProps = ({ KPI }: ApplicationState) => ({
  loading: KPI.loading,
  errors: KPI.errors,
  dataKPIPickup: KPI.dataKPIPickup,
  dataKPIDelivery: KPI.dataKPIDelivery,
  dataKPIDropoff: KPI.dataKPIDropoff,
  filterData: KPI.filterData,
});

const mapDispatchToProps: PropsFromDispatch = {
  getDataKPIPickup,
  getDataKPIDelivery,
  getDataKPIDropoff,
};

export default withHooksHOC(
  connect(mapStateToProps, mapDispatchToProps)(KPIExecution),
);
