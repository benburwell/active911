var Active911 = require('../lib/active911').Active911;

var oauth_id = '12345';
var oauth_secret = 'asdf';
var oauth_scope = 'read_agency read_alert read_device';

var api = new Active911(oauth_id, oauth_secret, oauth_scope);
var uri = api.getAuthorizationUri();
console.log('Please go to ' + uri + ' to authenticate.');

api.ready(function() {
    console.log('OAuth workflow complete');
    
});
