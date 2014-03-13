Active911 for Node.js
=====================

*Note:* This package was built for an older version of the Active911 API. It will be updated for the new version in the coming weeks.

by Ben Burwell <hi@benburwell.com>

Installation
------------

Installation is simple: `npm install active911`.

You can use it in your project by adding `active911` to your dependencies and running `npm install`. Sample ping:

    var active911 = require('active911')('YOUR_APP_KEY', 'YOUR_API_KEY');
    
    active911.ping(function (err) {
        if (err) {
            return console.log('Could not connect to Active911: ' + err);
        }
        
        console.log('Connection to Active911 established.');
    });

Usage
-----

The `active911` package provides support for the current Active911 API functions. We follow the standard Node.js pattern of `function(options, callback(error, data))`. If an error occurs, the first parameter of the callback will contain the error message. Otherwise, the first parameter will be false and the second parameter will contain the API response.

### `ping(callback)`

The `ping` command checks that your API and app keys are valid on the server. It takes only a callback function with a parameter for errors.

### `getDevice(device_id, callback)`

Returns some data about the device associated with the `device_id`.

Example response:

    {
        "response_action" : "watch",
        "response_alert_id" : 4681099,
        "lat" : 44.541404,
        "name" : "Joseph Sullivan",
        "position_accuracy" : 30,
        "response_stamp" : 1371315741,
        "device_id" : 2435,
        "position_stamp" : 1371463606,
        "device_type" : "smartphone",
        "lon" : -123.364192
    }

### `getAlert(alert_id, callback)`

Returns data about the alert associated with the `alert_id`.

Example response:

    {
        "source" : "",
        "priority" : "F3",
        "cad_code" : "",
        "lat" : 44.5379997,
        "place" : "",
        "agency_id" : 3,
        "state" : "OR",
        "map_code" : "",
        "city" : "Philomath",
        "timestamp" : 1369781684,
        "address" : "100 S. 16th ST",
        "description" : "Cat in tree",
        "details" : "",
        "unit" : "",
        "lon" : -123.3634479,
        "cross_street" : "",
        "alert_id" : 4264162,
        "units" : ""
   }

### `getLocations(north, south, east, west, callback)`

Returns an array of locations that exist within the area bounded by `north`, `south`, `east`, and `west`. The parameters should be floating point numbers representing the latitude or longitude, whichever is appropriate for the compass direction.

For example,

    active911.getLocations(46.12345, 44.54321, -122.00021, -124.132132, function (err, locations) {
        if (err) {
            return console.log('Unable to retrieve locations: ' + err);
        }

        console.log('Returned ' + locations.length + ' locations.');
    });

Example response:

    [
        {
            "resources" : [],
            "lat" : 44.540121,
            "name" : "Pinehurst Memorial",
            "agency_id" : 3,
            "icon_filename" : "icon-flag.png",
            "description" : "Main Station Hosp.\nNear the depot\n5 entrances",
            "id" : 175,
            "lon" : -123.367601,
            "icon_color" : "blue"
        },
        {
            "resources" : [
                {
                    "extension" : "jpg",
                    "title" : "Photo",
                    "id" : 5,
                    "details" : "",
                    "size" : 963979
                }
            ],
            "lat" : 44.541252,
            "name" : "Hydrant",
            "agency_id" : 3,
            "icon_filename" : "icon-hydrant.png",
            "description" : "15th & College",
            "id" : 700,
            "lon" : -123.364689,
            "icon_color" : "red"
        }
      ]

Contributing
------------

Contributions are encouraged. For a list of open issues, see <https://github.com/benburwell/active911/issues>.

More Information
----------------

More information about the API is available on [the Active911 Github wiki](https://github.com/active911/open-api/wiki).
