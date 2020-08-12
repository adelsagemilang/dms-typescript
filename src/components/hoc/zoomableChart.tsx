/*
 ** This is a Higher Order Component for chart zoomable chart
 ** Currently implemented on quantity page (/quantiity)
 */

import React, { Component } from 'react';
import XYChart from 'components/loader/chart';
import Switch from 'react-switch';
import {
  Card,
  CardHeader,
  CardHeaderTitle,
  CardHeaderIcon,
  CardImage,
  Column,
} from 'bloomer';
import { monthsGetter } from 'utils/chart/commons';
import { chartDataFormatter } from 'utils/chart/zoomabelFormatter';
import 'styles/sass/components/chart.sass';

type Color =
  | 'blue'
  | 'lightBlue'
  | 'green'
  | 'darkGreen'
  | 'yellow'
  | 'orange'
  | 'purple'
  | 'darkPurple'
  | 'maroon'
  | 'cyan'
  | 'pink';

type Chart = 'stacked' | 'barWithLine' | 'bar';

interface PropTypes {
  title: string;
  color?: Color;
  barColor?: Color;
  lineColor?: Color;
  toggleZoom: any;
  isZoom: boolean;
  data: any;
  chartType: string;
  monthYear: string;
}

function zoomableChart(WrappedComponent) {
  return class extends Component<PropTypes, {}> {
    render() {
      const {
        title,
        color,
        toggleZoom,
        isZoom,
        data,
        chartType,
        monthYear,
      } = this.props;
      return (
        <Column className={isZoom ? 'is-zoom' : ''}>
          <Card className={`card-chart is-${color}`}>
            <CardHeader>
              <CardHeaderTitle>{title}</CardHeaderTitle>
              {!data.isLoading && (
                <CardHeaderIcon>
                  <Switch
                    height={14}
                    width={30}
                    handleDiameter={17}
                    onChange={() => toggleZoom(this.props)}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#fff"
                    className="switch"
                    checked={isZoom}
                    id="isChecked"
                  />
                </CardHeaderIcon>
              )}
            </CardHeader>
            <CardImage>
              {data.isLoading ? (
                <XYChart height={400} width={350} />
              ) : (
                <WrappedComponent
                  {...this.props}
                  labels={monthsGetter(
                    Number(monthYear.slice(5, 7)),
                    'string',
                    3,
                  )}
                  series={chartDataFormatter(
                    data.chartData.data,
                    chartType,
                    monthYear,
                    data.chartData.title,
                  )}
                />
              )}
            </CardImage>
          </Card>
        </Column>
      );
    }
  };
}

export default zoomableChart;
