import React from 'react';
import loadable from '@loadable/component';
import pMinDelay from 'p-min-delay';
import XYChart from 'components/loader/chart';
import { monthsGetter, formatSeries } from 'utils/chart/commons';
import ChartBox from '../chartBox';

const BarWithLine = loadable(() =>
  pMinDelay(import('components/chart/barWithLine'), 1000),
);

const priceOptions = (series, monthYear) => {
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
    colors: ['#e31307'],
    dataLabels: {
      enabled: true,
      formatter(val, opts) {
        return `Rp.${val.toLocaleString('id')}`;
      },
      offsetY: -10,
      background: {
        enabled: false,
      },
      style: {
        fontWeight: 400,
        colors: ['#000'],
      },
    },
    stroke: {
      curve: 'straight',
      colors: ['#e31307'],
      width: 1,
    },
    labels: months,
    markers: {
      size: [3, 2],
      colors: ['#e31307'],
      strokeColors: '#fff',
    },
    yaxis: {
      tickAmount: 8,
      labels: {
        offsetX: -20,
        formatter: val => {
          return `Rp.${val.toLocaleString('id')}`;
        },
      },
    },
    legend: {
      showForSingleSeries: true,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: 'left',
      markers: {
        width: 30,
        height: 13,
        radius: 5,
        offsetX: 0,
        fillColors: ['#e31307'],
      },
      offsetY: 200,
    },
    grid: {
      padding: {
        left: 40,
        right: 40,
      },
    },
    responsive: [
      {
        breakpoint: [780],
        options: {
          legend: {
            position: 'bottom',
            offsetY: -5,
          },
          yaxis: {
            show: false,
          },
          grid: {
            padding: {
              left: 40,
              right: 40,
              bottom: 90,
            },
          },
        },
      },
    ],
  };
};

const priceSeries = (series, monthYear) => [
  {
    name: 'Average Price',
    type: 'line',
    data: formatSeries(series, 'value', monthYear),
  },
];

const AveragePrice = props => {
  return (
    <ChartBox title="Average Price">
      {props.loading ? (
        <XYChart height={400} width={350} />
      ) : (
        <BarWithLine
          isZoom={false}
          customOptions={priceOptions(props.series, props.monthYear)}
          height={250}
          series={priceSeries(props.series, props.monthYear)}
          fallback={<XYChart height={400} width={350} />}
        />
      )}
    </ChartBox>
  );
};

export default AveragePrice;
