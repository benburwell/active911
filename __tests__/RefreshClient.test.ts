import RefreshClient from '../src/RefreshClient';
import { mswServer } from './mockHttpServer';

import agencyResponse from './replies/agency.json';
import alertsResponse from './replies/alerts.json'
import alertResponse from './replies/alert.json';
import deviceResponse from './replies/device.json'
import locationsResponse from './replies/locations.json';
import locationResponse from './replies/location.json';

describe('RefreshClient', () => {
    beforeEach(() => {
        mswServer.listen();
    });
    afterEach(() => {
        mswServer.resetHandlers();
    });
    afterAll(() => {
        mswServer.close();
    });

    describe('#getAgency', () => {
        it('Should return correct data', async () => {
            const client = new RefreshClient('refreshtoken');
            const res = await client.getAgency();

            expect(res).toMatchObject(agencyResponse.message['agency']);
        });
    });

    describe('#getDevice', () => {
      it('Should return correct data', async () => {
        const client = new RefreshClient('refreshtoken');
        const res = await client.getDevice('1');

        expect(res).toMatchObject(deviceResponse.message['device']);
      });
    });

    describe('#getAlerts', () => {
      it('Should return correct data with no args', async () => {
        const client = new RefreshClient('refreshtoken');
        const res = await client.getAlerts();

        expect(res).toMatchObject(alertsResponse.message['alerts']);
      });
    });

    describe('#getAlert', () => {
      it('Should return correct data', async () => {
        const client = new RefreshClient('refreshtoken');
        const res = await client.getAlert('1');

        expect(res).toMatchObject(alertResponse.message['alert']);
      });
    });

    // describe('#getDeviceAlerts', () => {
    //   it('Should return correct data', async () => {
    //     const client = new RefreshClient('refreshtoken');
    //     const res = await client.getDeviceAlerts('1');

    //     expect(res).toMatchObject(alertsResponse.message['alerts']);
    //   });
    // });

    describe('#getLocations', () => {
      it('Should return correct data', async () => {
        const client = new RefreshClient('refreshtoken');
        const res = await client.getLocations();

        expect(res).toMatchObject(locationsResponse.message['locations']);
      });
    });

    describe('#getLocation', () => {
      it('Should return correct data', async () => {
        const client = new RefreshClient('refreshtoken');
        const res = await client.getLocation('1');

        expect(res).toMatchObject(locationResponse.message['location']);
      });
    });

    // describe('#getResource', () => {
    //   it('Should return correct data', async () => {
    //     const client = new RefreshClient('refreshtoken');
    //     const res = await client.getResource('1');

    //     expect(res).toMatchObject(resourceResponse.message['resource']);
    //   });
    // });
});
