import { formatSeries } from 'utils/chart/commons';

export function barData(data, monthYear, title) {
  let seriesData: any[] = [];
  let seriesName = 'Total';
  if (data.length > 0) {
    if (data[0].data && typeof data[0].data[0] === 'number') {
      seriesName = data[0].name;
      seriesData = data[0].data;
    } else if (data[0].data) {
      seriesName = data[0].name;
      seriesData = formatSeries(data[0].data, 'value', monthYear);
    } else {
      seriesName = title;
      seriesData = formatSeries(data, 'value', monthYear);
    }
  }

  return [
    {
      name: seriesName,
      data: seriesData,
    },
  ];
}

export function barWithLineData(data, monthYear) {
  return [
    {
      name: data.length > 0 ? data[0].name : 'Total',
      type: 'column',
      data:
        data.length > 0 ? formatSeries(data[0].data, 'value', monthYear) : [],
    },
    {
      name: data.length > 0 ? data[1].name : 'Active',
      type: 'line',
      data:
        data.length > 0 ? formatSeries(data[1].data, 'value', monthYear) : [],
    },
  ];
}

export function stackedData(data, monthYear) {
  return [
    {
      name: 'Route',
      data: formatSeries(data, 'route', monthYear),
    },
    {
      name: 'Volume',
      data: formatSeries(data, 'volume', monthYear),
    },
    {
      name: 'Weight',
      data: formatSeries(data, 'weight', monthYear),
    },
  ];
}

export function chartDataFormatter(data, type, monthYear, title) {
  switch (type) {
    case 'stacked':
      return stackedData(data, monthYear);
    case 'bar-with-line':
      return barWithLineData(data, monthYear);
    default:
      return barData(data, monthYear, title);
  }
}
