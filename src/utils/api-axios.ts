import axios from 'axios';
import { getSession, checkSession } from './auth';

axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

export async function getApi(
  path: string,
  data?: any,
  url?: any,
  headers?: object,
) {
  const baseUrl = url || process.env.REACT_APP_API_ENDPOINT;
  headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (checkSession()) {
    const session = getSession();
    headers = {
      userid: (session && session.user_id) || '',
      company_id: (session && session.company_id) || '',
      ...headers,
    };
  }

  const res = await axios({
    url: `${path}`,
    method: 'get',
    data: JSON.stringify(data),
    baseURL: baseUrl,
    headers,
  });
  return res.data;
}

export async function postApi(
  path: string,
  data?: any,
  url?: any,
  headers?: object,
) {
  const baseUrl = url || process.env.REACT_APP_API_ENDPOINT;

  headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers,
  };

  if (checkSession()) {
    const session = getSession();
    headers = {
      userid: (session && session.user_id) || '',
      company_id: (session && session.company_id) || '',
      ...headers,
    };
  }

  const res = await axios({
    url: `${path}`,
    method: 'post',
    data,
    baseURL: baseUrl,
    headers,
  });

  return res.data;
}
