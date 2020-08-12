import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PanelBlock, Box, Title, Columns, Column } from 'bloomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import BarstackChart from 'components/chart/barstack';
import { ApplicationState } from 'store/rootState';
import { getDataOTIFGraph } from 'store/performance-summary/actions';
import { dataBarLineFixMapper } from 'utils/chart/commons';
import { globalFilterTypeObj } from '../../../store/globalState';
import { withHooksHOC } from '../../../components/withHooksHOC';

interface IProps {
  state: globalFilterTypeObj;
  dataOTIFGraph: any;
}

interface PropsFromDispatch {
  getDataOTIFGraph?: typeof getDataOTIFGraph;
}

type AllProps = IProps & PropsFromDispatch;

interface IState {
  dataBar: any[];
  currentMonth: any;
}

class OTIF extends Component<AllProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataBar: [],
      currentMonth: this.props.state.globalFilter.month,
    };
  }

  componentDidMount() {
    const { getDataOTIFGraph } = this.props;
    if (getDataOTIFGraph) {
      getDataOTIFGraph();
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      this.props.state &&
      prevProps.state.globalFilter !== this.props.state.globalFilter
    ) {
      const { getDataOTIFGraph } = this.props;

      if (getDataOTIFGraph) {
        getDataOTIFGraph();
      }
    }
  }

  buildChart() {
    const { dataOTIFGraph, state } = this.props;
    const dataOTIFGraphNew: any = dataBarLineFixMapper(
      dataOTIFGraph,
      state.globalFilter.month,
    );

    if (dataOTIFGraph)
      return (
        <BarstackChart
          data={dataOTIFGraphNew}
          colors={['#F2716E', '#61B58F', '#FFC534', '#5D62B6']}
          width={700}
          height={454}
          toPercentage
        />
      );
  }

  render() {
    return (
      <PanelBlock className="no-border flex-align-stretch">
        <Box className="outline-grey column padding-75">
          <Title className="is-3">On Time In Full</Title>
          {this.buildChart()}
          <Box id="label-barstack" className="outline-grey">
            <Columns className="is-variable is-1">
              <Column className="has-separator-after">
                <FontAwesomeIcon icon={faCircle} className="has-text-danger" />
                &nbsp;
                <span className="has-text-weight-semibold">OTIF</span>
              </Column>
              <Column className="has-separator-after">
                <FontAwesomeIcon icon={faCircle} className="has-text-success" />
                &nbsp;
                <span className="has-text-weight-semibold">OT</span>
              </Column>
              <Column className="has-separator-after">
                <FontAwesomeIcon icon={faCircle} className="has-text-warning" />
                &nbsp;
                <span className="has-text-weight-semibold">IF</span>
              </Column>
              <Column>
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className="has-text-purple"
                />
                &nbsp;
                <span className="has-text-weight-semibold">NOT OTIF</span>
              </Column>
            </Columns>
          </Box>
        </Box>
      </PanelBlock>
    );
  }
}

const mapStateToProps = ({ performanceSummary }: ApplicationState) => ({
  loading: performanceSummary.loading,
  errors: performanceSummary.errors,
  dataOTIFGraph: performanceSummary.dataOTIFGraph,
});

const mapDispatchToProps: PropsFromDispatch = {
  getDataOTIFGraph,
};

export default withHooksHOC(connect(mapStateToProps, mapDispatchToProps)(OTIF));
