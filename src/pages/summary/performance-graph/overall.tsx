import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PanelBlock, Box, Title, Columns, Column } from 'bloomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import LinesChart from 'components/chart/lines';
import { getDataKPIOverall } from 'store/performance-summary/actions';
import { ApplicationState } from 'store/rootState';
import { dataBarLineMapper, dataBarLineFixMapper } from 'utils/chart/commons';
import {
  PerformanceChart,
  PerformanceChartTwo,
} from 'store/performance-summary/types';
import { globalFilterTypeObj } from 'store/globalState';
import { withHooksHOC } from 'components/withHooksHOC';

const fakeAPI: PerformanceChart = {
  title: 'KPI Overall',
  data: [
    {
      name: 'KPI Achievement',
      data: [50, 45, 60, 55, 35],
    },
  ],
};

interface IProps {
  state: globalFilterTypeObj;
  dataKPIOverall: PerformanceChartTwo;
}

interface PropsFromDispatch {
  getDataKPIOverall?: typeof getDataKPIOverall;
}

type AllProps = IProps & PropsFromDispatch;

interface IState {
  dataLine: any[];
  currentMonth: any;
}

class Overall extends Component<AllProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataLine: [],
      currentMonth: this.props.state.globalFilter.month,
    };
  }

  componentWillMount() {
    const dataLine = dataBarLineMapper(
      fakeAPI,
      this.props.state.globalFilter.month,
    );
    this.setState({ dataLine });
  }

  componentDidMount() {
    const { getDataKPIOverall } = this.props;
    if (getDataKPIOverall) {
      getDataKPIOverall();
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      this.props.state &&
      prevProps.state.globalFilter !== this.props.state.globalFilter
    ) {
      const { getDataKPIOverall } = this.props;

      if (getDataKPIOverall) {
        getDataKPIOverall();
      }
    }
  }

  buildOverall() {
    const { dataKPIOverall, state } = this.props;

    if (dataKPIOverall && dataKPIOverall.data) {
      const overallData = dataBarLineFixMapper(
        dataKPIOverall.data,
        state.globalFilter.month,
      );

      if (overallData && overallData.length > 0)
        return (
          <>
            <Title className="is-3 panelblock-header has-background-lightblue has-text-white">
              {dataKPIOverall.title}
            </Title>
            <div className="padding-75">
              <LinesChart
                data={overallData}
                colors={['#61B58F']}
                width={700}
                height={430}
                toPercentage
              />
              <Box id="label-barstack" className="outline-grey">
                <Columns className="is-variable is-1 is-centered">
                  <Column className="is-centered">
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="has-text-success"
                    />
                    &nbsp;
                    <span className="has-text-weight-semibold">
                      {dataKPIOverall.title}
                    </span>
                  </Column>
                </Columns>
              </Box>
            </div>
          </>
        );
    }
  }

  render() {
    return (
      <PanelBlock className="no-border flex-align-stretch">
        <Box className="outline-grey column no-padding">
          {this.buildOverall()}
        </Box>
      </PanelBlock>
    );
  }
}

const mapStateToProps = ({ performanceSummary }: ApplicationState) => ({
  loading: performanceSummary.loading,
  errors: performanceSummary.errors,
  dataKPIOverall: performanceSummary.dataKPIOverall,
});

const mapDispatchToProps: PropsFromDispatch = {
  getDataKPIOverall,
};

export default withHooksHOC(
  connect(mapStateToProps, mapDispatchToProps)(Overall),
);
