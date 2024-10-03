import axios from 'axios';

import environment from '@/config/environment';

import AuthClient from './auth/AuthClient';
import UserClient from './users/UserClient';
import WorkspaceClient from './workspaces/WorkspaceClient';

class BackendClient {
  private http = axios.create({
    baseURL: environment.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
  });

  auth: AuthClient;
  users: UserClient;
  workspaces: WorkspaceClient;

  constructor() {
    this.auth = new AuthClient(this.http);
    this.users = new UserClient(this.http);
    this.workspaces = new WorkspaceClient(this.http);
  }
}

export default BackendClient;
