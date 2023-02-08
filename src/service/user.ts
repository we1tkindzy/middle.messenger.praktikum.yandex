import userAPI from 'api/userApi';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core/Store';
import transformUser from 'utils/apiTransformers';
import apiHasError from 'utils/apiHasError';

type ProfilePayload = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
};

type PasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

export const changeProfile = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: ProfilePayload,
) => {
  dispatch({ isLoading: true });

  const response = await userAPI.profile(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await userAPI.user(response.id);

  dispatch({
    isLoading: false,
    loginFormError: null,
    user: transformUser(responseUser as UserDTO),
  });
};

export const changePassword = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: PasswordPayload,
) => {
  dispatch({ isLoading: true });

  const response = await userAPI.password(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  dispatch({ isLoading: false, loginFormError: null });
};

export const changeAvatar = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  action: any,
) => {
  dispatch({ isLoading: true });

  const response = await userAPI.avatar(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }
  const responseUser = await userAPI.user(response.id);

  dispatch({
    isLoading: false,
    loginFormError: null,
    user: transformUser(responseUser as UserDTO),
  });
};
