import { Request, Response } from 'express';

import BaseRouters from '../../routers/base/BaseRouter';

class MockRoutes extends BaseRouters {
  public routes(): void {
    this.router.get('test-route', (req: Request, res: Response) => res.send('hello'));
  }
}

describe('BaseRouters', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  it('should create an express Router and call routes method', () => {
    const spyRoutes = jest.spyOn(MockRoutes.prototype, 'routes');
    const mockRoutesInstance = new MockRoutes();

    expect(mockRoutesInstance.router).toBeDefined();
    expect(typeof mockRoutesInstance.router.get).toBe('function');
    expect(spyRoutes).toHaveBeenCalled();
  });
});
