import HTTPTransport from 'service/httpTransport';

const apiInstance = new HTTPTransport();

describe('core/Fetch', () => {
  it('should return status 200', async () => {
    apiInstance.get(`${URL}/auth/user`, {})
      .then(response => {
        expect(response.status).toEqual(200);
      });
  });

  it('should return GET request', () => {
    apiInstance.get(`${URL}/auth/user`, {})
      .then(response => {
        expect(response.method).toEqual('GET');
      });
  });

  it('should return POST request', () => {
    apiInstance.post(`${URL}/auth/user`, {})
      .then(response => {
        expect(response.method).toEqual('POST');
      });
  });
});
