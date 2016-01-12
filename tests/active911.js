var chai = require('chai');
var should = chai.should();
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var nock = require('nock');
var Timestamp = require('unix-timestamp');
var Active911 = require('../lib/active911.js');

var client;
var deviceResponse = require('./replies/device.json');
var agencyResponse = require('./replies/agency.json');
var alertsResponse = require('./replies/alerts.json');
var alertResponse = require('./replies/alert.json');
var locationsResponse = require('./replies/locations.json');
var locationResponse = require('./replies/location.json');
var resourceResponse = require('./replies/resource.json');
var errorResponse = require('./replies/error.json');

var nockPath = function(path, response) {
  return nock('https://access.active911.com')
    .get('/interface/open_api/api' + path)
    .reply(200, response);
};

var nockError = function(path) {
  nock('https://access.active911.com')
    .get('/interface/open_api/api' + path)
    .reply(400, errorResponse);
};

describe('Active911 API', function() {
  beforeEach(function(done) {
    client = new Active911.RefreshClient('CLIENT');
    nock('https://www.active911.com')
      .post('/interface/dev/api_access.php')
      .reply(200, {
        access_token: 'DUMMY',
        expiration: Timestamp.now(100)
      });
    done();
  });

  describe('#getAgency', function() {
    it('Should return correct data', function() {
      nockPath('/', agencyResponse);
      return client.getAgency().should.eventually.deep.equal(agencyResponse.message.agency);
    });

    it('Should give an error if the API gives an error', function() {
      nockError('/');
      return client.getAgency().should.be.rejectedWith(errorResponse.message);
    });
  });

  describe('#getDevice', function() {
    it('Should return correct data', function() {
      nockPath('/devices/1', deviceResponse);
      return client.getDevice(1).should.eventually.deep.equal(deviceResponse.message.device);
    });

    it('Should give an error if the API gives an error', function() {
      nockError('/devices/1');
      return client.getDevice(1).should.be.rejectedWith(errorResponse.message);
    });
  });

  describe('#getAlerts', function() {
    it('Should return correct data', function() {
      nockPath('/alerts', alertsResponse);
      return client.getAlerts().should.eventually.deep.equal(alertsResponse.message.alerts);
    });

    it('Should give an error if the API gives an error', function() {
      nockError('/alerts');
      return client.getAlerts().should.be.rejectedWith(errorResponse.message);
    });
  });

  describe('#getDeviceAlerts', function() {
    it('Should return correct data', function() {
      nockPath('/devices/1/alerts', alertsResponse);
      return client.getDeviceAlerts(1).should.eventually.deep.equal(alertsResponse.message.alerts);
    });

    it('Should give an error if the API gives an error', function() {
      nockError('/devices/1/alerts');
      return client.getDeviceAlerts(1).should.be.rejectedWith(errorResponse.message);
    });
  });

  describe('#getAlert', function() {
    it('Should return correct data', function() {
      nockPath('/alerts/1', alertResponse);
      return client.getAlert(1).should.eventually.deep.equal(alertResponse.message.alert);
    });

    it('Should give an error if the API gives an error', function() {
      nockError('/alerts/1');
      return client.getAlert(1).should.be.rejectedWith(errorResponse.message);
    });
  });

  describe('#getLocations', function() {
    it('Should return correct data', function() {
      nockPath('/locations', locationsResponse);
      return client.getLocations().should.eventually.deep.equal(locationsResponse.message.locations);
    });

    it('Should give an error if the API gives an error', function() {
      nockError('/locations');
      return client.getLocations().should.be.rejectedWith(errorResponse.message);
    });
  });

  describe('#getLocation', function() {
    it('Should return correct data', function() {
      nockPath('/locations/1', locationResponse);
      return client.getLocation(1).should.eventually.deep.equal(locationResponse.message.location);
    });

    it('Should give an error if the API gives an error', function() {
      nockError('/locations/1');
      return client.getLocation(1).should.be.rejectedWith(errorResponse.message);
    });
  });

  describe('#getResource', function() {
    it('Should return correct data', function() {
      nockPath('/resources/1', resourceResponse);
      return client.getResource(1).should.eventually.deep.equal(resourceResponse.message.resource);
    });

    it('Should give an error if the API gives an error', function() {
      nockError('/resources/1');
      return client.getResource(1).should.be.rejectedWith(errorResponse.message);
    });
  });
});

describe('Alert filtering', function() {
  it('should request alerts filtered by alert_days', function(done) {
    var n = nockPath('/alerts?alert_days=1', alertsResponse);
    client.getAlerts({ alert_days: 1}).then(function() {
      n.isDone().should.be.true;
      done();
    }).catch(function(err) {
      false.should.be.true;
      done();
    });
  });
  it('should request alerts filtered by alert_minutes', function(done) {
    var n = nockPath('/alerts?alert_minutes=1', alertsResponse);
    client.getAlerts({ alert_minutes: 1}).then(function() {
      n.isDone().should.be.true;
      done();
    }).catch(function(err) {
      false.should.be.true;
      done();
    });
  });
});
