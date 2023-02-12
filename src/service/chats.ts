import ChatsAPI from 'api/chatsApi';
import userAPI from 'api/userApi';
import apiHasError from 'utils/apiHasError';
import Messages from './messages';

type CreateChatPayload = {
  title: string;
};

type DeleteChatPayload = {
  chatId: string;
};

type UserPayload = {
  user: string;
  chatId: string;
};

export const createChat: DispatchStateHandler<CreateChatPayload> = async (dispatch, _state, action) => {
  try {
    dispatch({ isLoading: true });

    const response = await ChatsAPI.create(action);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
      return;
    }

    const responseChats = await ChatsAPI.getChats();

    dispatch({
      isLoading: false,
      loginFormError: null,
      chats: responseChats,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteChat: DispatchStateHandler<DeleteChatPayload> = async (dispatch, _state, action) => {
  try {
    dispatch({ isLoading: true });

    const response = await ChatsAPI.delete({ chatId: Number(action) });

    if (apiHasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
      return;
    }

    Messages.close();

    const responseChats = await ChatsAPI.getChats();

    dispatch({
      isLoading: false,
      loginFormError: null,
      chatId: null,
      chats: responseChats,
    });
  } catch (err) {
    console.error(err);
  }
};

export const chooseChat: DispatchStateHandler<string> = async (dispatch, _state, action) => {
  try {
    dispatch({ isLoading: true });

    const responseChats = await ChatsAPI.getChatUsers(action);

    const responseToken = await ChatsAPI.getToken(action);

    await Messages.connect(Number(action), responseToken.token, '0');

    const chat = window.store.getState().chats?.filter(el => el.id.toString() === action);

    dispatch({
      isLoading: false,
      loginFormError: null,
      chatId: action,
      chatTitle: chat![0].title,
      users: responseChats,
    });
  } catch (err) {
    console.error(err);
  }
};

export const addUser: DispatchStateHandler<UserPayload> = async (dispatch, _state, action) => {
  try {
    dispatch({ isLoading: true });

    const user = await userAPI.search({ login: action.user });

    const response = await ChatsAPI.addUser({ users: [user[0].id], chatId: action.chatId });

    if (apiHasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
      return;
    }

    const responseUsers = await ChatsAPI.getChatUsers(action.chatId);

    dispatch({
      isLoading: false,
      loginFormError: null,
      users: responseUsers,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser: DispatchStateHandler<UserPayload> = async (dispatch, _state, action) => {
  try {
    dispatch({ isLoading: true });

    const user = await userAPI.search({ login: action.user });

    const response = await ChatsAPI.deleteUser({ users: [user[0].id], chatId: action.chatId });

    if (apiHasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
      return;
    }

    const responseUsers = await ChatsAPI.getChatUsers(action.chatId);

    dispatch({
      isLoading: false,
      loginFormError: null,
      users: responseUsers,
    });
  } catch (err) {
    console.error(err);
  }
};
