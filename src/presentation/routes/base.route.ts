import { FastifyInstance } from 'fastify';

export const setBaseRoute = (app: FastifyInstance) => {
  app.register((instance, _, done) => {
    instance
      .get('/statistics', async () => {
        return app.stats()
      })
      .get('/health', async () => {
        return { status: 'healthy', timestamp: Date.now() };
      })

    done()
  }, { prefix: '/monitoring' })
}