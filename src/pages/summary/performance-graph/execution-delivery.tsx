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
import { getDataKPIDelivery } from 'store/performance-summary/actions';
import { ApplicationState } from 'store/rootState';
import { dataBarLineFixMapper } from 'utils/chart/commons';
import { PerformanceChartDelivery } from '../../../store/performance-summary/types';
import { withHooksHOC } from '../../../components/withHooksHOC';
import { globalFilterTypeObj } from '../../../store/globalState';

interface IProps {
  state: globalFilterTypeObj;
  dataKPIDelivery: PerformanceChartDelivery;
}

interface PropsFromDispatch {
  getDataKPIDelivery?: typeof getDataKPIDelivery;
}

type AllProps = IProps & PropsFromDispatch;

interface IState {
  dataLine: any[];
  currentMonth: any;
}

class ExecutionDelivery extends Component<AllProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataLine: [],
      currentMonth: this.props.state.globalFilter.month,
    };
  }

  componentDidMount() {
    const { getDataKPIDelivery } = this.props;
    if (getDataKPIDelivery) {
      getDataKPIDelivery();
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      this.props.state &&
      prevProps.state.globalFilter !== this.props.state.globalFilter
    ) {
      const { getDataKPIDelivery } = this.props;

      if (getDataKPIDelivery) {
        getDataKPIDelivery();
      }
    }
  }

  buildGraph() {
    const { dataKPIDelivery, state } = this.props;

    if (dataKPIDelivery && dataKPIDelivery.data) {
      const deliveryData: any = dataBarLineFixMapper(
        dataKPIDelivery.data,
        state.globalFilter.month,
        true,
      );

      if (deliveryData && deliveryData.length > 0)
        return (
          <>
            <Title className="is-7 panelblock-header has-background-primary has-text-white">
              <Level>
                <LevelLeft>
                  <LevelItem>KPI Execution</LevelItem>
                </LevelLeft>
                <LevelRight>
                  <LevelItem>Delivery</LevelItem>
                </LevelRight>
              </Level>
            </Title>
            <div className="padding-5 text-6">
              <LinesChart
                data={deliveryData}
                colors={['#F2716E', '#61B58F', '#FFC534', '#5D62B6']}
                width={400}
                height={175}
                margin={{ top: 0, right: 5, bottom: 0, left: -30 }}
                toPercentage
              />
              <Box id="label-barstack" className="outline-grey">
                <Columns className="is-variable is-1 is-centered">
                  <Column>
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="has-text-danger"
                    />
                    &nbsp;
                    <span className="has-text-weight-semibold">Delivery</span>
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
  dataKPIDelivery: performanceSummary.dataKPIDelivery,
});

const mapDispatchToProps: PropsFromDispatch = {
  getDataKPIDelivery,
};

export default withHooksHOC(
  connect(mapStateToProps, mapDispatchToProps)(ExecutionDelivery),
);
