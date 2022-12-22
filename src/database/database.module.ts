import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'containers-us-west-128.railway.app',
      port: parseInt(process.env.DATABASE_PORT) || 6463,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'nwQ4tDJr7saDQ0jNEZFB',
      database: process.env.DATABASE_NAME || 'railway',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
