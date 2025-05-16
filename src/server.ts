import { setConfig } from './main/app.config';
import fastify from 'fastify';

const app = fastify();

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