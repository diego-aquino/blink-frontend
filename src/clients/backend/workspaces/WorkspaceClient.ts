import { AxiosInstance } from 'axios';

import BlinkClient from './blinks/BlinkClient';
import { WorkspaceListResult, WorkspacePath, Workspace, WorkspaceGetResult, WorkspaceListSearchParams } from './types';

class WorkspaceClient {
  blinks: BlinkClient;

  constructor(private http: AxiosInstance) {
    this.blinks = new BlinkClient(http);
  }

  async list(params: WorkspaceListSearchParams) {
    const response = await this.http.get<WorkspaceListResult>('/workspaces' satisfies WorkspacePath, { params });
    const workspacesResult = response.data;
    return workspacesResult;
  }

  async get(workspaceId: Workspace['id']) {
    const response = await this.http.get<WorkspaceGetResult>(
      `/workspaces/${workspaceId}` satisfies WorkspacePath.NonLiteral,
    );
    const workspace = response.data;
    return workspace;
  }
}

export default WorkspaceClient;
