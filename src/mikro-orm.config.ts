import { Options } from '@mikro-orm/core';

const mikroOrmConfig: Options = {
  dbName: process.env.MYSQL_DBNAME,
  port: +process.env.MYSQL_PORT,
  type: 'mysql',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: './database/migrations',
    glob: '*.ts',
    emit: 'ts',
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    snapshot: false,
  },
};

export default mikroOrmConfig;
