import { z } from 'zod';

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production'] as const),

  NEXT_PUBLIC_BACKEND_URL: z.string().url(),
});

const environment = environmentSchema.parse({
  NODE_ENV: process.env.NODE_ENV,

  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export default environment;
