import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { Options, ZoomedOptions } from './options/stacked';

interface StateTypes {
  options: any;
  series: any;
}

interface PropTypes {
  isZoom: boolean;
  height?: number;
  labels: string[];
}

const defaultSeries = [
  {
    name: 'Route',
    data: [44, 55, 41, 67, 22],
  },
  {
    name: 'Volume',
    data: [13, 23, 20, 8, 13],
  },
  {
    name: 'Weight',
    data: [11, 17, 15, 15, 21],
  },
];

class Stacked extends Component<PropTypes, StateTypes> {
  constructor(props) {
    super(props);

    this.state = {
      series: props.series ? props.series : defaultSeries,
      options: props.isZoom
        ? ZoomedOptions(props.labels)
        : Options(props.labels),
    };
  }

  render() {
    const { height } = this.props;
    return (
      <div className="stacked-chart">
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

export default Stacked;
