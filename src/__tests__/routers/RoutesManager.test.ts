import { Application } from 'express';
import RoutesManager from '../../routers/base/RoutesManager';
import TodoRouter from '../../routers/TodoRouter';

jest.mock('../../routers/TodoRouter', () => jest.fn());

const mockUse = jest.fn();

const mockApp = {
  use: mockUse,
} as unknown as Application;

describe('RoutesManager', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('init', () => {
    it('should set up the TodoRouter on the correct path', () => {
      RoutesManager.init(mockApp);

      expect(mockUse).toHaveBeenCalledWith('/api/v1', TodoRouter);
    });
  });
});
