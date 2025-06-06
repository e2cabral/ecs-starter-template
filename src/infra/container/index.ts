import { Container } from 'inversify';
import { TYPES } from './types.container';
import { Logger } from '../logging/logger.service';
import { Database } from '../database/database.config';
import { ILogger } from '../interfaces/i-logger.interface';
import { IDatabase } from '../interfaces/i-database.interface';
import { IStorage } from '../interfaces/i-storage.interface';
import { StorageService } from '../storage/storage.service';
import { IMonitoringController } from '../../presentation/controllers/interfaces/i-monitoring.controller';
import { MonitoringController } from '../../presentation/controllers/monitoring.controller';

const container = new Container()

container.bind<IDatabase>(TYPES.Infrastructure.Database).to(Database).inSingletonScope();
container.bind<ILogger>(TYPES.Infrastructure.Logger).to(Logger).inSingletonScope();
container.bind<IStorage>(TYPES.Infrastructure.Storage).to(StorageService).inSingletonScope();

container.bind<IMonitoringController>(TYPES.Controllers.MonitoringController).to(MonitoringController);

export { container }