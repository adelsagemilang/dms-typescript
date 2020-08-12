import moment from 'moment';
import { orderState, orderStateActive } from '../constants';

export function formatFromMinutes(given_minutes: number) {
  const given_seconds = given_minutes;

  const hours = Math.floor(given_seconds / 3600);
  const minutes = Math.floor((given_seconds - hours * 3600) / 60);
  // let seconds = Math.floor(given_seconds - (hours * 3600) - (minutes * 60));

  let timeString = hours.toString().padStart(2, '0');
  timeString += `:${minutes.toString().padStart(2, '0')}`;
  // timeString += ':' + seconds.toString().padStart(2, '0');

  return timeString;
}

export function formatDiffFromMinutes(
  given_seconds: number,
  long_unit = false,
  formatted_min = false,
) {
  if (!given_seconds) {
    return '0m';
  }

  // const weeks = 0;
  // const is_minus = !(given_seconds > 0);

  given_seconds = given_seconds > 0 ? given_seconds : given_seconds * -1;
  const years = Math.floor(given_seconds / (12 * 30 * 7 * 24 * 3600));

  given_seconds %= 12 * 30 * 7 * 24 * 3600;
  const months = Math.floor(given_seconds / (30 * 7 * 24 * 3600));

  given_seconds %= 30 * 7 * 24 * 3600;
  const weeks = Math.floor(given_seconds / (7 * 24 * 3600));

  given_seconds %= 7 * 24 * 3600;
  const day = Math.floor(given_seconds / (24 * 3600));

  given_seconds %= 24 * 3600;
  const hour = Math.floor(given_seconds / 3600);

  given_seconds %= 3600;
  const minutes = Math.floor(given_seconds / 60);

  given_seconds %= 60;
  const seconds = Math.floor(given_seconds);

  let timeString = '';
  if (years > 0) {
    timeString = years + (long_unit ? (years > 1 ? ' Years' : ' Year') : 'y');
    timeString += `, ${months}${
      long_unit ? (months > 1 ? ' Months' : ' Month') : 'm'
    }`;
  } else if (months > 0) {
    timeString =
      months + (long_unit ? (months > 1 ? ' Months' : ' Month') : 'm');
    timeString += `, ${weeks}${
      long_unit ? (weeks > 1 ? ' Weeks' : ' Week') : 'w'
    }`;
  } else if (weeks > 0) {
    timeString = weeks + (long_unit ? (weeks > 1 ? ' Weeks' : ' Week') : 'w');
    timeString += `, ${day}${long_unit ? (day > 1 ? ' Days' : ' Day') : 'd'}`;
  } else if (day > 0) {
    timeString = day + (long_unit ? (day > 1 ? ' Days' : ' Day') : 'd');
    timeString += `, ${hour}${
      long_unit ? (hour > 1 ? ' Hours' : ' Hour') : 'h'
    }`;
  } else if (hour > 0) {
    if (formatted_min) {
      timeString = `${`0${hour}`.slice(-2)}:${`0${minutes}`.slice(-2)}`;
    } else {
      timeString = hour + (long_unit ? (hour > 1 ? ' Hours' : ' Hour') : 'h');
      timeString += `, ${minutes}${
        long_unit ? (minutes > 1 ? ' Mins' : ' Min') : 'm'
      }`;
    }
  } else if (minutes > 0) {
    if (formatted_min) {
      timeString = `${`0${hour}`.slice(-2)}:${`0${minutes}`.slice(-2)}`;
    } else {
      timeString = hour + (long_unit ? (hour > 1 ? ' Hours' : ' Hour') : 'h');
      timeString += `, ${minutes}${
        long_unit ? (minutes > 1 ? ' Mins' : ' Min') : 'm'
      }`;
    }
  } else if (seconds > 0) {
    timeString = '0m';
  } else {
    // timeString = seconds + (long_unit ? (seconds > 1 ? ' Secs' : ' Sec') : 's');
    timeString = '0m';
  }

  return timeString;
}

