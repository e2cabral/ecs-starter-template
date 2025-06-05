import { setConfig } from './main/config/app.config';
import fastify from 'fastify';

const app = fastify({
  disableRequestLogging: true,
  ignoreTrailingSlash: true,
  logger: {
    level: 'info',
    serializers: {
      req: () => undefined,
      res: () => undefined
    }
  }
});

setConfig(app)

app.listen(
  { port: 3000, host: '0.0.0.0' },
  (err, address) => {
      if (err) {
        app.log.error(err)
        process.exit(1)
      }
      app.log.info(`server listening on ${address}`)
    }
)