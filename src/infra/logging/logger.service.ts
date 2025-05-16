import winston from "winston";
import moment from "moment";

let logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat()
  ),
  transports: [
    new winston.transports.Console()
  ],
});

export const info = (message: string) => {
  logger.info(message);
};

export const error = (message: string) => {
  logger.error(message);
};

export const warn = (message: string) => {
  logger.warn(message);
};

export const profile = (message: string) => {
  logger.profile(message);
};

const logFormat = () => {
  return winston.format.printf(({timestamp, level, message, durationMs}) => {
    const memoryInfo = memoryUsage();

    const date = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');

    const duration = durationMs ? `(Tempo de execução: ${durationMs}ms)` : '';

    return `${date} > (${memoryInfo}) > [${level.toUpperCase()}]: ${message} | ${duration}`;
  });
};

const memoryUsage = () => {
  const memoryUsage = process.memoryUsage();
  return `RSS: ${(memoryUsage.rss / 1024 ** 2).toFixed(2)} MB | Heap (Total): ${(memoryUsage.heapTotal / 1024 ** 2).toFixed(2)} MB | Heap (Usada): ${(memoryUsage.heapUsed / 1024 ** 2).toFixed(2)} MB`;
};