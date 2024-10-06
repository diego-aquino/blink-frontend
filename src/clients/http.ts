import axios from 'axios';
import { z } from 'zod';

import environment from '@/config/environment';

const http = {
  backend: axios.create({
    baseURL: environment.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
  }),
};

const errorResponseBodySchema = z.object({
  message: z.string().optional(),
  code: z.string().optional(),
});

type ErrorResponseBody = z.infer<typeof errorResponseBodySchema>;

export function isErrorResponseBody(responseBody: unknown): responseBody is ErrorResponseBody {
  return errorResponseBodySchema.safeParse(responseBody).success;
}

const requestSchema = z.object({
  responseURL: z.string().url(),
});

type Request = z.infer<typeof requestSchema>;

export function isRequest(request: unknown): request is Request {
  return requestSchema.safeParse(request).success;
}

export function getRequestURL(request: Request) {
  return new URL(request.responseURL);
}

export default http;
