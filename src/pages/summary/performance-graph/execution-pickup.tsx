import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  PanelBlock,
  Box,
  Title,
  Columns,
  Column,
  Level,
  LevelLeft,
  LevelRight,
  LevelItem,
} from 'bloomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import LinesChart from 'components/chart/lines';
import { PerformanceChartPickup } from 'store/performance-summary/types';
import { withHooksHOC } from 'components/withHooksHOC';
import { dataBarLineFixMapper } from 'utils/chart/commons';
import { globalFilterTypeObj } from 'store/globalState';
import { getDataKPIPickup } from 'store/performance-summary/actions';
import { ApplicationState } from 'store/rootState';

interface IProps {
  state: globalFilterTypeObj;
  dataKPIPickup?: PerformanceChartPickup;
}

interface PropsFromDispatch {
  getDataKPIPickup?: typeof getDataKPIPickup;
}

type AllProps = IProps & PropsFromDispatch;

interface IState {
  dataLine: any[];
  currentMonth: any;
}

class ExecutionPickup extends Component<AllProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataLine: [],
      currentMonth: this.props.state.globalFilter.month,
    };
  }

  componentDidMount() {
    const { getDataKPIPickup } = this.props;
    if (getDataKPIPickup) {
      getDataKPIPickup();
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      this.props.state &&
      prevProps.state.globalFilter !== this.props.state.globalFilter
    ) {
      const { getDataKPIPickup } = this.props;

      if (getDataKPIPickup) {
        getDataKPIPickup();
      }
    }
  }

  buildGraph() {
    const { dataKPIPickup, state } = this.props;

    if (dataKPIPickup && dataKPIPickup.data) {
      // const pickupData: any = dataBarLineNewMapper(dataKPIPickup.data, true);
      const pickupData: any = dataBarLineFixMapper(
        dataKPIPickup.data,
        state.globalFilter.month,
        true,
      );

      if (pickupData && pickupData.length > 0)
        return (
          <>
            <Title className="is-7 panelblock-header has-background-success has-text-white">
              <Level>
                <LevelLeft>
                  <LevelItem>KPI Execution</LevelItem>
                </LevelLeft>
                <LevelRight>
                  <LevelItem>Pick Up</LevelItem>
                </LevelRight>
              </Level>
            </Title>
            <div className="padding-5 text-6">
              <LinesChart
                data={pickupData}
                colors={['#F2716E', '#61B58F', '#FFC534', '#5D62B6', '#273B8F']}
                width={400}
                height={175}
                margin={{ top: 0, right: 5, bottom: 0, left: -30 }}
                toPercentage
              />
              <Box id="label-barstack" className="outline-grey">
                <Columns className="is-variable is-1 is-centered">
                  <Column className="has-separator-after">
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="has-text-danger"
                    />
                    &nbsp;
                    <span className="has-text-weight-semibold">Arrival</span>
                  </Column>
                  <Column className="has-separator-after">
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="has-text-success"
                    />
                    &nbsp;
                    <span className="has-text-weight-semibold">Inspection</span>
                  </Column>
                  <Column className="has-separator-after">
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="has-text-warning"
                    />
                    &nbsp;
                    <span className="has-text-weight-semibold">Waiting</span>
                  </Column>
                  <Column className="has-separator-after">
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="has-text-purple"
                    />
                    &nbsp;
                    <span className="has-text-weight-semibold">Loading</span>
                  </Column>
                  <Column>
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="has-text-info"
                    />
                    &nbsp;
                    <span className="has-text-weight-semibold">Gate Out</span>
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
          {this.buildGraph()}
        </Box>
      </PanelBlock>
    );
  }
}

const mapStateToProps = ({ performanceSummary }: ApplicationState) => ({
  loading: performanceSummary.loading,
  errors: performanceSummary.errors,
  dataKPIPickup: performanceSummary.dataKPIPickup,
});

const mapDispatchToProps: PropsFromDispatch = {
  getDataKPIPickup,
};

export default withHooksHOC(
  connect(mapStateToProps, mapDispatchToProps)(ExecutionPickup),
);
