import { FastifyInstance } from 'fastify';
import { container } from '../../infra/container';
import { IMonitoringController } from '../controllers/interfaces/i-monitoring.controller';
import { TYPES } from '../../infra/container/types.container';

export const setBaseRoute = (app: FastifyInstance) => {
  const controller = container.get<IMonitoringController>(TYPES.Controllers.MonitoringController)
  app.register((instance, _, done) => {
    instance
      .get('/statistics', async () => controller.statistics(app))
      .get('/health', async () => controller.health())

    done()
  }, { prefix: '/monitoring' })
}