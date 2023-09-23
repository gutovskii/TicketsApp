import * as dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export const getConfig = () => config;

export const config = {
  port: +env.PORT || 404,
  databases: {
    mysql: {
      host: env.MYSQL_HOST,
      port: +env.MYSQL_PORT,
      username: env.MYSQL_USER,
      password: env.MYSQL_PASS,
      database: env.MYSQL_DBNAME,
    },
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  },
};
