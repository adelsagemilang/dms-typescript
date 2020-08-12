import axios from 'axios';
import { getSession } from 'utils/auth';

axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

interface ArgumentTypes {
  method: any;
  path: string;
  data?: any;
  url?: string;
  headers?: object;
  params?: object;
}

export async function callApi(args: ArgumentTypes) {
  const { method, path, data, url, headers, params } = args;
  const baseUrl = url || process.env.REACT_APP_API_ENDPOINT;
  const session: any = getSession();

  const defaultHeaders = {
    userid: session.user_id,
    company_id: session.company_id,
  };

  const res = await axios({
    url: `${path}`,
    method,
    data: JSON.stringify(data),
    baseURL: baseUrl,
    headers: headers || defaultHeaders,
    params,
  });
  return res.data;
}

export async function callApiAll(args: ArgumentTypes) {
  const { method, path, data, url, headers, params } = args;
  const baseUrl = url || process.env.REACT_APP_API_ENDPOINT;
  const session: any = getSession();

  const defaultHeaders = {
    userid: session.user_id,
    company_id: session.company_id,
  };

  const res = await axios({
    url: `${path}`,
    method,
    data: JSON.stringify(data),
    baseURL: baseUrl,
    headers: headers || defaultHeaders,
    params,
  });
  return res.data;
}
