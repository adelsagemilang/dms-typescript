import React, { Component } from 'react';
import { connect } from 'react-redux';
import { globalFilterTypeObj } from 'store/globalState';
import { KPIFetcher } from 'utils/table-helper';
import { getDataKPIAssignment } from 'store/kpi/actions';
import { ApplicationState } from 'store/rootState';
import { withHooksHOC } from 'components/withHooksHOC';
import KPIStage from './KPIStage';

interface IProps {
  state?: globalFilterTypeObj;
  dataKPIAssignment?: any;
}

interface PropsFromDispatch {
  getDataKPIAssignment?: typeof getDataKPIAssignment;
}

type AllProps = IProps & PropsFromDispatch;

interface IState {
  dataKPI?: any;
}

class KPIAssignment extends Component<AllProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataKPI: [],
    };
  }

  componentDidMount() {
    const { getDataKPIAssignment } = this.props;
    if (getDataKPIAssignment) {
      getDataKPIAssignment();
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      this.props.state &&
      prevProps.state.globalFilter !== this.props.state.globalFilter
    ) {
      const { getDataKPIAssignment } = this.props;

      if (getDataKPIAssignment) {
        getDataKPIAssignment();
      }
    }
  }

  buildAssignment() {
    const { dataKPIAssignment } = this.props;

    if (dataKPIAssignment && dataKPIAssignment.data) {
      return (
        <KPIStage
          data={KPIFetcher(dataKPIAssignment.data)}
          types="assignment"
        />
      );
    }
  }

  render() {
    return <>{this.buildAssignment()}</>;
  }
}

const mapStateToProps = ({ KPI }: ApplicationState) => ({
  loading: KPI.loading,
  errors: KPI.errors,
  dataKPIAssignment: KPI.dataKPIAssignment,
  filterData: KPI.filterData,
});

const mapDispatchToProps: PropsFromDispatch = {
  getDataKPIAssignment,
};

export default withHooksHOC(
  connect(mapStateToProps, mapDispatchToProps)(KPIAssignment),
);
