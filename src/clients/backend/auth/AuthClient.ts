import { AxiosInstance } from 'axios';

import { BlinkSchema } from '@/types/backend/generated';

export type LoginCredentials = BlinkSchema['/auth/login']['POST']['request']['body'];

class AuthClient {
  constructor(private http: AxiosInstance) {}

  async login(credentials: LoginCredentials) {
    await this.http.post('/auth/login', credentials);
  }
}

export default AuthClient;
