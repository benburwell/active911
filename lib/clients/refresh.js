var request = require('request');

var RefreshClient = function(refreshString) {
  if (typeof refreshString !== 'string') {
    throw new Error('Refresh token must be supplied');
  }
  this._refreshToken = refreshString;
  this._accessToken = '';
  this._accessTokenExpiration = Math.floor( new Date()/1000 );
};

RefreshClient.prototype._doRequest = function(url) {
  var self = this;
  var base = 'https://access.active911.com/interface/open_api/api';
  return new Promise(function(fulfill, reject) {
    self._getAccessToken().then(function(token) {
      request({
        method: 'GET',
        url: base + url,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }, function(err, res, body) {
        if (err) {
          reject(err);
        } else {
          var result = JSON.parse(body);
          if (result.result == 'success') {
            var properties = Object.getOwnPropertyNames(result.message);
            if (properties.length == 0) {
              fulfill({});
            } else {
              var propertyToReturn = properties[0];
              fulfill(result.message[propertyToReturn]);
            }
          } else {
            reject(result.message);
          }
        }
      });
    }).catch(function(err) {
      reject(err);
    });
  });
};

RefreshClient.prototype._getAccessToken = function() {
  var self = this;
  return new Promise(function(fulfill, reject) {
    var currentTime = Math.floor( new Date()/1000 );
    if (self._accessTokenExpiration - currentTime <= 10) {
      fulfill(self._refreshAccessToken());
    } else {
      fulfill(self._accessToken);
    }
  });
};

RefreshClient.prototype._refreshAccessToken = function() {
  var self = this;
  return new Promise(function(fulfill, reject) {
    request({
      url: 'https://www.active911.com/interface/dev/api_access.php',
      method: 'POST',
      form: {
        'refresh_token': self._refreshToken
      }
    }, function(err, res, body) {
      if (err) {
        reject(err);
      } else {
        var response = JSON.parse(body);
        if (response.access_token && response.expiration) {
          self._accessToken = response.access_token;
          self._accessTokenExpiration = response.expiration;
          fulfill(response.access_token);
        } else {
          reject(new Error('Malformed access token response'));
        }
      }
    });
  });
};

RefreshClient.prototype.getAgency = function() {
  return this._doRequest('/');
};

RefreshClient.prototype.getDevice = function(id) {
  return this._doRequest('/devices/' + id);
};

RefreshClient.prototype.getAlerts = function() {
  return this._doRequest('/alerts');
};

RefreshClient.prototype.getAlert = function(id) {
  return this._doRequest('/alerts/' + id);
};

RefreshClient.prototype.getDeviceAlerts = function(id) {
  return this._doRequest('/devices/' + id + '/alerts');
};

RefreshClient.prototype.getLocations = function() {
  return this._doRequest('/locations');
};

RefreshClient.prototype.getLocation = function(id) {
  return this._doRequest('/locations/' + id);
};

RefreshClient.prototype.getResource = function(id) {
  return this._doRequest('/resources/' + id);
};

module.exports = RefreshClient;

