import { FastifyInstance } from 'fastify';
import { setBaseRoute } from '../../presentation/routes/base.route.js';

export const setRoute = (app: FastifyInstance) => {
  setBaseRoute(app)
}
