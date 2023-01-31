declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type Indexed = { [key: string]: any };

  export type AppState = {
    appIsInited: boolean;
    screen: Nullable<Screens>;
    isLoading: boolean;
    loginFormError: Nullable<string>;
    user: Nullable<User>;
    users: Array<User>;
    messages: Array<Message> | Array<NewMessage>;
    chats: Array<Chat> | null;
    chatId: string | null;
    chatTitle: string;
  };

  export type NewMessage = {
    id: number;
    content: string;
    time: string;
    type: string;
    user_id: number;
  };

  export type Message = {
    id: number;
    content: string;
    time: string;
    type: string;
    user_id: number;
    chatID: number;
    file: null;
    is_read: boolean;
  };

  export type User = {
    id: number;
    avatar: string;
    email: string;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    phone: string;
  };

  export type Chat = {
    id: number;
    avatar: string | null;
    title: string;
    last_message: LastMessage | null;
    unread_count: number;
  };

  export type LastMessage = {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    },
    time: string;
    content: string;
  };
}

export {}
