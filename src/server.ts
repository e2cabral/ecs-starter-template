import 'reflect-metadata';
import { setConfig } from './main/config/app.config.js';
import fastify from 'fastify';

const normalizeUrl = (url: string): string => {
  if (url === '/' || url.length === 0) {
    return '/';
  }

  const [pathname = '', search = ''] = url.split('?');
  const normalizedPathname = pathname.replace(/\/+$/, '') || '/';

  return search.length > 0
    ? `${normalizedPathname}?${search}`
    : normalizedPathname;
};

const app = fastify({
  disableRequestLogging: true,
  rewriteUrl: (request) => normalizeUrl(request.url ?? '/'),
});

setConfig(app);

const start = async () => {
  try {
    const address = await app.listen({ port: 3000, host: '0.0.0.0' });
    app.log.info(`server listening on ${address}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

void start();
