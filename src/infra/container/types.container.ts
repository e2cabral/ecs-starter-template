//#region Infrastructure Types
const Database = Symbol.for('Database');
const Logger = Symbol.for('Logger');
const Storage = Symbol.for('Storage');
const Auth = Symbol.for('Auth');
const ParameterStorage = Symbol.for('ParameterStorage');
//#endregion

//#region Controllers Types
const MonitoringController = Symbol.for('MonitoringController');
//#endregion

export const TYPES = {
  Infrastructure: {
    Database,
    Logger,
    Storage,
    Auth,
    ParameterStorage,
  },
  Services: {},
  Repositories: {},
  Controllers: {
    MonitoringController
  },
  UseCases: {},
  Entities: {},
}