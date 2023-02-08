import { Store } from 'core/Store';
import renderDOM from 'core/renderDOM';
import Router from 'core/Router/Router';
import { getScreenComponent, Screens } from 'utils/screenList';
import Block from 'core/Block';

const routes = [
  {
    path: '/login',
    block: Screens.LoginPage,
    shouldAuthorized: false,
  },
  {
    path: '/signin',
    block: Screens.SigninPage,
    shouldAuthorized: false,
  },
  {
    path: '/500',
    block: Screens.Error500Page,
    shouldAuthorized: true,
  },
  {
    path: '/404',
    block: Screens.Error404Page,
    shouldAuthorized: false,
  },
  {
    path: '/',
    block: Screens.ChatsPage,
    shouldAuthorized: true,
  },
  {
    path: '/profile',
    block: Screens.ProfilePage,
    shouldAuthorized: true,
  },
  {
    path: '/change-profile',
    block: Screens.ChangeProfilePage,
    shouldAuthorized: true,
  },
  {
    path: '/change-password',
    block: Screens.ChangePasswordPage,
    shouldAuthorized: true,
  },
  {
    path: '*',
    block: Screens.Error404Page,
    shouldAuthorized: false,
  },
];

function initRouter(router: Router, store: Store<AppState>) {
  routes.forEach(route => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);
      const currentScreen = Boolean(store.getState().screen);

      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({ screen: route.block });
        return;
      }

      if (!currentScreen) {
        store.dispatch({ screen: Screens.LoginPage });
      }
    });
  });

  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }

    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page({}) as Block);
      document.title = `App / ${Page.componentName}`;
    }
  });
}

export default initRouter;
