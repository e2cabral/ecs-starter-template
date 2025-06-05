import { FastifyInstance } from 'fastify';
import { setBaseRoute } from '../../presentation/routes/base.route';

export const setRoute = (app: FastifyInstance) => {
  setBaseRoute(app)
}