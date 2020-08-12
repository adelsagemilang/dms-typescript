import * as React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { DataPie, Margin } from '../../../store/chartType';
import {
  defaultColors,
  defaultDimension,
  renderCustomizedLabel,
} from './settings';

type ChartProps = {
  data?: DataPie[];
  colors: string[];
  width: number;
  height: number;
  margin?: Margin;
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
      <div className="is-size-7">
        <PieChart
          width={this.props.width}
          height={this.props.height}
          margin={this.props.margin}
        >
          <Pie
            dataKey="value"
            data={data}
            labelLine={false}
            fill="#FF0000"
            label={renderCustomizedLabel}
          >
            {data &&
              data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={this.props.colors[index % this.props.colors.length]}
                />
              ))}
          </Pie>
        </PieChart>
      </div>
    );
  }
}

export default LinesChart;
