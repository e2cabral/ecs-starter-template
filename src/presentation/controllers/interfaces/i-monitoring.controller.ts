import { FastifyInstance } from 'fastify';

export interface MonitoringHealth {
  status: string;
  timestamp: number;
  uptime: number;
  memory: {
    heapTotal: number;
    heapUsed: number;
    rss: number;
  };
  version: string;
}

export interface IMonitoringController {
  statistics(app: FastifyInstance): Promise<unknown>
  health(): Promise<MonitoringHealth>
}
