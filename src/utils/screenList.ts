import Login from 'pages/login/login';
import Signin from 'pages/signin/signin';
import Error500 from 'pages/500/500';
import Error404 from 'pages/404/404';
import Chats from 'pages/chats/chats';
import Profile from 'pages/profile/profile';
import ChangeProfile from 'pages/changeProfile/changeProfile';
import ChangePassword from 'pages/changePassword/changePassword';

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
  [Screens.LoginPage]: Login,
  [Screens.SigninPage]: Signin,
  [Screens.Error500Page]: Error500,
  [Screens.Error404Page]: Error404,
  [Screens.ChatsPage]: Chats,
  [Screens.ProfilePage]: Profile,
  [Screens.ChangeProfilePage]: ChangeProfile,
  [Screens.ChangePasswordPage]: ChangePassword,
};

export const getScreenComponent = (screen: Screens) => map[screen];
