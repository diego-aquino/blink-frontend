import { AxiosInstance } from 'axios';

import { BlinkComponents, BlinkSchema } from '@/types/backend/generated';

export type User = BlinkComponents['schemas']['User'];

export type UserGetResult = BlinkSchema['/users/:userId']['GET']['response']['200']['body'];

class UserClient {
  constructor(private http: AxiosInstance) {}

  async me() {
    const response = await this.http.get<UserGetResult>('/users/me');
    const user = response.data;
    return user;
  }
}

export default UserClient;