export function indexOrderState(i: any): number {
  return parseInt(i.toString());
}

export function keyOrderState(i: any, prefix?: string): any {
  const index = indexOrderState(i);
  return orderState[index] + (prefix !== undefined ? prefix : '');
}

export function queryStringBuilder(endpoint: any, action: any) {
  const uri = encodeURIComponent;
  const { payload } = action;
  let key = '';

  if (
    action !== undefined &&
    action.payload !== undefined &&
    action.payload.params !== null
  ) {
    const params = Object.keys(payload.params)
      .map(k => {
        if (k === 'locations') key = 'locations[]';
        else if (k === 'transporters') key = 'transporters[]';
        else key = k;

        return `${key}=${uri(payload.params[k])}`;
      })
      .join('&');
    endpoint += params;
  }

  return endpoint;
}

export function queryStringBuilderNoaction(endpoint: any, params: any) {
  const uri = encodeURIComponent;
  let key = '';

  if (params !== null) {
    const fetchParams = Object.keys(params)
      .map(k => {
        if (k === 'locations') key = 'locations[]';
        else if (k === 'transporters') key = 'transporters[]';
        else key = k;

        return `${key}=${uri(params[k])}`;
      })
      .join('&');
    endpoint += fetchParams;
  }

  return endpoint;
}

export function SplitTime(numberOfHours: number) {
  let Days = Math.floor(numberOfHours / 24);
  Days = Days > 0 ? Days : Days * -1;
  const Remainder = numberOfHours % 24;

  let Hours = Math.floor(Remainder);
  Hours = Hours > 0 ? Hours : Hours * -1;

  let Minutes = Math.floor(60 * (Remainder - Hours));
  Minutes = Minutes > 0 ? Minutes : Minutes * -1;

  let Seconds = Math.floor(3600 * (Remainder - Hours));
  Seconds = Seconds > 0 ? Seconds : Seconds * -1;

  let returnValue;
  if (Days > 0) {
    returnValue = Days + (Days > 1 ? ' Days' : ' Day');
  } else if (Hours > 0) {
    returnValue = Hours + (Hours > 1 ? ' Hrs' : ' Hr');
  } else if (Minutes > 0) {
    returnValue = `${Minutes} m`;
  } else {
    returnValue = `${Seconds} s`;
  }
  return returnValue;
}
export function isEmptyObj(obj: {}) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export function calculateKpi(estimate: any, actual: any) {
  return moment(estimate).diff(moment(actual), 'seconds');
}

export function calculateDiff(estimate: any, prev: any) {
  return moment(estimate).diff(moment(prev), 'seconds');
}

export function getSegmentUrl(url = '', segment = 0) {
  return url.split('/')[segment + 1];
}

export function isEqual(value: any, other: any) {
  // Get the value type
  const type = Object.prototype.toString.call(value);

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false;

  // If items are not an object or array, return false
  if (!['[object Array]', '[object Object]'].includes(type)) return false;

  // Compare the length of the length of the two items
  const valueLen =
    type === '[object Array]' ? value.length : Object.keys(value).length;
  const otherLen =
    type === '[object Array]' ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false;

  // Compare two items
  const compare = function(item1: any, item2: any) {
    // Get the object type
    const itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].includes(itemType)) {
      if (!isEqual(item1, item2)) return false;
    }

    // Otherwise, do a simple comparison
    else {
      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) return false;

      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) return false;
      } else if (item1 !== item2) return false;
    }
  };

  // Compare properties
  if (type === '[object Array]') {
    for (let i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  }

  // If nothing failed, return true
  return true;
}

export function firstOrderState() {
  const activeOrderState = orderStateActive;
  return keyOrderState(activeOrderState[0]);
}

export function lastOrderState() {
  const activeOrderState = orderStateActive;
  return keyOrderState(activeOrderState[activeOrderState.length - 1]);
}

