export type APIError = {
  reason: string;
};

export type UserDTO = {
  id: number;
  avatar: string;
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
};
