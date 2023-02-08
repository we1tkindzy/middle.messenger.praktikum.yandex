import HTTPTransport from '../service/httpTransport';

type LoginRequestData = {
  login: string;
  password: string;
};

type SigninRequestData = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
};

export class AuthAPI {
  apiInstance: HTTPTransport;

  constructor() {
    this.apiInstance = new HTTPTransport();
  }

  login(data: LoginRequestData) {
    return this.apiInstance.post('auth/signin', { data });
  }

  me() {
    return this.apiInstance.get('auth/user');
  }

  logout() {
    return this.apiInstance.post('auth/logout');
  }

  register(data: SigninRequestData) {
    return this.apiInstance.post('auth/signup', { data });
  }
}

export default new AuthAPI();
