import { APIError } from 'api/types';

function apiHasError(response: any): response is APIError {
  return response && response.reason;
}

export default apiHasError;
