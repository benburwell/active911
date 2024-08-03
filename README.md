Active911 for Node.js
=====================

by Trevor Heins, Ben Burwell

Installation
------------

Installation is simple: `npm install active911`.

Basic Usage
-----------

```javascript
import {Active911} from "active911";
const client = new Active911.RefreshClient('YOUR REFRESH TOKEN');

const agency = await client.getAgency();
console.log(agency.name);
```

API Methods
-----------

The following public API methods are available:

* `getAgency()`
* `getDevice(device_id)`
* `getAlerts({ alert_days: 1, alert_minutes: 30 })`, where the object parameter
  is optional. You should not use both keys; if `alert_minutes` is provided, it
  will override `alert_days` as documented [on the wiki](https://active911.atlassian.net/wiki/spaces/AED/pages/1866825767/Accessing+the+API#Alerts).
* `getDeviceAlerts(device_id)`
* `getAlert(alert_id)`
* `getLocations()`
* `getLocation(location_id)`
* `getResource(resource_id)`

Each method returns a promise for a result, which will resolve as either an
object or an array, depending on the cardinality (e.g. `getAlerts` resolves as
an array, while `getAlert` resolves as an object).

For details on the format of the result, please see the [Active911 API
wiki](https://active911.atlassian.net/wiki/spaces/AED/pages/240123959/Advanced+Features).

Contributing
------------

Contributions are encouraged. For a list of open issues, see
<https://github.com/benburwell/active911/issues>.

More Information
----------------

More information about the API is available on [the Active911
wiki](http://wiki.active911.com/wiki/index.php/Active911_Developer_API).

