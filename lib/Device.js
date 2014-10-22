var _util = require('./util');

module.exports.Device = function(options) {
    this._id = options.id;
    this._name = options.name;
    this._latitude = options.latitude;
    this._longitude = options.longitude;
    this._position_accuracy = options.position_accuracy;
    this._position_timestamp = options.position_timestamp;
    this._agencies = options.agencies;
    this._uri = options.uri || _util.API_BASE + '/devices/' + options.id;
};
