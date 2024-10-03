import { AxiosInstance } from 'axios';

import { BlinkComponents, BlinkSchema } from '@/types/backend/generated';

export type Workspace = BlinkComponents['schemas']['Workspace'];

export type WorkspaceListResult = BlinkSchema['/workspaces']['GET']['response']['200']['body'];
export type WorkspaceGetResult = BlinkSchema['/workspaces/:workspaceId']['GET']['response']['200']['body'];

class WorkspaceClient {
  constructor(private http: AxiosInstance) {}

  async list() {
    const response = await this.http.get<WorkspaceListResult>('/workspaces');
    const workspacesResult = response.data;
    return workspacesResult;
  }

  async get(workspaceId: Workspace['id']) {
    const response = await this.http.get<WorkspaceGetResult>(`/workspaces/${workspaceId}`);
    const workspace = response.data;
    return workspace;
  }
}

export default WorkspaceClient;
