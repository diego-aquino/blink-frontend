import { BlinkComponents, BlinkSchema } from './generated';

export type Workspace = BlinkComponents['schemas']['Workspace'];

export type WorkspaceGetResult = BlinkSchema['/workspaces/:workspaceId']['GET']['response']['200']['body'];
export type WorkspaceListResult = BlinkSchema['/workspaces']['GET']['response']['200']['body'];
