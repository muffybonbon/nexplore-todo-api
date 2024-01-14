import request from 'supertest';
import { Application } from 'express';

import App from '../app';

import { HTTPStatusEnum } from '../enums/HTTPStatusEnum';

describe('App Tests', () => {
  const server = new App().app;

  const UI_PATH = process.env.UI_PATH || 'http://localhost:4000';

  afterAll(() => {
    process.env.NODE_ENV = 'test';
  });

  describe('CORS Tests', () => {
    let corsServer: Application;

    beforeEach(() => {
      process.env.NODE_ENV = 'production';
      corsServer = new App().app;
    });

    it('should allow requests from whitelisted origins', async () => {
      const response = await request(corsServer).get('/').set('Origin', UI_PATH);
      expect(response.headers['access-control-allow-origin']).toBe(UI_PATH);
    });

    it('should not allow requests from non-whitelisted origins', async () => {
      const response = await request(corsServer).get('/').set('Origin', 'http://not-allowed-origin.com');
      expect(response.headers['access-control-allow-origin']).toBeUndefined();
      expect(response.status).toBe(HTTPStatusEnum.INTERNAL_SERVER);
      expect(response.body.message).toEqual('Not allowed by CORS');
    });
  });

  describe('Health Check Route', () => {
    it('should return server health status', async () => {
      const response = await request(server).get('/');

      expect(response.status).toBe(HTTPStatusEnum.OK);
      expect(response.body).toEqual({ message: 'Server is healthy' });
    });
  });
});
