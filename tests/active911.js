require('should');
require('nock');
Active911 = require('../lib/active911.js');

var a911;

var testDevicesResponse = require('replies/devices.json');
var testAgencyResponse = require('replies/agency.json');
var testDeviceResponse = require('replies/device.json');
var testErrorResponse = require('replies/error.json');

describe('Active911 API', function() {

    beforeEach(function(done) {
        a911 = new Active911();
    });

    describe('#getAgency', function() {

        it('Should return correct agency data', function() {

            nock('https://access.active911.com')
                .get('/interface/open_api/api/')
                .replyWithFile(200, __dirname + 'replies/agency.json'});

            a911.getAgency(function(err, agency) {
                should.not.exist(err);
                agency.should.equal(testAgencyResponse.message.agency);
            });
        });

        it('Should give an error if the API gives an error', function() {
            nock('https://access.active911.com')
                .get('/interface/open_api/api/')
                .replyWithFile(400, __dirname + 'replies/error.json');

            a911.getAgency(function(err, agency) {
                err.should.equal(testErrorResponse.message);
                should.not.exist(agency);
            });
        });

    });

    describe('#getDevices', function() {
        it('Should return correct device data', function() {

            nock('https://access.active911.com')
                .get('/interface/open_api/api/')
                .replyWithFile(400, __dirname + 'replies/agency.json');

            a911.getDevices(function(err, devices) {
                should.not.exist(err);
                devices.should.equal(testDevicesResponse.message.devices);
            });
        });

        it('Should give an error if the API gives an error', function() {
            nock('https://access.active911.com')
                .get('/interface/open_api/api/')
                .replyWithFile(400, __dirname + 'replies/error.json');

            a911.getDevices(function(err, devices) {
                err.should.equal(testErrorResponse.message);
                should.not.exist(devices);
            });
        });
    });

    describe('#getDevice', function() {
        it('Should return correct device data (String id)', function() {
            nock('https://access.active911.com')
                .get('/interface/open_api/api/devices/1')
                .replyWithFile(200, __dirname + 'replies/device.json');

            a911.getDevice('1', function(err, device) {
                should.not.exist(err);
                device.should.equal(testDeviceResponse.message.device);
            });
        });

        it('Should return correct device data (Number id)', function() {
            nock('https://access.active911.com')
                .get('/interface/open_api/api/devices/1')
                .replyWithFile(200, __dirname + 'replies/device.json');

            a911.getDevice(1, function(err, device) {
                should.not.exist(err);
                device.should.equal(testDeviceResponse.message.device);
            });
        });

        it('Should give an error if the API gives an error', function() {
            nock('https://access.active911.com')
                .get('/interface/open_api/api/devices/1')
                .replyWithFile(400, __dirname + 'replies/error.json');

            a911.getDevice(1, function(err, device) {
                err.should.equal(testErrorResponse.message);
                should.not.exist(device);
            });
        });
    });

});
