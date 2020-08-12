import React, { Component } from 'react';
import { PanelBlock, Box, Title } from 'bloomer';
import PiesChart from 'components/chart/pies';

interface kpiProps {
  type: string;
  mainValue: number;
}

interface kpiState {
  title: string;
  colors: string[];
  dataPie?: any[];
}

class OverallAssignment extends Component<kpiProps, kpiState> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      colors: [],
    };
  }

  dataMapper(mainValue: number) {
    const dataPie = [
      { name: 'Group A', value: mainValue },
      { name: 'Group B', value: 100 - mainValue },
    ];

    return dataPie;
  }

  componentWillMount() {
    this.setState({ dataPie: this.dataMapper(this.props.mainValue) });
  }

  componentDidMount() {
    switch (this.props.type) {
      case 'assignment':
        this.setState({
          title: 'KPI Assignment',
          colors: ['#F7C754', '#5C63AF'],
        });
        break;
      default:
        this.setState({
          title: 'KPI Overalls',
          colors: ['#5DBFBD', '#5C63AF'],
        });
        break;
    }
  }

  render() {
    const { dataPie } = this.state;

    return (
      <PanelBlock className="no-border flex-align-stretch">
        <Box className="outline-primary column pointer">
          <Title className="is-7 no-margin-bottom">{this.state.title}</Title>
          <PiesChart
            data={dataPie}
            colors={this.state.colors}
            width={125}
            height={150}
            margin={{ bottom: 18, top: 0, left: 0, right: 0 }}
          />
        </Box>
      </PanelBlock>
    );
  }
}

export default OverallAssignment;
