import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'theme_generator',

  synchronize: false,

  entities: ['src/database/entities/*.entity.ts'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
});
