var should = require('should');
var nock = require('nock');
var Active911 = require('../lib/active911.js');

var a911;
var testDeviceResponse = require('./replies/device.json');
var testAgencyResponse = require('./replies/agency.json');
var testErrorResponse = require('./replies/error.json');

describe('Active911 API', function() {
  beforeEach(function(done) {
    a911 = new Active911.RefreshClient('CLIENT');
    done();
  });

  describe('#getAgency', function() {
    it('Should return correct agency data', function() {
      nock('https://access.active911.com')
        .get('/interface/open_api/api/')
        .replyWithFile(200, __dirname + 'replies/agency.json');
      a911.getAgency().then(function(agency) {
        agency.should.equal(testAgencyResponse.message.agency);
      }).catch(function(err) {
        should.fail();
      });
    });

    it('Should give an error if the API gives an error', function() {
      nock('https://access.active911.com')
        .get('/interface/open_api/api/')
        .replyWithFile(400, __dirname + 'replies/error.json');
      a911.getAgency().then(function(err, agency) {
        should.fail();
      }).catch(function(err) {
        err.should.equal(testErrorResponse.message);
      });
    });
  });
});
