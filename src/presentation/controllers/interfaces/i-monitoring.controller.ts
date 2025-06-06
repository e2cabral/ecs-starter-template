import { FastifyInstance } from 'fastify';

export interface IMonitoringController {
  statistics(app: FastifyInstance): Promise<any>
  health(): Promise<any>
}