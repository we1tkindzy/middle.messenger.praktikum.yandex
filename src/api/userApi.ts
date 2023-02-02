import HTTPTransport from '../service/httpTransport';

type ProfileRequestData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

type PasswordRequestData = {
  oldPassword: string;
  newPassword: string;
};

type SearchRequestData = {
  login: string;
};

class UserAPI {
  apiInstance: HTTPTransport;

  constructor() {
    this.apiInstance = new HTTPTransport();
  }

  user(id: number) {
    return this.apiInstance.get(`user/${id}`);
  }

  profile(data: ProfileRequestData) {
    return this.apiInstance.put('user/profile', { data });
  }

  avatar(data: any) {
    return this.apiInstance.put('user/profile/avatar', { data, isFormData: true });
  }

  password(data: PasswordRequestData) {
    return this.apiInstance.put('user/password', { data });
  }

  search(data: SearchRequestData) {
    return this.apiInstance.post('user/search', { data });
  }
}

export default new UserAPI();
