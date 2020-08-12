import month from 'constants/month.json';
import moment from 'moment';
import _ from 'lodash';

export function dataBarLineMapper(
  dataAPI: any,
  currentMonth: any,
  shortenMonth = false,
) {
  const today = new Date();
  currentMonth = currentMonth === 'all' ? today.getMonth() + 1 : currentMonth;
  const monthList = lastNMonths(parseInt(currentMonth), shortenMonth);

  const dataBar = monthList.map((monthName: string) => ({ name: monthName }));

  dataAPI.data &&
    // eslint-disable-next-line array-callback-return
    dataAPI.data.map((valOTIF: any) => {
      const objName = valOTIF.name.replace(/\s+/g, '-').toLowerCase();
      valOTIF.data &&
        // eslint-disable-next-line array-callback-return
        valOTIF.data.map((valPercent: any, idxPercent) => {
          // eslint-disable-next-line array-callback-return
          dataBar.map((valMonth, idxMonth) => {
            if (idxPercent === idxMonth) valMonth[objName] = valPercent;
          });
        });
    });

  return dataBar;
}

export function dataBarLineNewMapper(dataAPI: any, shortenMonth = false) {
  const newData =
    dataAPI &&
    dataAPI.map((item: any) => {
      delete item._id;
      const splitedDate = item.year_month && item.year_month.split('-');
      const convertedMonth =
        splitedDate && month[parseFloat(splitedDate[1]) - 1];

      const newItem = {
        name: shortenMonth ? convertedMonth.substring(0, 3) : convertedMonth,
        ...item,
      };
      delete newItem.year_month;
      return newItem;
    });

  return newData;
}

export function dataBarLineFixMapper(
  dataAPI: any,
  currentMonth: any,
  shortenMonth = false,
) {
  const today = new Date();
  currentMonth =
    currentMonth === 'all' ? today.getMonth() + 1 : Number(currentMonth);
  const monthList = lastNMonths(parseInt(currentMonth), shortenMonth);

  const dataBar = monthList.map((monthName: string) => ({ name: monthName }));

  const newData = dataBar.map(valMonth => {
    let newItem = {};

    if (dataAPI && Array.isArray(dataAPI) && dataAPI.length) {
      for (var i = 0; i < dataAPI.length; i++) {
        delete dataAPI[i]._id;
        const splitedDate =
          dataAPI[i].year_month && dataAPI[i].year_month.split('-');
        let convertedMonth =
          splitedDate && month[parseFloat(splitedDate[1]) - 1];

        if (shortenMonth && convertedMonth) {
          convertedMonth = convertedMonth.substring(0, 3);
        }

        const itemName = shortenMonth
          ? valMonth.name.substring(0, 3)
          : valMonth.name;

        if (convertedMonth === valMonth.name) {
          delete dataAPI[i].year_month;
          newItem = {
            name: itemName,
            ...dataAPI[i],
          };
          break;
        } else {
          const itemDataAPI = _.mapValues(dataAPI[i], () => 0);
          delete itemDataAPI.year_month;
          newItem = {
            name: valMonth.name,
            ...itemDataAPI,
          };
        }
      }
    } else {
      newItem = {
        name: valMonth.name,
      };
    }
    return newItem;
  });

  return newData;
}

export function dataPieMapper(dataAPI: any) {
  if (dataAPI) {
    delete dataAPI._id;
    return {
      ...dataAPI,
    };
  }
}

function lastNMonths(currentMonth: number, shortenMonth = false) {
  const monthSetting = currentMonth - 1;
  const monthList = month;
  const lastNMonths: any = [];

  for (let i = 4; i >= 0; i--) {
    const newMonth = monthSetting - i;
    let monthInWords = monthList[newMonth];

    if (newMonth < 0) {
      monthInWords = monthList[12 + newMonth];
    }

    if (shortenMonth) monthInWords = monthInWords.substring(0, 3);

    lastNMonths.push(monthInWords);
  }

  return lastNMonths;
}

export function yearMonth(year, month) {
  month = month === 'all' ? moment().month() + 1 : month;
  return `${year}-${`0${month}`.slice(-2)}`;
}

type types = 'num' | 'string';

export function monthsGetter(m, type: types, formatLength?) {
  const months: any[] = [];
  const format = type || 'string';
  for (let i = 0; i < 5; i++) {
    m -= 1;
    m = m < 0 ? m + 12 : m;
    const res = format === 'string' ? month[m] : m;
    months.push(formatLength ? res.slice(0, formatLength) : res);
  }

  return months.reverse();
}

export function formatSeries(series, field, monthYear) {
  const m = Number(monthYear.slice(5, 7)); // get the current selected month on filter
  const y = Number(monthYear.slice(0, 4)); // get the current selected year on filter
  const months = monthsGetter(m, 'num'); // get the array of 5 months back from the current month

  const res: number[] = [];

  // sort series data from api based the year_month, so the order should exact the same with months
  series = series.sort((a, b) =>
    Number(a.year_month.replace('-', '')) >
    Number(b.year_month.replace('-', ''))
      ? 1
      : -1,
  );

  // finding missing months and set in with 0 value
  months.forEach((obj, i) => {
    const monthTarget = months[i] + 1;
    const yearTarget = m - monthTarget < 0 ? y - 1 : y;
    const yearMonthTarget = `${yearTarget}-${`0${monthTarget}`.slice(-2)}`;

    const target = series.find(s => s.year_month === yearMonthTarget);
    const val = target ? target[field] : 0;

    res.push(val);
  });

  return res;
}
