import { FastifyInstance } from 'fastify';
import { injectable } from 'inversify';
import { IMonitoringController } from './interfaces/i-monitoring.controller';

@injectable()
export class MonitoringController implements IMonitoringController{
  public async statistics(app: FastifyInstance) {
    return app.stats()
  }

  public async health() {
    const memoryUsage = process.memoryUsage();
    const uptime = process.uptime();

    return {
      status: 'healthy',
      timestamp: Date.now(),
      uptime: Math.floor(uptime),
      memory: {
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        rss: Math.round(memoryUsage.rss / 1024 / 1024),
      },
      version: process.version,
    };
  }
}