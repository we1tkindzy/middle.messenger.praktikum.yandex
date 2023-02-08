import AuthAPI from 'api/auth';
import ChatsAPI from 'api/chatsApi';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core/Store';
import transformUser from 'utils/apiTransformers';
import apiHasError from 'utils/apiHasError';

type LoginPayload = {
  login: string;
  password: string;
};

type RegisterPayload = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await AuthAPI.logout();

  dispatch({ isLoading: false, user: null });

  window.router.go('/login');
};

export const login = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: LoginPayload,
) => {
  dispatch({ isLoading: true });

  const response = await AuthAPI.login(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await AuthAPI.me();

  dispatch({ isLoading: false, loginFormError: null });

  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }
  const responseChats = await ChatsAPI.getChats();

  if (apiHasError(responseChats)) {
    console.log(responseChats);
    return;
  }

  dispatch({
    isLoading: false,
    loginFormError: null,
    user: transformUser(responseUser as UserDTO),
    chats: responseChats,
  });

  window.router.go('/profile');
};

export const register = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: RegisterPayload,
) => {
  dispatch({ isLoading: true });

  const response = await AuthAPI.register(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await AuthAPI.me();

  dispatch({
    isLoading: false,
    loginFormError: null,
    user: transformUser(responseUser as UserDTO),
  });

  window.router.go('/');
};
