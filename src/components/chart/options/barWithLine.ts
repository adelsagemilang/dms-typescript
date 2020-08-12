import { kFormatter } from 'utils/helpers';

export const Colors = {
  green: '#9bff3c',
  blue: '#007abb',
  darkGreen: '#2e7373',
  orange: '#ff850b',
  purple: '#d2a6ff',
  darkPurple: '#121286',
};

const commons = props => {
  return {
    chart: {
      type: 'line',
      redrawOnParentResize: true,
      toolbar: {
        show: false,
      },
    },
    colors: [Colors[props.barColor], Colors[props.lineColor]],
    fill: {
      colors: props.barColor ? Colors[props.barColor] : Colors[props.color],
      opacity: 1,
    },
    stroke: {
      width: [0, 1],
      colors: props.lineColor ? [Colors[props.lineColor]] : undefined,
    },
    dataLabels: {
      enabled: false,
    },
    labels: props.labels,
    yaxis: {
      labels: {
        formatter: val => {
          return kFormatter(val);
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: val => {
          return val;
        },
      },
    },
  };
};

export const defaultOptions = props => {
  return {
    ...commons(props),
    legend: {
      position: 'right',
      markers: {
        width: 30,
        height: 13,
        radius: 5,
        offsetX: 0,
        fillColors: [Colors[props.barColor], Colors[props.lineColor]],
      },
      width: 100,
    },
  };
};

export const Options = props => {
  return props.customOptions ? props.customOptions : defaultOptions(props);
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
        radius: 5,
        offsetX: 0,
        fillColors: [Colors[props.barColor], Colors[props.lineColor]],
        customHTML() {
          return '<span class="custom-marker"><i class="fa fa-check"></i></span>';
        },
      },
    },
  };
};
