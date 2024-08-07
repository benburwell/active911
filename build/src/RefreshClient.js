"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateUnixTimestamp = (offset) => {
    const now = Date.now() / 1000;
    return Math.round(offset ? now - offset : now);
};
class RefreshClient {
    constructor(refreshString) {
        this._accessToken = '';
        this._accessTokenExpiration = generateUnixTimestamp(-1);
        if (!refreshString) {
            throw new Error('Refresh token must be supplied');
        }
        this._refreshToken = refreshString;
    }
    async _refreshAccessToken() {
        const response = await fetch('https://console.active911.com/interface/dev/api_access.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                refresh_token: this._refreshToken,
            }).toString(),
        });
        if (!response.ok) {
            throw new Error(`Access Token HTTP Error: ${response.status}`);
        }
        const accessTokenJson = await response.json();
        const data = accessTokenJson;
        if (data.access_token && data.expiration) {
            this._accessToken = data.access_token;
            this._accessTokenExpiration = data.expiration;
            return data.access_token;
        }
        return Promise.reject(`Malformed access token response. Data Received: ${accessTokenJson}`);
    }
    async _getAccessToken() {
        const currentTime = generateUnixTimestamp();
        if (this._accessTokenExpiration - currentTime <= 10) {
            return this._refreshAccessToken();
        }
        return this._accessToken;
    }
    async _doRequest(url) {
        const base = 'https://access.active911.com/interface/open_api/api';
        const token = await this._getAccessToken();
        const fullUrl = `${base}${url}`;
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const result = await response.json();
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
    getAgency() {
        return this._doRequest('/');
    }
    getDevice(id) {
        return this._doRequest(`/devices/${id}`);
    }
    getAlerts(options) {
        let url = '/alerts';
        if (options) {
            url += `?${new URLSearchParams(options).toString()}`;
        }
        return this._doRequest(url);
    }
    getAlert(id) {
        return this._doRequest(`/alerts/${id}`);
    }
    getDeviceAlerts(id) {
        return this._doRequest(`/devices/${id}/alerts`);
    }
    getLocations() {
        return this._doRequest('/locations');
    }
    getLocation(id) {
        return this._doRequest(`/locations/${id}`);
    }
    getResource(id) {
        return this._doRequest(`/resources/${id}`);
    }
}
exports.default = RefreshClient;
