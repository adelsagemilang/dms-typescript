import React, { Component } from 'react';
import { PanelBlock, Box, Title, Columns, Column } from 'bloomer';
import PiesChart from 'components/chart/pies';

interface kpiProps {
  dataKPI: any;
}

class Execution extends Component<kpiProps> {
  dataMapper(mainValue: number) {
    const dataPie = [
      { name: 'Group A', value: mainValue },
      { name: 'Group B', value: 100 - mainValue },
    ];

    return dataPie;
  }

  render() {
    const { dataKPI } = this.props;

    return (
      <PanelBlock className="no-border flex-align-stretch">
        <Box className="outline-primary column">
          <Title className="is-7 no-margin-bottom">KPI Execution</Title>
          <Columns isCentered>
            <Column>
              <PiesChart
                data={this.dataMapper(dataKPI.execution_pickup)}
                colors={['#5C63AF', '#5DBFBD']}
                width={125}
                height={125}
              />
              <span className="is-size-7 has-text-weight-semibold">
                Pick Up
              </span>
            </Column>
            <Column>
              <PiesChart
                data={this.dataMapper(dataKPI.execution_delivery)}
                colors={['#F7C754', '#5C63AF']}
                width={125}
                height={125}
              />
              <span className="is-size-7 has-text-weight-semibold">
                Delivery
              </span>
            </Column>
            <Column>
              <PiesChart
                data={this.dataMapper(dataKPI.execution_dropoff)}
                colors={['#5DBFBD', '#5C63AF']}
                width={125}
                height={125}
              />
              <span className="is-size-7 has-text-weight-semibold">
                Drop Off
              </span>
            </Column>
          </Columns>
        </Box>
      </PanelBlock>
    );
  }
}

export default Execution;
