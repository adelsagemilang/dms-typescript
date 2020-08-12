import React, { Component } from 'react';
import { Panel, Content, Columns, Column } from 'bloomer';
import HeadingWithButtons from 'components/commons/headingWithButtons';
import OTIF from './otif';
import Overall from './overall';
import Assignment from './assignment';
import ExecutionDelivery from './execution-delivery';
import ExecutionDropoff from './execution-dropoff';
import ExecutionPickup from './execution-pickup';

class PerformanceGraph extends Component {
  render() {
    return (
      <Panel className="has-background-white scroll-x">
        <HeadingWithButtons
          title="Performance & KPI"
          chartLink="/performance-graph"
          space={true}
        />
        <Content id="content-fullgraph">
          <Columns className="is-variable is-0">
            <Column>
              <OTIF />
            </Column>
            <Column>
              <Overall />
            </Column>
            <Column>
              <Columns className="is-variable is-0 no-margin-bottom">
                <Column>
                  <Assignment />
                </Column>
                <Column>
                  <ExecutionDelivery />
                </Column>
              </Columns>
              <Columns className="is-variable is-0">
                <Column className="p-t-0">
                  <ExecutionPickup />
                </Column>
                <Column className="p-t-0">
                  <ExecutionDropoff />
                </Column>
              </Columns>
            </Column>
          </Columns>
        </Content>
      </Panel>
    );
  }
}

export default PerformanceGraph;
