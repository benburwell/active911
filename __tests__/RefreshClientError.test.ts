import RefreshClient from '../src/RefreshClient';
import { mswErroredServer } from './mockHttpServer';

import errorResponse from './replies/error.json';

describe('RefreshClient', () => {
  beforeAll(() => {
    mswErroredServer.listen();
  });
  afterEach(() => {
    mswErroredServer.resetHandlers();
  });
  afterAll(() => {
    mswErroredServer.close();
  });

  describe('#getAgency', () => {
    it('Should return error message', async () => {
      const client = new RefreshClient('refreshtoken');

      await expect(client.getAgency()).rejects.toMatch(errorResponse.message);
    });
  });

  describe('#getDevice', () => {
    it('Should return error message', async () => {
      const client = new RefreshClient('refreshtoken');

      await expect(client.getAgency()).rejects.toMatch(errorResponse.message);
    });
  });

  describe('#getAlerts', () => {
    it('Should return error message', async () => {
      const client = new RefreshClient('refreshtoken');

      await expect(client.getAgency()).rejects.toMatch(errorResponse.message);
    });
  });

  describe('#getAlert', () => {
    it('Should return error message', async () => {
      const client = new RefreshClient('refreshtoken');

      await expect(client.getAgency()).rejects.toMatch(errorResponse.message);
    });
  });

  describe('#getDeviceAlerts', () => {
    it('Should return error message', async () => {
      const client = new RefreshClient('refreshtoken');

      await expect(client.getAgency()).rejects.toMatch(errorResponse.message);
    });
  });

  describe('#getLocations', () => {
    it('Should return error message', async () => {
      const client = new RefreshClient('refreshtoken');

      await expect(client.getAgency()).rejects.toMatch(errorResponse.message);
    });
  });

  describe('#getLocation', () => {
    it('Should return error message', async () => {
      const client = new RefreshClient('refreshtoken');

      await expect(client.getAgency()).rejects.toMatch(errorResponse.message);
    });
  });

  describe('#getResource', () => {
    it('Should return error message', async () => {
      const client = new RefreshClient('refreshtoken');

      await expect(client.getAgency()).rejects.toMatch(errorResponse.message);
    });
  });
});
