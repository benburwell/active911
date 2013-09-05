var http = require('http');
var querystring = require('querystring');

module.exports = function (app_key, api_key) {

    // this is used to run all server commands
    var server_command = function (data, callback) {

        // add keys to the POST request
        data.app_key = app_key;
        data.api_key = api_key;

        // convert the object to a querystring for POSTing
        var post = querystring.stringify(data);

        // HTTP request configuration
        var options = {
            host: 'localhost',
            port: '5000',
            path: '/api',
            method: 'POST',
            headers: {
                'Content-Length': post.length;
            }
        };

        // set up the request
        var request = http.request(options, function (res) {

            res.setEncoding('utf8');

            var json = '';
            res.on('data', function (chunk) {
                json += chunk;
            });

            res.on('end', function () {

                var response = JSON.parse(json);

                if (response.result === 'error') {
                    callback(response.message);
                } else {
                    return callback(false, response.message);
                }
            });

            res.on('error', function (err) {
                callback(err);
            });
        });

        request.write(post);
        request.end();

    };

    return {

        ping: function (callback) {
            var options = {
                'operation': 'ping'
            };

            server_command(options, callback);
        },

        getDevice: function (device_id, callback) {
            var options = {
                'operation': 'get_device',
                'device_id': device_id
            };

            server_command(options, callback);
        },

        getAlert: function (alert_id, callback) {
            var options = {
                'operation': 'get_alert',
                'alert_id': alert_id
            };

            server_command(options, callback);
        },

        getLocations: function (north, south, east, west, callback) {
            var options = {
                'operation': 'get_locations',
                'north': north,
                'south': south,
                'east': east,
                'west': west
            };

            // use an intermediate callback to extract the location array
            server_command(options, function (err, response) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(err, response.locations);
                }
            });
        }

    };
};
