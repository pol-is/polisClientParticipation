module.exports = {

  domainWhitelist: [
    '^localhost$',
    '^10\\.0\\.0\\.2$',
    '^223\\.200\\.166\\.24$',
    '^ait-polis\\.pdis\\.nat\\.gov\\.tw$'
  ],

  FB_APP_ID: '352411522215675',
  SERVICE_URL: 'https://ait-polis.pdis.nat.gov.tw/',
  JOIN_LOGIN_URL: 'https://join.gov.tw/portal/api/auth/login?redirect_uri=https%3A%2F%2Fait-polis.pdis.nat.gov.tw%2Fsignin-join',
  OUTPUT_PATH: '/path/to/polisFileServer/prod/',
  USE_EMAIL_LOGIN: false,
  USE_JOIN_LOGIN: true,
};
