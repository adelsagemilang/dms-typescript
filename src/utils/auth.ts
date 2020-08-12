import SimpleCrypto from 'simple-crypto-js';
import { push } from 'connected-react-router';
import { setAdminLayout } from 'layout';

export function setSession(value: any) {
  const cryptr = new SimpleCrypto(process.env.REACT_APP_API_ENDPOINT as string);
  const encrypt = cryptr.encrypt(
    JSON.stringify({
      user_id: value.userinfo.userid,
      fullname: value.userinfo.fullname,
      company_id: value.userinfo.companycd,
      profile_picture: value.userinfo.profile_picture,
      token: value.token || '',
    }),
  );
  localStorage.setItem('authdata', encrypt);
  setAdminLayout(true);
}

export function getSession() {
  const cryptr = new SimpleCrypto(process.env.REACT_APP_API_ENDPOINT as string);
  const value = localStorage.getItem('authdata');
  try {
    if (!value) return false;
    const decrypt = cryptr.decrypt(value) as string;
    if (!decrypt) {
      push('/login');
    }
    const decryptObject = JSON.parse(decrypt);
    return {
      user_id: decryptObject.user_id,
      fullname: decryptObject.fullname,
      company_id: decryptObject.company_id,
      profile_picture: decryptObject.profile_picture,
      secretkey: process.env.REACT_APP_API_SECRET_KEY,
      appid: process.env.REACT_APP_API_APP_ID,
      token: decryptObject.token,
    };
  } catch (error) {
    localStorage.clear();
    push('/login');
    return false;
  }
}

export function checkSession() {
  const cryptr = new SimpleCrypto(process.env.REACT_APP_API_ENDPOINT as string);
  const value = localStorage.getItem('authdata');
  if (!value) return false;
  const decrypt = cryptr.decrypt(value) as string;
  if (!decrypt) return false;
  setAdminLayout(true);
  return true;
}

export function removeSession() {
  localStorage.removeItem('authdata');
}
