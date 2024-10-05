import { type HttpSchemaPath } from 'zimic/http';

import { BlinkComponents, BlinkSchema } from '@/types/backend/generated';

export type Workspace = BlinkComponents['schemas']['Workspace'];

export type WorkspaceListResult = BlinkSchema['/workspaces']['GET']['response']['200']['body'];
export type WorkspaceGetResult = BlinkSchema['/workspaces/:workspaceId']['GET']['response']['200']['body'];

export namespace WorkspacePath {
  export type NonLiteral = Extract<HttpSchemaPath.NonLiteral<BlinkSchema>, `/workspaces${string}`>;
}
export type WorkspacePath = Extract<HttpSchemaPath.Literal<BlinkSchema>, `/workspaces${string}`>;
