export interface AccessToken {
  access_token: string;
  expiration: number;
}

export interface BaseApiResponse {
  result: string;
  message: string | object;
}

export interface Agency {
  id: string; // Agency id number
  name: string; // Name of the agency
  address: string; // Street address of the agency
  city: string; // City agency is located in
  state: string; // State agency is located in
  latitude: string; // Latitude of the agency's location
  longitude: string; // Longitude of the agency's location
  devices: {
    id: string; // Device id number
    uri: string; // API URI to access the device data
  }[]; // Array of devices
}

export interface Device {
  id: string; // Device id number
  name: string; // Name of the device
  latitude: string; // Latitude of the device's most recent location
  longitude: string; // Longitude of the device's most recent location
  position_accuracy: string; // Accuracy of the device's most recent location
  position_timestamp: string; // Timestamp of the device's most recent location update
  agencies: {
    id: string; // Agency id number
    uri: string; // API URI to access the agency data
  }[]; // Array of agency references
}

export interface Alerts {
  id: string; // Active911 Alert id number
  uri: string; // API URI to access the alert data;
}[]

export interface Alert {
  id: string; // Active911 Alert id number
  agency: {
    id: string; // Agency id number
    uri: string; // API URI to access the agency data
  }; // Associated agency
  place: string; // Common name for the place (e.g., Joe's Tavern)
  address: string; // Street address for the alert
  unit?: string; // Subunit (e.g., Apt G) - optional
  city: string; // City where the alert is located
  state: string; // State where the alert is located
  latitude: string; // Latitude of the alert
  longitude: string; // Longitude of the alert
  source: string; // Source of the alert (e.g., Battalion Chief 10)
  units: string; // Dispatched Units (e.g., Truck1)
  cad_code: string; // Identifier Code given by CAD Software
  priority: string; // Priority from CAD system
  details?: string; // Additional Notes - optional
  sent: string; // Time the alert was sent
  description: string; // Short description of the alert
  pagegroups: {
    title: string; // Name of the pagegroup
    prefix: string; // Pagegroup prefix
  }[]; // Array of pagegroups
  map_code?: string; // Map Code for the alert - optional
  received: string; // Time the alert was received
  cross_street?: string; // Cross street of where the alert is located - optional
  responses: {
    device: {
      id: string; // Device id of responder
      uri: string; // API URI to access the device data
    };
    timestamp: string; // Timestamp of when the device responded
    response: string; // Name of the response action taken
  }[]; // Array of device responses
}

export interface Locations {
  id: string; // Active911 Location id number
  uri: string; // API URI to access the location data
}[]

export interface Location {
  locations: {
    id: string; // Active911 id for this map data point
    name: string; // Name of this map data point
    description: string; // Short description of this map data point
    icon_id: string; // Active911 id of the icon used for this map data point
    icon_color: string; // Color of this map data point
    latitude: string; // Latitude of this map data point
    longitude: string; // Longitude of this map data point
    location_type: string; // The type of map data point
    resources: {
      id: string; // Resource id of responder
      uri: string; // API URI to access the resource data
    }[]; // Array of resources associated with the location
  };
}

export interface Resource {
  resource: {
    id: string; // Active911 id for this resource
    title: string; // Name of the title
    filename: string; // Filename
    extension: string; // File extension
    size: number; // File size in bytes
    details: string; // Details about the file
    agency: {
      id: string; // Agency id number
      uri: string; // API URI to access the agency data
    }; // Associated agency information
    location: {
      id: string; // Location id number
      uri: string; // API URI to access the location data
    }; // Associated location information
  };
}