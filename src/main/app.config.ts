import 'node:perf_hooks';
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import fastifyRoutesStats from '@fastify/routes-stats';
import cors from '@fastify/cors';
import fastifyRoutes from '@fastify/routes';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyCircuitBreaker from '@fastify/circuit-breaker';
import fastifyMetrics from 'fastify-metrics';
import { setRoute } from './route.config';
import { FastifyOtelInstrumentation } from '@fastify/otel';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import fastifyRateLimit from '@fastify/rate-limit';
import helmet from '@fastify/helmet';

export const setConfig = (app: FastifyInstance) => {

  const provider = new NodeTracerProvider();
  provider.register();

  const fastifyOtelInstrumentation = new FastifyOtelInstrumentation({ servername: 'ecs-starter-template' });
  fastifyOtelInstrumentation.setTracerProvider(provider);

  app
    .register(helmet, {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ['\'self\''],
          scriptSrc: ['\'self\'', '\'unsafe-inline\''],
          styleSrc: ['\'self\'', '\'unsafe-inline\''],
          imgSrc: ['\'self\'', 'data:', 'https:'],
        },
      },
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      dnsPrefetchControl: { allow: true },
      frameguard: { action: 'deny' },
      hidePoweredBy: true,
      hsts: { maxAge: 31536000, includeSubDomains: true },
      ieNoOpen: true,
      noSniff: true,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      xssFilter: true,
    })
    .register(cors, { origin: '*' })
    .register(fastifyRoutes)
    .register(fastifyRoutesStats)
    .register(fastifySwagger)
    .register(fastifySwaggerUi, {
      routePrefix: '/documentation',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
      transformSpecification: (swaggerObject) => {
        return swaggerObject;
      },
      transformSpecificationClone: true,
    })
    .register(fastifyCircuitBreaker, {
      threshold: 5,
      timeout: 30000,
      onCircuitOpen: async (_: FastifyRequest, reply: FastifyReply) => {
        reply.code(503).send({
          error: 'Service Unavailable',
          message: 'Circuit breaker is open - service is temporarily unavailable',
        });
      },
      resetTimeout: 60000,
    })
    .register(fastifyMetrics, { endpoint: '/metrics' })
    .register(fastifyRateLimit, {
      max: 100,
      timeWindow: '1 minute',
    });

  app.register(fastifyOtelInstrumentation.plugin());

  setRoute(app);
};