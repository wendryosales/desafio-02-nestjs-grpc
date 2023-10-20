import { DataSourceOptions } from 'typeorm';

const NODE_ENV = process.env.NODE_ENV || 'development';

const IS_DEV = NODE_ENV === 'development';

export const ormConfig: DataSourceOptions = IS_DEV
  ? {
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }
  : {
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_POR),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
