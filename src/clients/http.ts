import axios, { AxiosError, AxiosResponse } from 'axios';

import environment from '@/config/environment';

const http = {
  backend: axios.create({
    baseURL: environment.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
  }),
};

function isLoginRequest(request: unknown) {
  return (
    typeof request === 'object' &&
    request !== null &&
    'responseURL' in request &&
    typeof request.responseURL === 'string' &&
    request.responseURL.endsWith('/auth/login')
  );
}

function isAuthRefreshRequest(request: unknown) {
  return (
    typeof request === 'object' &&
    request !== null &&
    'responseURL' in request &&
    typeof request.responseURL === 'string' &&
    request.responseURL.endsWith('/auth/refresh')
  );
}

export function isUnauthenticatedResponse(response: AxiosResponse) {
  const responseData = response.data as unknown;

  const hasUnauthenticatedMessage =
    typeof responseData === 'object' &&
    responseData !== null &&
    'message' in responseData &&
    responseData.message === 'Authentication is required to access this resource.';

  const hasInvalidCredentialsMessage =
    !isLoginRequest(response.request) &&
    typeof responseData === 'object' &&
    responseData !== null &&
    'message' in responseData &&
    responseData.message === 'Authentication credentials are not valid.';

  return response.status === 401 && (hasUnauthenticatedMessage || hasInvalidCredentialsMessage);
}

function redirectToSignIn() {
  window.location.pathname = '/sign-in';
}

http.backend.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!(error instanceof AxiosError) || !error.response) {
      return Promise.reject(error);
    }

    const isUnauthenticated = isUnauthenticatedResponse(error.response);
    const isRefreshRequest = isAuthRefreshRequest(error.request);

    const isRefreshTokenExpiredError = isRefreshRequest && error.response.status >= 400;
    const isAccessTokenExpiredError = isUnauthenticated && !isRefreshTokenExpiredError;

    if (isAccessTokenExpiredError) {
      try {
        await http.backend.post('/auth/refresh');
      } catch (refreshError) {
        console.error(refreshError);
        return Promise.reject(error);
      }

      return axios(error.config ?? {});
    }

    if (isRefreshTokenExpiredError) {
      redirectToSignIn();
    }

    return Promise.reject(error);
  },
);

export default http;
