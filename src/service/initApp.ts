import AuthAPI from 'api/auth';
import chatsApi from 'api/chatsApi';
import { UserDTO } from 'api/types';
import type { Dispatch } from '../core/Store';
import transformUser from '../utils/apiTransformers';
import apiHasError from '../utils/apiHasError';

async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const response = await AuthAPI.me();

    if (apiHasError(response)) {
      console.log(response);
      return;
    }

    dispatch({ user: transformUser(response as UserDTO) });

    const responseChats = await chatsApi.getChats();

    if (apiHasError(responseChats)) {
      console.log(responseChats);
      return;
    }

    dispatch({ chats: responseChats });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}

export default initApp;
