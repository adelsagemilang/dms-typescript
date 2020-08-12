import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Title, Columns, Column } from 'bloomer';
import TotalKPI from './totalKPI';
import KPIAssignment from './KPIAssignment';
import KPIExecution from './KPIExecution';
import { mapDispatchProps } from 'pages/kpi';

type IProps = typeof mapDispatchProps;

class KPIList extends Component<IProps> {
  constructor(props) {
    super(props);
    this.props.showBackButton(true);
    this.props.showViewSettings(true);
  }

  render() {
    return (
      <Columns id="inner-container">
        <Column>
          <Title isSize={4}>Total</Title>
          <Link to="/kpi-progress">
            <TotalKPI />
          </Link>

          <Title isSize={4}>KPI Assignment</Title>
          <Link to="/kpi-progress">
            <KPIAssignment />
          </Link>
        </Column>

        <Column>
          <Title isSize={4}>KPI Execution</Title>
          <Link to="/kpi-progress">
            <KPIExecution />
          </Link>
        </Column>
      </Columns>
    );
  }
}

export default KPIList;
