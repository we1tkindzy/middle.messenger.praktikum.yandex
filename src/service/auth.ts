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
  try {
    dispatch({ isLoading: true });

    await AuthAPI.logout();

    dispatch({ isLoading: false, user: null });
  } catch (err) {
    console.error(err);
  } finally {
    window.router.go('/');
  }
};

export const login: DispatchStateHandler<LoginPayload> = async (dispatch, _state, action) => {
  try {
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
  } catch (err) {
    console.error(err);
  } finally {
    window.router.go('/profile');
  }
};

export const register: DispatchStateHandler<RegisterPayload> = async (dispatch, _state, action) => {
  try {
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
  } catch (err) {
    console.error(err);
  } finally {
    window.router.go('/messenger');
  }
};
