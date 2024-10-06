import { type HttpSchemaPath } from 'zimic/http';

import { BlinkComponents, BlinkSchema } from '@/types/backend/generated';

export type Blink = BlinkComponents['schemas']['Blink'];

export type BlinkCreationInput = BlinkSchema['/workspaces/:workspaceId/blinks']['POST']['request']['body'];
export type BlinkCreationResult = BlinkSchema['/workspaces/:workspaceId/blinks']['POST']['response']['201']['body'];

export type BlinkListSearchParams = BlinkSchema['/workspaces/:workspaceId/blinks']['GET']['request']['searchParams'];
export type BlinkListResult = BlinkSchema['/workspaces/:workspaceId/blinks']['GET']['response']['200']['body'];
export type BlinkGetResult = BlinkSchema['/workspaces/:workspaceId/blinks/:blinkId']['GET']['response']['200']['body'];

export type BlinkUpdateInput = BlinkSchema['/workspaces/:workspaceId/blinks/:blinkId']['PATCH']['request']['body'];
export type BlinkUpdateResult =
  BlinkSchema['/workspaces/:workspaceId/blinks/:blinkId']['PATCH']['response']['200']['body'];

export namespace BlinkPath {
  export type NonLiteral = Extract<HttpSchemaPath.NonLiteral<BlinkSchema>, `/workspaces/${string}/blinks${string}`>;
}
export type BlinkPath = Extract<HttpSchemaPath.Literal<BlinkSchema>, `/workspaces/${string}/blinks${string}`>;
