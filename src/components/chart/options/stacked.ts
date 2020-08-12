import { kFormatter } from 'utils/helpers';

const Colors = {
  blue: '#4572cd',
  red: '#dd2d21',
  orange: '#ffa200',
};

const commons = labels => ({
  chart: {
    type: 'bar',
    stacked: true,
    redrawOnParentResize: true,
    toolbar: {
      show: false,
    },
  },
  colors: [Colors.blue, Colors.red, Colors.orange],
  fill: {
    colors: [Colors.blue, Colors.red, Colors.orange],
    opacity: 1,
  },
  dataLabels: {
    enabled: true,
    offsetY: 0,
    style: {
      fontSize: '8px',
      fontWeight: '400',
      colors: ['#fff', '#fff', '#333'],
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
  yaxis: {
    labels: {
      formatter: val => {
        return kFormatter(val);
      },
    },
  },
  xaxis: {
    type: 'category',
    categories: labels,
    axisTicks: {
      show: false,
    },
  },
});

export const Options = labels => ({
  ...commons(labels),
  legend: {
    position: 'right',
    showForSingleSeries: true,
    showForNullSeries: true,
    showForZeroSeries: true,
    markers: {
      width: 30,
      height: 13,
      radius: 5,
      offsetX: 0,
      fillColors: [Colors.blue, Colors.red, Colors.orange],
    },
  },
});

export const ZoomedOptions = labels => ({
  ...commons(labels),
  legend: {
    position: 'bottom',
    showForSingleSeries: true,
    showForNullSeries: true,
    showForZeroSeries: true,
    formatter(seriesName, opts) {
      return `<div class="formatter-title">By ${seriesName}</div><div class="formatter-total">${kFormatter(
        opts.w.globals.seriesTotals[opts.seriesIndex],
      )}</div>`;
    },
    offsetY: -50,
    markers: {
      width: 30,
      height: 13,
      radius: 5,
      offsetX: 0,
      fillColors: [Colors.blue, Colors.red, Colors.orange],
      customHTML() {
        return '<span class="custom-marker"><i class="fa fa-check"></i></span>';
      },
    },
  },
});
