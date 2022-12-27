import { Block, renderDOM, registerComponent }  from './core';
import SiteMap from './pages/site-map';
import LoginPage from './pages/login';
import SigninPage from './pages/signin';
import Error500Page from './pages/500';
import Error404Page from './pages/404';
import SelectChatPage from './pages/select-chat';
import ActiveChatPage from './pages/active-chat';
import UserPopupPage from './pages/user-popup';
import ProfilePage from './pages/profile';
import ChangeProfilePage from './pages/change-profile';
import ChangePasswordPage from './pages/change-password';
import FilePopupPage from './pages/file-popup';

import './style.css';

import Button from './components/button';
import Link from './components/link';
import Input from './components/input';
import Layout from './components/layout';
import ErrorComponent from './components/error';
import ControlledInput from './components/controlled-input';

import Chats from './components/chats';
import ErrorSection from './components/error-section';
import BackToPage from './components/back-to-page';
import InputField from './components/input-field';

registerComponent(Button);
registerComponent(Link);
registerComponent(ControlledInput);
registerComponent(ErrorComponent);
registerComponent(Input);
registerComponent(Layout);

registerComponent(Chats);
registerComponent(ErrorSection);
registerComponent(BackToPage);
registerComponent(InputField);

document.addEventListener("DOMContentLoaded", () => {
  const path: string = document.location.pathname;

  switch(path) {
    case '/':
      renderDOM(new SiteMap());
      break;

    case '/login':
      renderDOM(new LoginPage());
      break;

    case '/signin':
      renderDOM(new SigninPage());
      break;

    case '/500':
      renderDOM(new Error500Page());
      break;

    case '/404':
      renderDOM(new Error404Page());
      break;

    case '/select-chat':
      renderDOM(new SelectChatPage());
      break;

    case '/active-chat':
      renderDOM(new ActiveChatPage());
      break;

    case '/user-popup':
      renderDOM(new UserPopupPage());
      break;

    case '/profile':
      renderDOM(new ProfilePage());
      break;

    case '/change-profile':
      renderDOM(new ChangeProfilePage());
      break;

    case '/change-password':
      renderDOM(new ChangePasswordPage());
      break;

    case '/file-popup':
      renderDOM(new FilePopupPage());
      break;
  }
});
