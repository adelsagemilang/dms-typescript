import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Panel, Columns, Column } from 'bloomer';
import HeadingWithButtons from 'components/commons/headingWithButtons';
import { ApplicationState } from 'store/rootState';
import { withHooksHOC } from 'components/withHooksHOC';
import { globalFilterTypeObj } from 'store/globalState';
import { KPIGraph } from 'store/performance-summary/types';
import { getDataKPI as getDataKPIAction } from 'store/performance-summary/actions';
import { dataPieMapper } from 'utils/chart/commons';
import Execution from './execution';
import OverallAssignment from './overallAssignment';
import PeakCapacity from './peakCapacity';
import Otif from './otif';

const fakeAPI: KPIGraph = {
  overall: 75,
  assignment: 60,
  execution_pickup: 80,
  execution_delivery: 60,
  execution_dropoff: 65,
};

interface IProps {
  state?: globalFilterTypeObj;
  dataKPI?: KPIGraph;
}

interface PropsFromDispatch {
  getDataKPI?: typeof getDataKPIAction;
}

type AllProps = IProps & PropsFromDispatch;

interface IState {
  dataKPI?: any;
}

class Performance extends Component<AllProps, IState> {
  componentWillMount() {
    this.setState({ dataKPI: fakeAPI });
  }

  componentDidMount() {
    const { getDataKPI } = this.props;
    if (getDataKPI) {
      getDataKPI();
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      this.props.state &&
      prevProps.state.globalFilter !== this.props.state.globalFilter
    ) {
      const { getDataKPI } = this.props;

      if (getDataKPI) {
        getDataKPI();
      }
    }
  }

  buildOverallAssignment(type) {
    const { dataKPI } = this.props;

    if (dataKPI) {
      const newDataKPI = dataPieMapper(dataKPI);
      return <OverallAssignment type={type} mainValue={newDataKPI[type]} />;
    }
  }

  buildExecution() {
    const { dataKPI } = this.props;

    if (dataKPI) {
      return <Execution dataKPI={dataPieMapper(dataKPI)} />;
    }
  }

  render() {
    return (
      <Panel className="has-background-white">
        <HeadingWithButtons
          title="Performance & KPI"
          chartLink="/performance-graph"
        />
        <Columns isMultiline>
          <Column isSize={4} className="p-r-0 p-b-0">
            <Link to="/otif">
              <Otif />
            </Link>
          </Column>
          <Column isSize={8} className="p-l-0 p-b-0">
            <PeakCapacity />
          </Column>
          <Column isSize={2} className="p-r-0 p-t-0">
            <Link to="/kpi">
              {/* <OverallAssignment type="overall" mainValue={dataKPINew.overall} /> */}
              {this.buildOverallAssignment('overall')}
            </Link>
          </Column>
          <Column isSize={2} className="p-l-0 p-r-0 p-t-0">
            <Link to="/kpi">
              {/* <OverallAssignment
                type="assignment"
                mainValue={dataKPINew.assignment}
              /> */}
              {this.buildOverallAssignment('assignment')}
            </Link>
          </Column>
          <Column isSize={8} className="p-l-0 p-t-0">
            <Link to="/kpi">{this.buildExecution()}</Link>
          </Column>
        </Columns>
      </Panel>
    );
  }
}

const mapStateToProps = ({ performanceSummary }: ApplicationState) => ({
  loading: performanceSummary.loading,
  errors: performanceSummary.errors,
  dataKPI: performanceSummary.dataKPI,
});

const mapDispatchToProps: PropsFromDispatch = {
  getDataKPI: getDataKPIAction,
};

export default withHooksHOC(
  connect(mapStateToProps, mapDispatchToProps)(Performance),
);
