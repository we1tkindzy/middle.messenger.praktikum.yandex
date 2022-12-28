enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type TRequestData = Record<string, string | number>;

type TRequestOptions = {
  method?: METHODS
  headers?: Record<string, string>
  data?: unknown
  timeout?: number
};

function queryStringify(data: TRequestData) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

class HTTPTransport {
  request = (url: string, options: TRequestOptions) => {
    const {method = METHODS.GET, headers = {}, data, timeout = 5000} = options;

    const query = method === METHODS.GET ? queryStringify(data as TRequestData) : '';

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(
        method,
        url + query
      );

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => {
        if (xhr.status >= 300) {
          reject(xhr);
        } else {
          resolve(xhr);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };

  public get = (url: string, options = {}) => {
    return this.request(
      url,
      {
        ...options,
        method: METHODS.GET
      }
    );
  };

  public post = (url: string, options = {}) => {
    return this.request(
      url,
      {
        ...options,
        method: METHODS.POST
      }
    );
  };

  public put = (url: string, options = {}) => {
    return this.request(
      url,
      {
        ...options,
        method: METHODS.PUT
      }
    );
  };

  public delete = (url: string, options = {}) => {
    return this.request(
      url,
      {
        ...options,
        method: METHODS.DELETE
      }
    );
  };
}

export default new HTTPTransport();
