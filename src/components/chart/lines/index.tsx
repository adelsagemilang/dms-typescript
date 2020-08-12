import * as React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { DataLine, Margin } from '../../../store/chartType';
import { defaultColors, defaultDimension } from './settings';

type ChartProps = {
  data?: DataLine[];
  colors: string[];
  width: number;
  height: number;
  margin?: Margin;
  toPercentage?: boolean;
};

class LinesChart extends React.Component<ChartProps> {
  public static defaultProps = {
    colors: defaultColors,
    width: defaultDimension.width,
    height: defaultDimension.height,
  };

  render() {
    const { data } = this.props;

    return (
      <LineChart
        width={this.props.width}
        height={this.props.height}
        data={data}
        margin={this.props.margin}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis padding={{ top: 10 }} />
        <Tooltip />
        {data &&
          Object.keys(data[0]).map((entry, indexEntry) => {
            if (entry !== 'name') {
              return (
                <Line
                  type="linear"
                  dataKey={entry}
                  stroke={this.props.colors[indexEntry - 1]}
                  activeDot={{ r: 5 }}
                />
              );
            }
            return true;
          })}
      </LineChart>
    );
  }
}

export default LinesChart;
