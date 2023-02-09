import userAPI from 'api/userApi';
import { UserDTO } from 'api/types';
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

export const changeProfile: DispatchStateHandler<ProfilePayload> = async (dispatch, _state, action) => {
  try {
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
  } catch (err) {
    console.error(err);
  }
};

export const changePassword: DispatchStateHandler<PasswordPayload> = async (dispatch, _state, action) => {
  try {
    dispatch({ isLoading: true });

    const response = await userAPI.password(action);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
      return;
    }

    dispatch({ isLoading: false, loginFormError: null });
  } catch (err) {
    console.error(err);
  }
};

export const changeAvatar: DispatchStateHandler<any> = async (dispatch, _state, action) => {
  try {
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
  } catch (err) {
    console.error(err);
  }
};
