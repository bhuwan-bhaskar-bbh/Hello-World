import { z } from 'zod';
import { greetings } from './schema';

export const errorSchemas = {
  notFound: z.object({ message: z.string() }),
};

export const api = {
  greetings: {
    get: {
      method: 'GET' as const,
      path: '/api/greetings',
      responses: {
        200: z.array(z.custom<typeof greetings.$inferSelect>()),
      },
    },
  },
  auth: {
    register: {
      method: 'POST' as const,
      path: '/api/auth/register',
      responses: {
        201: z.object({
          id: z.number(),
          username: z.string(),
        }),
      },
    },
    login: {
      method: 'POST' as const,
      path: '/api/auth/login',
      responses: {
        200: z.object({
          id: z.number(),
          username: z.string(),
        }),
      },
    },
    social: {
      method: 'POST' as const,
      path: '/api/auth/social',
      responses: {
        200: z.object({
          id: z.number(),
          username: z.string(),
        }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
