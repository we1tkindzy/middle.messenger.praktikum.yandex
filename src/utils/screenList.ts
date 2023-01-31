import LoginPage from 'pages/login/login';
import SigninPage from 'pages/signin/signin';
import Error500Page from 'pages/500/500';
import Error404Page from 'pages/404/404';
import ChatsPage from 'pages/chats/chats';
import ProfilePage from 'pages/profile/profile';
import ChangeProfilePage from 'pages/changeProfile/changeProfile';
import ChangePasswordPage from 'pages/changePassword/changePassword';

export enum Screens {
  LoginPage = 'login',
  SigninPage = 'signin',
  Error500Page = '500',
  Error404Page = '404',
  ChatsPage = 'chats',
  ProfilePage = 'profile',
  ChangeProfilePage = 'change-profile',
  ChangePasswordPage = 'change-password',
}

const map = {
  [Screens.LoginPage]: LoginPage,
  [Screens.SigninPage]: SigninPage,
  [Screens.Error500Page]: Error500Page,
  [Screens.Error404Page]: Error404Page,
  [Screens.ChatsPage]: ChatsPage,
  [Screens.ProfilePage]: ProfilePage,
  [Screens.ChangeProfilePage]: ChangeProfilePage,
  [Screens.ChangePasswordPage]: ChangePasswordPage,
};

export const getScreenComponent = (screen: Screens) => {
  return map[screen];
};
