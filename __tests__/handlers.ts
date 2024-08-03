import { http, HttpResponse } from 'msw';

import errorResponse from './replies/error.json';

import agencyResponse from './replies/agency.json';
import alertResponse from './replies/alert.json';
import alertsResponse from './replies/alerts.json';
import deviceResponse from './replies/device.json';
import locationResponse from './replies/location.json';
import locationsResponse from './replies/locations.json';

const accessTokenUrl =
  'https://console.active911.com/interface/dev/api_access.php';
  const baseApiUrl = 'https://access.active911.com/interface/open_api/api';

const accessTokenMock = http.post(accessTokenUrl, () => {
    return HttpResponse.json({
      access_token: 'TESTTOKEN',
      expiration: 2000000000,
    });
});

const agencyMock = http.get(`${baseApiUrl}/`, () => {
  return HttpResponse.json(agencyResponse);
});

const agencyError = http.get(`${baseApiUrl}/`, () => {
  return HttpResponse.json(errorResponse, { status: 500 });
});

const deviceMock = http.get(`${baseApiUrl}/devices/*`, () => {
  return HttpResponse.json(deviceResponse);
});

const deviceError = http.get(`${baseApiUrl}/devices/*`, () => {
  return HttpResponse.json(errorResponse, { status: 500 });
});

const alertsMock = http.get(`${baseApiUrl}/alerts`, () => {
  return HttpResponse.json(alertsResponse);
});

const alertsError = http.get(`${baseApiUrl}/alerts`, () => {
  return HttpResponse.json(errorResponse, { status: 500 });
});

const alertMock = http.get(`${baseApiUrl}/alerts/*`, () => {
  return HttpResponse.json(alertResponse);
});

const alertError = http.get(`${baseApiUrl}/alerts/*`, () => {
  return HttpResponse.json(errorResponse, { status: 500 });
});

const deviceAlertsMock = http.get(`${baseApiUrl}/devices/1/alerts`, () => {
  return HttpResponse.json(alertsResponse);
});

const deviceAlertsError = http.get(`${baseApiUrl}/devices/1/alerts`, () => {
  return HttpResponse.json(errorResponse, { status: 500 });
});

const locationsMock = http.get(`${baseApiUrl}/locations`, () => {
  return HttpResponse.json(locationsResponse);
});

const locationsError = http.get(`${baseApiUrl}/locations`, () => {
  return HttpResponse.json(errorResponse, { status: 500 });
});

const locationMock = http.get(`${baseApiUrl}/locations/*`, () => {
  return HttpResponse.json(locationResponse);
});

const locationError = http.get(`${baseApiUrl}/locations/*`, () => {
  return HttpResponse.json(errorResponse, { status: 500 });
});

const resourceMock = http.get(`${baseApiUrl}/resources/*`, () => {
  return HttpResponse.json(locationResponse);
});

const resourceError = http.get(`${baseApiUrl}/resources/*`, () => {
  return HttpResponse.json(errorResponse, { status: 500 });
});

export const handlers = [
  accessTokenMock,
  agencyMock,
  deviceMock,
  alertsMock,
  alertMock,
  deviceAlertsMock,
  locationsMock,
  locationMock,
  resourceMock,
];

export const errorHandlers = [
  accessTokenMock,
  agencyError,
  deviceError,
  alertsError,
  alertError,
  deviceAlertsError,
  locationsError,
  locationError,
  resourceError,
];

