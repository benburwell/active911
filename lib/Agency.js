var _util = require('./util');

module.exports.Agency = function(options) {
    this._id = options.id;
    this._name = options.name;
    this._address = options.address;
    this._city = options.city;
    this._state = options.state;
    this._latitude = options.latitude;
    this._longitude = options.longitude;
    this._devices = options.devices;
    this._uri = options.uri || _util.API_BASE + '/agency/' + options.id;
};

module.exports.Agency.prototype.getId = function() {
    return this._id;
};

module.exports.Agency.prototype.getName = function() {
    return this._name;
};

module.exports.Agency.prototype.getAddress = function() {
    return this._address;
};

module.exports.Agency.prototype.getCity = function() {
    return this._city;
};

module.exports.Agency.prototype.getState = function() {
    return this._state;
};

module.exports.Agency.prototype.getLatitude = function() {
    return this._latitude;
};

module.exports.Agency.prototype.getLongitude = function() {
    return this._longitude;
};

module.exports.Agency.prototype.getDevices = function() {
    return this._devices;
};
