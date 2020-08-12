import { kFormatter } from 'utils/helpers';

export const Colors = {
  darkPurple: '#5757be',
  maroon: '#d54246',
  cyan: '#26fdfd',
  pink: '#ff8787',
  lightBlue: '#85f2f2',
  darkGreen: '#2e7373',
};

const commons = props => {
  return {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    colors: [Colors[props.color]],
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: '10px',
        fontWeight: '400',
        colors: ['#333'],
      },
    },
    fill: {
      colors: Colors[props.color],
      opacity: 1,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    yaxis: {
      labels: {
        formatter: val => {
          return kFormatter(val);
        },
      },
    },
    xaxis: {
      categories: props.labels,
    },
  };
};

export const Options = props => {
  return {
    ...commons(props),
    legend: {
      showForSingleSeries: true,
      position: 'right',
      markers: {
        width: 30,
        height: 13,
        strokeColor: Colors[props.color],
        fillColors: [Colors[props.color]],
        radius: 5,
        offsetX: 0,
      },
    },
  };
};

export const ZoomedOptions = props => {
  return {
    ...commons(props),
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
        strokeColor: Colors[props.color],
        fillColors: [Colors[props.color]],
        radius: 5,
        offsetX: 0,
        customHTML() {
          return '<span class="custom-marker"><i class="fa fa-check"></i></span>';
        },
      },
    },
  };
};