export function dateFormatter(dateString: any) {
  const date: any = new Date(dateString);
  const year: any = date.getFullYear();
  let month: any = date.toLocaleString('default', { month: 'long' });
  let dt: any = date.getDate();

  if (dt < 10) {
    dt = `0${dt}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  return `${dt} ${month} ${year}`;
}

export function dateTimeFormatter(dateString: any) {
  const date: any = new Date(dateString);
  const year: any = date.getFullYear();
  let month: any = date.toLocaleString('default', { month: 'long' });
  let dt: any = date.getDate();
  let hour: any = date.getHours();
  let minutes: any = date.getMinutes();

  if (dt < 10) {
    dt = `0${dt}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${dt} ${month} ${year}, ${hour}:${minutes}`;
}

export function fetchFilterChild(dataFilter: any) {
  const filterID =
    dataFilter &&
    dataFilter.map((item: any) => {
      const cleanItem = item.split('-');
      return cleanItem[1];
    });

  return filterID;
}

export function fetchFilter(dataFilter: any) {
  const filterLocation = dataFilter && dataFilter.location;
  const filterTransporter = dataFilter && dataFilter.transporter;

  const filterResult = {
    locations: filterLocation,
    transporters: filterTransporter,
    year: dataFilter.year,
    month: dataFilter.month,
  };

  return filterResult;
}

export function pushAction(currentAction, newPayload) {
  const filters = fetchFilter(newPayload);

  const newAction = {
    ...currentAction,
    payload: {
      ...currentAction.payload,
      params: {
        ...currentAction.payload.params,
        ...filters,
      },
    },
  };

  return newAction;
}

export function historyWrapper(fullData: any) {
  let history = {};

  if (fullData)
    history = {
      transporter: fullData.transporter && fullData.transporter,
      truck: fullData.truck && fullData.truck,
      dispatch: fullData.dispatch && fullData.dispatch,
      arrival: fullData.arrival && fullData.arrival,
      inspection: fullData.inspection && fullData.inspection,
      waiting_loading: fullData.waiting_loading && fullData.waiting_loading,
      loading: fullData.loading && fullData.loading,
      gate_out: fullData.gate_out && fullData.gate_out,
      delivery: fullData.delivery && fullData.delivery,
      inspection_destination:
        fullData.inspection_destination && fullData.inspection_destination,
      waiting_unloading:
        fullData.waiting_unloading && fullData.waiting_unloading,
      unloading: fullData.unloading && fullData.unloading,
      checkout: fullData.checkout && fullData.checkout,
    };

  return history;
}

export function wordLimit(word: string, limit = 20) {
  const length = word && word.length ? word.length : 0;
  const result =
    word && word.substring(0, limit) + (length > limit ? '...' : '');
  return result;
}

export function kpiTitle(title: string) {
  switch (title) {
    case 'waiting_unloading':
      title = 'Waiting';
      break;
    case 'waiting_loading':
      title = 'Waiting';
      break;
    case 'inspection_destination':
      title = 'Inspection';
      break;
    case 'dropoff':
      title = 'Drop Off';
      break;
    case 'pickup':
      title = 'Pick Up';
      break;
    case 'gate_out':
      title = 'Gate Out';
      break;
    default:
      title = title.charAt(0).toUpperCase() + title.slice(1); // Uppercase first letter
  }

  return title;
}

export function reloadOnce(timeout?: number) {
  if (window.localStorage) {
    if (!localStorage.getItem('isReload')) {
      localStorage['isReload'] = true;
      if (timeout) setTimeout(() => window.location.reload(), timeout);
      else window.location.reload();
    }
  }
}

export function latestTicket(tickets: any) {
  let result = {
    desc: '-',
    last_update: '-',
  };

  if (tickets && Array.isArray(tickets) && tickets.length) {
    const lastItem = tickets[tickets.length - 1];
    result = {
      desc: wordLimit(lastItem.descs, 42),
      last_update: dateTimeFormatter(lastItem.updated_at),
    };
  }

  return result;
}
