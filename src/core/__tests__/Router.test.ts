import Router from '../Router/Router';

describe('core/Router', () => {
  it('should be started', () => {
    const router = new Router();

    router.start();
    expect(router.isStarted).toStrictEqual(true);
  });

  it('should change history state', () => {
    const router = new Router();
    const history = global.window.history;

    router.go('/login');
    expect(history.length).toEqual(2);
  });
});
