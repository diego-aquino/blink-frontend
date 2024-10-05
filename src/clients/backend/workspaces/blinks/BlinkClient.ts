import { AxiosInstance } from 'axios';

import { Workspace } from '../types';
import { BlinkListResult, BlinkPath, Blink, BlinkGetResult, BlinkCreationInput, BlinkCreationResult } from './types';

class BlinkClient {
  constructor(private http: AxiosInstance) {}

  async create(workspaceId: Workspace['id'], body: BlinkCreationInput) {
    const response = await this.http.post<BlinkCreationResult>(
      `/workspaces/${workspaceId}/blinks` satisfies BlinkPath.NonLiteral,
      body,
    );
    const blink = response.data;
    return blink;
  }

  async list(workspaceId: Workspace['id']) {
    const response = await this.http.get<BlinkListResult>(
      `/workspaces/${workspaceId}/blinks` satisfies BlinkPath.NonLiteral,
    );
    const blinksResult = response.data;
    return blinksResult;
  }

  async get(workspaceId: Workspace['id'], blinkId: Blink['id']) {
    const response = await this.http.get<BlinkGetResult>(
      `/workspaces/${workspaceId}/blinks/${blinkId}` satisfies BlinkPath.NonLiteral,
    );
    const blink = response.data;
    return blink;
  }
}

export default BlinkClient;
