import { HTTPMethods } from 'fastify';
import { Stats } from '@fastify/routes-stats';

declare module 'fastify' {
  interface FastifyInstance {
    stats: () => Partial<Record<HTTPMethods, Record<string, Stats>>>;
  }
}