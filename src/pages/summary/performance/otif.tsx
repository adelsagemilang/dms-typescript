import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PanelBlock, Box, Title, Columns, Column } from 'bloomer';
import { ApplicationState } from 'store/rootState';
import GaugeChart from 'components/chart/gauge';
import BoxLabel from 'components/commons/boxLabel';
import { withHooksHOC } from 'components/withHooksHOC';
import { globalFilterTypeObj } from 'store/globalState';
import { OTIFGraph, GaugeItem } from 'store/performance-summary/types';
import { getDataOTIF } from 'store/performance-summary/actions';

interface IProps {
  state?: globalFilterTypeObj;
  dataOTIF?: OTIFGraph;
}

interface PropsFromDispatch {
  getDataOTIF?: typeof getDataOTIF;
}

type AllProps = IProps & PropsFromDispatch;

interface IState {
  settings?: any;
  yearSettings?: any;
  dataGauge?: any;
  dataOtif?: any;
}

class Otif extends Component<AllProps, IState> {
  dataMapper(dataAPI: OTIFGraph) {
    const dataGauge: GaugeItem = {
      value:
        dataAPI.otif / (dataAPI.otif + dataAPI.ot + dataAPI.if + dataAPI.xotif),
      maxValue: 1,
      allSegments: [
        0,
        dataAPI.otif / (dataAPI.otif + dataAPI.ot + dataAPI.if + dataAPI.xotif),
        (dataAPI.otif + dataAPI.ot) /
          (dataAPI.otif + dataAPI.ot + dataAPI.if + dataAPI.xotif),
        (dataAPI.otif + dataAPI.ot + dataAPI.if) /
          (dataAPI.otif + dataAPI.ot + dataAPI.if + dataAPI.xotif),
        (dataAPI.otif + dataAPI.ot + dataAPI.if + dataAPI.xotif) /
          (dataAPI.otif + dataAPI.ot + dataAPI.if + dataAPI.xotif),
      ],
    };
    return dataGauge;
  }

  componentDidMount() {
    const { getDataOTIF } = this.props;
    if (getDataOTIF) {
      getDataOTIF();
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      this.props.state &&
      prevProps.state.globalFilter !== this.props.state.globalFilter
    ) {
      const { getDataOTIF } = this.props;

      if (getDataOTIF) {
        getDataOTIF();
      }
    }
  }

  buildGraph() {
    const { dataOTIF } = this.props;

    if (dataOTIF) {
      const dataGauge = this.dataMapper(dataOTIF);

      return (
        <>
          <GaugeChart data={dataGauge} height={180} />
          <Columns className="is-variable is-1">
            <Column>
              <BoxLabel title="OTIF" value={dataOTIF.otif} />
            </Column>
            <Column>
              <BoxLabel title="OT" value={dataOTIF.ot} />
            </Column>
            <Column>
              <BoxLabel title="IF" value={dataOTIF.if} />
            </Column>
            <Column>
              <BoxLabel title="X OTIF" value={dataOTIF.xotif} />
            </Column>
          </Columns>
        </>
      );
    }
  }

  render() {
    // const { year } = this.props.state.globalFilter;

    return (
      <PanelBlock className="no-border flex-align-stretch">
        <Box className="outline-primary column">
          <Title className="is-7">OTIF (On Time In Full)</Title>
          {this.buildGraph()}
        </Box>
      </PanelBlock>
    );
  }
}

const mapStateToProps = ({ performanceSummary }: ApplicationState) => ({
  loading: performanceSummary.loading,
  errors: performanceSummary.errors,
  dataOTIF: performanceSummary.dataOTIF,
  filterData: performanceSummary.filterData,
});

const mapDispatchToProps: PropsFromDispatch = {
  getDataOTIF,
};

export default withHooksHOC(connect(mapStateToProps, mapDispatchToProps)(Otif));
