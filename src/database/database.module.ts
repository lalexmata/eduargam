import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'roundhouse.proxy.rlwy.net',
      port: parseInt(process.env.DATABASE_PORT) || 33000,
      username: process.env.DATABASE_USER || 'root',
      password:
        process.env.DATABASE_PASSWORD || 'hGA4dc1f63GF-e2aCGbe1HBHcHDBCbCh',
      database: process.env.DATABASE_NAME || 'railway',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false
      ,
    }),
  ],
})
export class DatabaseModule {}
