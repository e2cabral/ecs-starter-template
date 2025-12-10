import winston from "winston";
import moment from "moment";
import { ILogger } from '../interfaces/i-logger.interface';
import { injectable } from 'inversify';

@injectable()
export class Logger implements ILogger {
  private logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      this.logFormat(),
    ),
    transports: [
      new winston.transports.Console(),
    ],
  });

  public info(message: string): void {
    this.logger.info(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public profile(message: string): void {
    this.logger.profile(message);
  }

  private logFormat() {
    return winston.format.printf(({ timestamp, level, message, durationMs, methodName }) => {
      const memoryInfo = this.memoryUsage();

      const date = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');

      const duration = durationMs ? `(Tempo de execução: ${durationMs}ms)` : '';

      const method = methodName ? `[${methodName}] ` : '';

      return `${date} > (${memoryInfo}) > [${level.toUpperCase()}]: ${method}${message} | ${duration}`;
    });
  }

  private memoryUsage(): string {
    const memoryUsage = process.memoryUsage();
    return `RSS: ${(memoryUsage.rss / 1024 ** 2).toFixed(2)} MB | Heap (Total): ${(memoryUsage.heapTotal / 1024 ** 2).toFixed(2)} MB | Heap (Usada): ${(memoryUsage.heapUsed / 1024 ** 2).toFixed(2)} MB`;
  }
}