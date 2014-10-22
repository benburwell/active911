var OAuth2 = require('oauth').OAuth2;
var http = require('http');
var events = require('events');
var querystring = require('querystring');
var url = require('url');
var Agency = require('./Agency.js').Agency;
var Device = require('./Device.js').Device;
var _util = require('./util');

module.exports.Agency = Agency;
module.exports.Device = Device;

// Constructor
module.exports.Active911 = function(client_id, client_secret, scope) {
    this._client_id = client_id;
    this._client_secret = client_secret;
    this._scope = scope;
    this._oauth_complete = false;
    this._emitter = new events.EventEmitter();

    // Create the HTTP server that will receive the OAuth code after the user
    // has authenticated to Active911.
    this._http_server = new http.Server();

    // The request handler
    this._http_server.on('request', function(req, res) {

        // The only thing we care about is the /?code=xxx
        var qs = url.parse(req.url).query;

        // If a code has been sent, and we don't already have one, we are good
        // to go.
        if (qs.split('=')[0] === 'code' && !this._oauth_complete) {
            this._oauth_code = qs.split('=')[1];
            this._oauth_complete = true;
            emitter.emit('oauth_complete');
        }

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end();
    });

    // Once the server is listening, store its port number for use in auth uri
    this._http_server.listen(0, function() {
        
    });
};

module.exports.Active911.prototype.getAuthorizationUri = function() {

    var qs = querystring.stringify({
        client_id: this._client_id,
        response_type: 'code',
        redirection_uri: 'http://localhost:' + this._oauth_server_port,
        scope: this._scope
    });

    return _util.API_BASE_NAME + '/open_api/authorize_agency.php' + qs;
};

module.exports.Active911.prototype.ready = function(func) {
    emitter.on('oauth_complete', func);
};
