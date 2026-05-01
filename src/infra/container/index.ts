import { Container } from 'inversify';
import { TYPES } from './types.container.js';
import { Logger } from '../logging/logger.service.js';
import { Database } from '../database/database.config.js';
import { ILogger } from '../interfaces/i-logger.interface.js';
import { IDatabase } from '../interfaces/i-database.interface.js';
import { IStorage } from '../interfaces/i-storage.interface.js';
import { StorageService } from '../storage/storage.service.js';
import { IMonitoringController } from '../../presentation/controllers/interfaces/i-monitoring.controller.js';
import { MonitoringController } from '../../presentation/controllers/monitoring.controller.js';
import { IParameterStorageService } from '../storage/interfaces/i-paramenter-storage.service.js';
import { ParameterStorageService } from '../storage/parameter-storage.service.js';
import { IAuthService } from '../auth/interfaces/i-auth.service.js';
import { AuthService } from '../auth/auth.service.js';

const container = new Container()

container.bind<IDatabase>(TYPES.Infrastructure.Database).to(Database).inSingletonScope();
container.bind<ILogger>(TYPES.Infrastructure.Logger).to(Logger).inSingletonScope();
container.bind<IStorage>(TYPES.Infrastructure.Storage).to(StorageService).inSingletonScope();
container.bind<IParameterStorageService>(TYPES.Infrastructure.ParameterStorage).to(ParameterStorageService).inSingletonScope();
container.bind<IAuthService>(TYPES.Infrastructure.Auth).to(AuthService).inSingletonScope();

container.bind<IMonitoringController>(TYPES.Controllers.MonitoringController).to(MonitoringController);

export { container }
