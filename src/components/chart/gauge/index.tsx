import * as React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import { DataGauge } from '../../../store/chartType';
import {
  defaultColors,
  defaultDimension,
  defaultSettings,
  defaultDataRange,
} from './settings';

type ChartProps = {
  data: DataGauge;
  colors: string[];
  width: number;
  height: number;
  ringWidth: number;
  needleColor: string;
  textColor: string;
  needleHeightRatio: number;
  dataRange: string[];
};

export default class GaugeChart extends React.Component<ChartProps> {
  public static defaultProps = {
    colors: defaultColors,
    width: defaultDimension.width,
    height: defaultDimension.height,
    ringWidth: defaultSettings.ringWidth,
    needleColor: defaultSettings.needleColor,
    textColor: defaultSettings.textColor,
    needleHeightRatio: defaultSettings.needleHeightRatio,
    dataRange: defaultDataRange,
  };

  render() {
    const { data } = this.props;
    return (
      <ReactSpeedometer
        maxValue={data.maxValue}
        value={data.value ? data.value : 0}
        width={this.props.width}
        height={this.props.height}
        needleColor={this.props.needleColor}
        ringWidth={this.props.ringWidth}
        segmentColors={this.props.colors}
        textColor={this.props.textColor}
        needleHeightRatio={this.props.needleHeightRatio}
        // customSegmentStops={data.allSegments}
        customSegmentStops={this.props.dataRange}
        valueFormat=".0%"
        currentValueText=""
      />
    );
  }
}
