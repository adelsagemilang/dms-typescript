import React, { Component } from 'react';
import { Table, Tag } from 'bloomer';
import {
  formatFromMinutes,
  formatDiffFromMinutes,
  kpiTitle,
} from 'utils/helper';
import 'styles/sass/pages/kpi.sass';

interface IProps {
  data: any[];
  types: string;
}

interface IState {
  bgClass: string;
  titleHeader: boolean;
}

class KPIStage extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      bgClass: '',
      titleHeader: false,
    };
  }

  componentDidMount() {
    const KPITypes = this.props.types;
    let bgClass = '';
    let titleHeader = false;

    switch (KPITypes) {
      case 'pickup':
        titleHeader = true;
        bgClass = 'has-background-success';
        break;
      case 'delivery':
        titleHeader = true;
        bgClass = 'has-background-primary';
        break;
      case 'dropoff':
        titleHeader = true;
        bgClass = 'has-background-orange';
        break;
      default:
        titleHeader = false;
        bgClass = '';
    }

    this.setState({
      bgClass,
      titleHeader,
    });
  }

  render() {
    const { data, types } = this.props;
    const { bgClass, titleHeader } = this.state;

    return (
      <Table isFullWidth isBordered className="table-assignment">
        <thead>
          <tr>
            <th className={`${bgClass} has-text-white kpi-title-header`}>
              {titleHeader && kpiTitle(types)}
            </th>
            <th>%</th>
            <th>#OK</th>
            <th>#Alert</th>
            <th>Total</th>
            <th>Avg Time</th>
            <th>Avg KPI</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map(item => (
              <tr>
                <td>{kpiTitle(item.title)}</td>
                <td>
                  {item.ok && item.total
                    ? Math.round((item.ok / item.total) * 100)
                    : 0}
                  %
                </td>
                <td>{item.ok}</td>
                <td>
                  <span className="has-text-danger">{item.alert}</span>
                </td>
                <td>{item.total}</td>
                <td>{formatFromMinutes(item.average_time)}</td>
                <td>
                  <Tag isColor="primary">
                    {formatDiffFromMinutes(item.average_kpi)}
                  </Tag>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  }
}

export default KPIStage;
