import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { type HttpSchemaPath } from 'zimic/http';

import { getRequestURL, isErrorResponseBody, isRequest } from '@/clients/http';
import { BlinkSchema } from '@/types/backend/generated';

export type LoginCredentials = BlinkSchema['/auth/login']['POST']['request']['body'];

export interface AuthEventByType {
  sessionRefreshError: void;
}

type AuthEventType = keyof AuthEventByType;

class AuthClient {
  private listeners = new Map<AuthEventType, Set<(event: AuthEventByType[AuthEventType]) => void>>();

  constructor(private http: AxiosInstance) {
    this.addAuthInterceptors(http);
  }

  async login(credentials: LoginCredentials) {
    await this.http.post('/auth/login', credentials);
  }

  private addAuthInterceptors(http: AxiosInstance) {
    http.interceptors.response.use(
      (response) => response,
      (error) => this.handleRequestError(http, error),
    );
  }

  private async handleRequestError(http: AxiosInstance, error: unknown) {
    if (!(error instanceof AxiosError) || !error.response || !isRequest(error.request)) {
      return Promise.reject(error);
    }

    const requestURL = getRequestURL(error.request);

    const isUnauthenticatedError = AuthClient.isUnauthenticatedResponse(error.response);
    const isInvalidCredentialsError = AuthClient.isInvalidCredentialsResponse(error.response);

    const isLoginRequest = requestURL.pathname === ('/auth/login' satisfies HttpSchemaPath<BlinkSchema>);
    const isAuthRefreshRequest = requestURL.pathname === ('/auth/refresh' satisfies HttpSchemaPath<BlinkSchema>);

    const isRefreshTokenExpiredError = isAuthRefreshRequest && error.response.status >= 400;

    const isAccessTokenExpiredError =
      (isUnauthenticatedError || (!isLoginRequest && isInvalidCredentialsError)) && !isRefreshTokenExpiredError;

    if (isRefreshTokenExpiredError) {
      this.notify('sessionRefreshError', undefined);
    }

    if (isAccessTokenExpiredError) {
      try {
        await http.post('/auth/refresh');
      } catch (refreshError) {
        console.error(refreshError);
        return Promise.reject(error);
      }

      return axios(error.config ?? {});
    }

    return Promise.reject(error);
  }

  on<Event extends AuthEventType>(eventType: Event, listener: (event: AuthEventByType[Event]) => void) {
    const eventListeners = this.listeners.get(eventType) ?? new Set();
    eventListeners.add(listener);

    this.listeners.set(eventType, eventListeners);

    return listener;
  }

  off<Event extends AuthEventType>(eventType: Event, listener: (event: AuthEventByType[Event]) => void) {
    const eventListeners = this.listeners.get(eventType);
    eventListeners?.delete(listener);
  }

  private notify<Event extends AuthEventType>(eventType: Event, event: AuthEventByType[Event]) {
    const eventListeners = this.listeners.get(eventType) ?? new Set();
    for (const listener of eventListeners) {
      listener(event);
    }
  }

  static isUnauthenticatedResponse(response: AxiosResponse) {
    const hasUnauthenticatedMessage =
      isErrorResponseBody(response.data) &&
      response.data.code === 'UNAUTHORIZED' &&
      response.data.message === 'Authentication is required to access this resource.';

    return response.status === 401 && hasUnauthenticatedMessage;
  }

  static isInvalidCredentialsResponse(response: AxiosResponse) {
    const hasInvalidCredentialsMessage =
      isErrorResponseBody(response.data) &&
      response.data.code === 'UNAUTHORIZED' &&
      response.data.message === 'Authentication credentials are not valid.';

    return response.status === 401 && hasInvalidCredentialsMessage;
  }
}

export default AuthClient;
