import { type HttpSchemaPath } from 'zimic/http';

import { BlinkComponents, BlinkSchema } from '@/types/backend/generated';

export type Blink = BlinkComponents['schemas']['Blink'];

export type BlinkListResult = BlinkSchema['/workspaces/:workspaceId/blinks']['GET']['response']['200']['body'];
export type BlinkGetResult = BlinkSchema['/workspaces/:workspaceId/blinks/:blinkId']['GET']['response']['200']['body'];

export namespace BlinkPath {
  export type NonLiteral = Extract<HttpSchemaPath.NonLiteral<BlinkSchema>, `/workspaces/${string}/blinks${string}`>;
}
export type BlinkPath = Extract<HttpSchemaPath.Literal<BlinkSchema>, `/workspaces/${string}/blinks${string}`>;
