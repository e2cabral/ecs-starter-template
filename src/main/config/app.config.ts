import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import fastifyRoutesStats from '@fastify/routes-stats';
import cors from '@fastify/cors';
import fastifyRoutes from '@fastify/routes';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyCircuitBreaker from '@fastify/circuit-breaker';
import fastifyMetrics from 'fastify-metrics';
import { setRoute } from './route.config';
import { FastifyOtelInstrumentation } from '@fastify/otel/';
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
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      dnsPrefetchControl: { allow: true },
      frameguard: { action: 'deny' },
      hidePoweredBy: true,
      hsts: { maxAge: 31536000, includeSubDomains: true },
      ieNoOpen: true,
      noSniff: false,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      xssFilter: true,
    })
    .register(cors, { origin: '*' })
    .register(fastifyRateLimit, {
      max: 100,
      timeWindow: '1 minute',
    })
    .register(fastifyOtelInstrumentation.plugin())
    .register(fastifyRoutesStats)
    .register(fastifyMetrics, { endpoint: '/metrics' })
    .register(fastifyRoutes)
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
    .register(fastifySwagger, {
      openapi: {
        info: {
          title: 'API Documentation',
          description: 'API Documentation',
          version: '1.0.0',
        },
        servers: [{
          url: 'http://localhost:3000',
        }],
      },
    })
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
    });

  setRoute(app);
};