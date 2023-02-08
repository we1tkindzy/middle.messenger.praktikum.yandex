const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

type OptionsWithoutMethod = Omit<Options, 'method'>;
type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<any>;

type Options = {
  method: string;
  headers?: Record<string, any>;
  data?: any;
  timeout?: number;
  isFormData?: boolean
};

const queryStringify = (data: Options) => {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${(data as any)[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
};

class HTTPTransport {
  URL = 'https://ya-praktikum.tech/api/v2/';

  request = (url: string, options: Options): Promise<any> => {
    const {
      method,
      headers,
      data,
      timeout = 5000,
      isFormData,
    } = options;

    return new Promise((resolve, reject) => {
      const isGet = method === METHODS.GET;

      const xhr = new XMLHttpRequest();

      xhr.withCredentials = true;
      xhr.timeout = timeout;
      xhr.responseType = 'json';

      xhr.open(
        method,
        this.URL + url,
      );

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });

        xhr.send(data);
      } else if (!isFormData) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Content-Security-Policy', "default-src 'self';img-src *;script-src trusted.com;");
      }

      if (isGet || !data) {
        xhr.send();
      } else if (isFormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }

      xhr.onload = () => resolve(xhr.response);
      xhr.onabort = () => reject();
      xhr.ontimeout = () => reject();
      xhr.onerror = () => reject();
    });
  };

  get: HTTPMethod = (url, options = {}) => {
    if (options.data) {
      url += queryStringify(options.data);
    }

    return this.request(
      url,
      {
        ...options,
        method: METHODS.GET,
      },
    );
  };

  post: HTTPMethod = (url, options = {}) => this.request(
    url,
    {
      ...options,
      method: METHODS.POST,
    },
  );

  put: HTTPMethod = (url, options = {}) => this.request(
    url,
    {
      ...options,
      method: METHODS.PUT,
    },
  );

  delete: HTTPMethod = (url, options = {}) => this.request(
    url,
    {
      ...options,
      method: METHODS.DELETE,
    },
  );
}

export default HTTPTransport;
