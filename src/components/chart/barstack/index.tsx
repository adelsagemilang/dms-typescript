import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { DataBar } from '../../../store/chartType';
import { defaultColors, defaultDimension } from './settings';

type ChartProps = {
  data?: DataBar[];
  colors: string[];
  width: number;
  height: number;
  toPercentage?: boolean;
};

class BarstackChart extends React.Component<ChartProps> {
  public static defaultProps = {
    colors: defaultColors,
    width: defaultDimension.width,
    height: defaultDimension.height,
  };

  render() {
    const { data } = this.props;

    return (
      <BarChart
        width={this.props.width}
        height={this.props.height}
        data={data}
        barCategoryGap={20}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {data &&
          Object.keys(data[0]).map((entry, indexEntry) => {
            if (entry !== 'name') {
              return (
                <Bar
                  dataKey={entry}
                  stackId="a"
                  fill={this.props.colors[indexEntry - 1]}
                />
              );
            }
            return true;
          })}
      </BarChart>
    );
  }
}

export default BarstackChart;
