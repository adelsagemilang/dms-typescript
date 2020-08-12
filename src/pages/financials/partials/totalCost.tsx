import React from 'react';
import loadable from '@loadable/component';
import pMinDelay from 'p-min-delay';
import XYChart from 'components/loader/chart';
import { kFormatter } from 'utils/helpers';
import { monthsGetter, formatSeries } from 'utils/chart/commons';
import ChartBox from '../chartBox';

const BarWithLine = loadable(() =>
  pMinDelay(import('components/chart/barWithLine'), 1000),
);

const costOptions = (series, monthYear) => {
  const m = Number(monthYear.slice(5, 7));
  const months = monthsGetter(m, 'string');

  return {
    chart: {
      type: 'line',
      redrawOnParentResize: true,
      toolbar: {
        show: false,
      },
    },
    colors: ['#6596b7', '#e31307'],
    fill: {
      opacity: 1,
    },
    stroke: {
      width: [0, 3],
    },
    labels: months,
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
      formatter(val, opts) {
        return `Rp.${val.toLocaleString('id')}`;
      },
      offsetY: -10,
      background: {
        enabled: false,
      },
      style: {
        colors: ['#fff'],
      },
    },
    yaxis: [
      {
        title: {
          text: 'Total Order',
        },
        tickAmount: 8,
      },
      {
        opposite: true,
        title: {
          text: 'Total Cost',
        },
        tickAmount: 8,
        labels: {
          formatter: val => {
            return parseFloat(kFormatter(val));
          },
        },
      },
    ],
    legend: {
      position: 'left',
      markers: {
        width: 30,
        height: 13,
        radius: 5,
        offsetX: 0,
        fillColors: ['#6596b7', '#e31307'],
      },
      offsetY: 180,
    },
    markers: {
      size: [1, 3],
      colors: ['#e31307'],
      strokeColors: '#fff',
    },
    responsive: [
      {
        breakpoint: [780],
        options: {
          legend: {
            position: 'bottom',
            offsetY: 0,
          },
          dataLabels: {
            enabled: false,
          },
          labels: months,
        },
      },
    ],
  };
};

const costSeries = (series, monthYear) => [
  {
    name: 'Total Order',
    type: 'column',
    data: formatSeries(series, 'total_order', monthYear),
  },
  {
    name: 'Total Cost',
    type: 'line',
    data: formatSeries(series, 'total_cost', monthYear),
  },
];

const TotalCost = props => {
  return (
    <ChartBox title="Total Costs" customClass="custom-stroke">
      {props.loading ? (
        <XYChart height={400} width={350} />
      ) : (
          <BarWithLine
            isZoom={false}
            customOptions={costOptions(props.series, props.monthYear)}
            height={250}
            series={costSeries(props.series, props.monthYear)}
            fallback={<XYChart height={400} width={350} />}
          />
        )}
    </ChartBox>
  );
};

export default TotalCost;
