import { 
  AccessToken,
  Agency,
  Alert,
  Alerts,
  BaseApiResponse,
  Device,
  Location,
  Locations,
  Resource
} from "./types.js";

  const generateUnixTimestamp = (offset?: number): number => {
    const now = Date.now() / 1000;
    return Math.round(offset ? now - offset : now);
  };

class RefreshClient {
  private _refreshToken: string;
  private _accessToken: string = '';
  private _accessTokenExpiration: number = generateUnixTimestamp(-1);

  constructor(refreshString: string) {
    if (!refreshString) {
      throw new Error('Refresh token must be supplied');
    }
    this._refreshToken = refreshString;
  }

  private async _refreshAccessToken(): Promise<string> {
    const response = await fetch(
      'https://console.active911.com/interface/dev/api_access.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          refresh_token: this._refreshToken,
        }).toString(),
      },
    );

    if (!response.ok) {
      throw new Error(`Access Token HTTP Error: ${response.status}`);
    }

    const accessTokenJson = await response.json();
    const data = accessTokenJson as AccessToken;

    if (data.access_token && data.expiration) {
      this._accessToken = data.access_token;
      this._accessTokenExpiration = data.expiration;
      return data.access_token;
    }

    return Promise.reject(
      `Malformed access token response. Data Received: ${accessTokenJson}`,
    );
  }

  private async _getAccessToken(): Promise<string> {
    const currentTime = generateUnixTimestamp();
    if (this._accessTokenExpiration - currentTime <= 10) {
      return this._refreshAccessToken();
    }

    return this._accessToken;
  }

  private async _doRequest(url: string): Promise<object> {
    const base = 'https://access.active911.com/interface/open_api/api';
    const token = await this._getAccessToken();
    const fullUrl = `${base}${url}`;

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await (response.json() as Promise<BaseApiResponse>);

    if (result.result === 'success') {
      const properties = Object.getOwnPropertyNames(result.message);
      if (properties.length === 0) {
        return {};
      }

      const propertyToReturn = properties[0];
      return result.message[propertyToReturn];
    }

    return Promise.reject(result.message);
  }

  public getAgency(): Promise<Agency> {
    return this._doRequest('/') as Promise<Agency>;
  }

  public getDevice(id: string): Promise<Device> {
    return this._doRequest(`/devices/${id}`) as Promise<Device>;
  }

  public getAlerts(options?: {
    alert_minutes?: string;
    alert_days?: string;
  }): Promise<Alerts[]> {
    let url = '/alerts';

    if (options) {
      url += `?${new URLSearchParams(options).toString()}`;
    }

    return this._doRequest(url) as Promise<Alerts[]>;
  }

  public getAlert(id: string): Promise<Alert> {
    return this._doRequest(`/alerts/${id}`) as Promise<Alert>;
  }

  public getDeviceAlerts(id: string): Promise<Alerts[]> {
    return this._doRequest(`/devices/${id}/alerts`) as Promise<Alerts[]>;
  }

  public getLocations(): Promise<Locations[]> {
    return this._doRequest('/locations') as Promise<Locations[]>;
  }

  public getLocation(id: string): Promise<Location> {
    return this._doRequest(`/locations/${id}`) as Promise<Location>;
  }

  public getResource(id: string): Promise<Resource> {
    return this._doRequest(`/resources/${id}`) as Promise<Resource>;
  }
}

export default RefreshClient;