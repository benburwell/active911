var Active911 = require('../');
var client = new Active911.RefreshClient('YOUR REFRESH TOKEN');

client.getAgency().then(function(agency) {
  console.log(agency.name);
  agency.devices.forEach(function(deviceInfo) {
    client.getDevice(deviceInfo.id).then(function(device) {
      console.log(device.name);
    }).catch(function(err) {
      console.log('Error retrieving device info for #' + deviceInfo.id);
    });
  });
}).catch(function(err) {
  console.log('Error retrieving agency info:', err);
});

