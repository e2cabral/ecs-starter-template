export enum DatabaseParametersKeys {
  host = '/api/dev/database/host',
  user = '/api/dev/database/user',
  password = '/api/dev/database/password',
  name = '/api/dev/database/name',
}

export enum CacheParametersKeys {
  host = '/api/dev/database/cache/host',
  user = '/api/dev/database/cache/username',
  password = '/api/dev/database/cache/password',
  port = '/api/dev/database/cache/port',
}

export enum AIParamentersKeys {
  key = '/api/openai/key',
  bucket = '/api/dev/storage/bucket',
}

export enum AIFileParametersKeys {
  file = '/api/openai/key/food-nutrition-file',
  assistant = '/api/openai/key/assistant',
}

export enum PaymentsParametersKeys {
  key = '/api/payment/key',
  secretKey = '/api/payment/secret-key',
}

export enum AuthParametersKeys {
  clientId = '/api/dev/auth/client-id',
  secretHash = '/api/dev/auth/secret-hash',
  userPoolId = '/api/dev/auth/user-pool-id',
}