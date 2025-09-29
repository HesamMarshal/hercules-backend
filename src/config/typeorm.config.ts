// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { config } from 'dotenv';
// import { join } from 'path';
// import { DataSourceOptions } from 'typeorm';

// config();
// config({
//   path: join(process.cwd(), `.env.${process.env.NodeEnv}`),
// });
// export function TypeOrmConfig(): TypeOrmModuleOptions {
//   const {
//     DB_TYPE,
//     DB_HOST,
//     DB_NAME,
//     DB_PASSWORD,
//     DB_PORT,
//     DB_USERNAME,
//     NODE_ENV,
//   } = process.env;
//   return {
//     type: 'postgres',
//     host: DB_HOST,
//     port: DB_PORT,
//     username: DB_USERNAME,
//     password: DB_PASSWORD,
//     database: DB_NAME,
//     autoLoadEntities: false,
//     synchronize: false, // NODE_ENV === 'development',  IMPORTANT: false in dev too — use migrations
//     entities: [
//       'dist/**/**/**/*.entity{.ts,.js}',
//       'dist/**/**/*.entity{.ts,.js}',
//     ],
//   };
// }

// export function TypeOrmDataSourceConfig(): DataSourceOptions {
//   const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME, NODE_ENV } =
//     process.env;
//   return {
//     type: 'postgres',
//     host: DB_HOST,
//     port: DB_PORT,
//     username: DB_USERNAME,
//     password: DB_PASSWORD,
//     database: DB_NAME,
//     synchronize: false, // NODE_ENV === 'development',  IMPORTANT: false in dev too — use migrations
//     entities: [
//       'dist/**/**/**/*.entity{.ts,.js}',
//       'dist/**/**/*.entity{.ts,.js}',
//     ],
//   };
// }
