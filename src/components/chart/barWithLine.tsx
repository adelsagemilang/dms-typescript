import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { Options, ZoomedOptions } from './options/barWithLine';

interface StateTypes {
  options: any;
}

interface PropTypes {
  isZoom: boolean;
  customOptions: any;
  height?: number;
  series: any;
}

const defaultSeries = [
  {
    name: 'Total',
    type: 'column',
    data: [440, 505, 414, 671, 227],
  },
  {
    name: 'Active',
    type: 'line',
    data: [440, 505, 414, 671, 227],
  },
];

class BarWithLine extends Component<PropTypes, StateTypes> {
  constructor(props) {
    super(props);

    this.state = {
      options: props.isZoom ? ZoomedOptions(props) : Options(props),
    };
  }

  render() {
    const { height, series } = this.props;
    return (
      <div className="mixed-chart">
        <Chart
          options={this.state.options}
          series={series || defaultSeries}
          height={height || 230}
          width="100%"
          type="line"
        />
      </div>
    );
  }
}

export default BarWithLine;
