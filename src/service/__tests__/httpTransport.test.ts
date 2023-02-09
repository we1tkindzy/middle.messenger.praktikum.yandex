import sinon, { SinonFakeXMLHttpRequest } from 'sinon';
import HTTPTransport from 'service/httpTransport';

describe('core/Fetch', () => {
  it('should return GET request', () => {
    const apiInstance = new HTTPTransport();
    const requests: Array<SinonFakeXMLHttpRequest> = [];
    const xhr = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = (request => requests.push(request));

    apiInstance.get('/');

    const [request] = requests;

    expect(request.method).toEqual('GET');
  });

  it('should return POST request', () => {
    const apiInstance = new HTTPTransport();
    const requests: Array<SinonFakeXMLHttpRequest> = [];
    const xhr = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = (request => requests.push(request));

    apiInstance.post('/');

    const [request] = requests;

    expect(request.method).toEqual('POST');
  });
});
