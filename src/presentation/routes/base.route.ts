import { FastifyInstance } from 'fastify';
import { container } from '../../infra/container/index.js';
import { IMonitoringController } from '../controllers/interfaces/i-monitoring.controller.js';
import { TYPES } from '../../infra/container/types.container.js';

export const setBaseRoute = (app: FastifyInstance) => {
  const controller = container.get<IMonitoringController>(TYPES.Controllers.MonitoringController)
  app.register((instance, _, done) => {
    instance
      .get('/statistics', async () => controller.statistics(app))
      .get('/health', async () => controller.health())

    done()
  }, { prefix: '/monitoring' })
}
