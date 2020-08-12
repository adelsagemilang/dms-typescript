import SimpleCrypto from 'simple-crypto-js';

export function setSetting(value: any) {
  const cryptr = new SimpleCrypto(process.env.REACT_APP_API_ENDPOINT as string);

  // const encrypt = cryptr.encrypt(
  //   JSON.stringify({
  //     user_id: value.userinfo.userid,
  //     fullname: value.userinfo.fullname,
  //     company_id: value.userinfo.companycd,
  //     profile_picture: value.userinfo.profile_picture,
  //     token: value.token || '',
  //   }),
  // );

  const encrypt = cryptr.encrypt(value);

  return encrypt;
}

export function getSetting() {
  const cryptr = new SimpleCrypto(process.env.REACT_APP_API_ENDPOINT as string);
  const value = localStorage.getItem('settingFilter');

  try {
    if (!value) return false;
    const decrypt = cryptr.decrypt(value) as string;

    if (!decrypt) return false;

    return JSON.parse(decrypt);
  } catch (error) {
    localStorage.clear();

    return false;
  }
}
