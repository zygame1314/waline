const { Console } = require('think-logger3');
const Mysql = require('think-model-mysql');
const Mysql2 = require('think-model-mysql2');
const Postgresql = require('think-model-postgresql');

let Sqlite;

try {
  Sqlite = require('think-model-sqlite');
} catch (err) {
  // eslint-disable-next-line @typescript-eslint/no-extraneous-class
  Sqlite = class {};
  console.log(err);
}

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DB,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PREFIX,
  MYSQL_CHARSET,
  MYSQL_SSL,
  TIDB_HOST,
  TIDB_PORT,
  TIDB_DB,
  TIDB_USER,
  TIDB_PASSWORD,
  TIDB_PREFIX,
  TIDB_CHARSET,
  SQLITE_PATH,
  SQLITE_DB,
  SQLITE_PREFIX,
  PG_DB,
  POSTGRES_DATABASE,
  PG_HOST,
  POSTGRES_HOST,
  PG_PASSWORD,
  POSTGRES_PASSWORD,
  PG_PORT,
  POSTGRES_PORT,
  PG_PREFIX,
  POSTGRES_PREFIX,
  PG_USER,
  POSTGRES_USER,
  PG_SSL,
  POSTGRES_SSL,
  MONGO_AUTHSOURCE,
  MONGO_DB,
  MONGO_HOST,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_REPLICASET,
  MONGO_USER,
} = process.env;

let type = 'common';
const mongoOpt = {};

if (MONGO_REPLICASET) mongoOpt.replicaSet = MONGO_REPLICASET;
if (MONGO_AUTHSOURCE) mongoOpt.authSource = MONGO_AUTHSOURCE;

if (MONGO_DB) {
  type = 'mongo';
  for (const envKeys in process.env) {
    if (/MONGO_OPT_/.test(envKeys)) {
      const key = envKeys
        .slice(10)
        .toLocaleLowerCase()
        .replace(/_([a-z])/g, (_, b) => b.toUpperCase());

      mongoOpt[key] = process.env[envKeys];
    }
  }
} else if (PG_DB || POSTGRES_DATABASE) {
  type = 'postgresql';
} else if (SQLITE_PATH) {
  type = 'sqlite';
} else if (MYSQL_DB) {
  type = 'mysql';
} else if (TIDB_DB) {
  type = 'tidb';
}

const isVercelPostgres =
  type === 'postgresql' && POSTGRES_HOST?.endsWith('vercel-storage.com');

exports.model = {
  type,
  common: {
    logSql: true,
    logger: (msg) => think.logger.info(msg),
  },

  mongo: {
    host: MONGO_HOST
      ? MONGO_HOST.startsWith('[')
        ? JSON.parse(MONGO_HOST)
        : MONGO_HOST
      : '127.0.0.1',
    port: MONGO_PORT
      ? MONGO_PORT.startsWith('[')
        ? JSON.parse(MONGO_PORT)
        : MONGO_PORT
      : 27017,
    user: MONGO_USER,
    password: MONGO_PASSWORD,
    database: MONGO_DB,
    options: mongoOpt,
  },

  postgresql: {
    handle: Postgresql,
    user: PG_USER || POSTGRES_USER,
    password: PG_PASSWORD || POSTGRES_PASSWORD,
    database: PG_DB || POSTGRES_DATABASE,
    host: PG_HOST || POSTGRES_HOST || '127.0.0.1',
    port: PG_PORT || POSTGRES_PORT || (isVercelPostgres ? '5432' : '3211'),
    connectionLimit: 1,
    prefix: PG_PREFIX || POSTGRES_PREFIX || 'wl_',
    ssl:
      (PG_SSL || POSTGRES_SSL) == 'true' || isVercelPostgres
        ? {
            rejectUnauthorized: false,
          }
        : null,
  },

  sqlite: {
    handle: Sqlite,
    path: SQLITE_PATH,
    database: SQLITE_DB || 'waline',
    connectionLimit: 1,
    prefix: SQLITE_PREFIX || 'wl_',
  },

  mysql: {
    handle: Mysql,
    dateStrings: true,
    host: MYSQL_HOST || '127.0.0.1',
    port: MYSQL_PORT || '3306',
    database: MYSQL_DB,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    prefix: MYSQL_PREFIX || 'wl_',
    charset: MYSQL_CHARSET || 'utf8mb4',
    ssl:
      MYSQL_SSL === 'true'
        ? {
            rejectUnauthorized: false,
          }
        : null,
  },

  tidb: {
    handle: Mysql2,
    dateStrings: true,
    host: TIDB_HOST || '127.0.0.1',
    port: TIDB_PORT || '4000',
    database: TIDB_DB,
    user: TIDB_USER,
    password: TIDB_PASSWORD,
    prefix: TIDB_PREFIX || 'wl_',
    charset: TIDB_CHARSET || 'utf8mb4',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
    },
  },
};

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
  type: 'console',
  console: {
    handle: Console,
  },
};
