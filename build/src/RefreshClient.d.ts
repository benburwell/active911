import { Agency, Alert, Alerts, Device, Location, Locations, Resource } from "./types.js";
declare class RefreshClient {
    private _refreshToken;
    private _accessToken;
    private _accessTokenExpiration;
    constructor(refreshString: string);
    private _doRequest;
    private _getAccessToken;
    private _refreshAccessToken;
    getAgency(): Promise<Agency>;
    getDevice(id: string): Promise<Device>;
    getAlerts(options?: {
        alert_minutes?: string;
        alert_days?: string;
    }): Promise<Alerts[]>;
    getAlert(id: string): Promise<Alert>;
    getDeviceAlerts(id: string): Promise<Alerts[]>;
    getLocations(): Promise<Locations[]>;
    getLocation(id: string): Promise<Location>;
    getResource(id: string): Promise<Resource>;
}
export default RefreshClient;
