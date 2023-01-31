import { UserDTO } from 'api/types';

const transformUser = (data: UserDTO): User => {
  return {
    id: data.id,
    avatar: data.avatar,
    email: data.email,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    phone: data.phone,
  };
};

export default transformUser;
