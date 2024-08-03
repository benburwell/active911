export interface AccessToken {
    access_token: string;
    expiration: number;
}
export interface BaseApiResponse {
    result: string;
    message: string | object;
}
export interface Agency {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    latitude: string;
    longitude: string;
    devices: {
        id: string;
        uri: string;
    }[];
}
export interface Device {
    id: string;
    name: string;
    latitude: string;
    longitude: string;
    position_accuracy: string;
    position_timestamp: string;
    agencies: {
        id: string;
        uri: string;
    }[];
}
export interface Alerts {
    id: string;
    uri: string;
}
export interface Alert {
    id: string;
    agency: {
        id: string;
        uri: string;
    };
    place: string;
    address: string;
    unit?: string;
    city: string;
    state: string;
    latitude: string;
    longitude: string;
    source: string;
    units: string;
    cad_code: string;
    priority: string;
    details?: string;
    sent: string;
    description: string;
    pagegroups: {
        title: string;
        prefix: string;
    }[];
    map_code?: string;
    received: string;
    cross_street?: string;
    responses: {
        device: {
            id: string;
            uri: string;
        };
        timestamp: string;
        response: string;
    }[];
}
export interface Locations {
    id: string;
    uri: string;
}
export interface Location {
    locations: {
        id: string;
        name: string;
        description: string;
        icon_id: string;
        icon_color: string;
        latitude: string;
        longitude: string;
        location_type: string;
        resources: {
            id: string;
            uri: string;
        }[];
    };
}
export interface Resource {
    resource: {
        id: string;
        title: string;
        filename: string;
        extension: string;
        size: number;
        details: string;
        agency: {
            id: string;
            uri: string;
        };
        location: {
            id: string;
            uri: string;
        };
    };
}
