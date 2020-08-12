import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { Options, ZoomedOptions } from './options/bar';

interface Data {
  name: string;
  data: number[];
}

interface PropTypes {
  isZoom: boolean;
  height?: number;
  data?: Data;
}

interface StateTypes {
  options: any;
  series: any;
}

const defaultSeries = [
  {
    name: 'Order',
    data: [44, 55, 57, 56, 61],
  },
];

class Bar extends Component<PropTypes, StateTypes> {
  constructor(props) {
    super(props);
    this.state = {
      series: props.series ? props.series : defaultSeries,
      options: props.isZoom ? ZoomedOptions(props) : Options(props),
    };
  }

  render() {
    const { height } = this.props;
    return (
      <div className="mixed-chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={height || 230}
        />
      </div>
    );
  }
}

export default Bar;
