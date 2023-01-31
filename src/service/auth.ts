import authAPI from 'api/auth';
import chatsAPI from 'api/chatsApi';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core/Store';
import transformUser from 'utils/apiTransformers';
import apiHasError  from 'utils/apiHasError';

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

export const login = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload,
) => {
  dispatch({ isLoading: true });

  const response = await authAPI.login(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({ isLoading: false, loginFormError: null });

  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }
  const responseChats = await chatsAPI.getChats();

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

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await authAPI.logout();

  dispatch({ isLoading: false, user: null });

  window.router.go('/login');
};

export const register = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: RegisterPayload,
) => {
  dispatch({ isLoading: true });

  const response = await authAPI.register(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({
    isLoading: false,
    loginFormError: null,
    user: transformUser(responseUser as UserDTO),
  });

  window.router.go('/');
};
