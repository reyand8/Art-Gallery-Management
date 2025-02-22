import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ArtworksModule } from './artworks/artworks.module';
import { Artwork } from './models/artwork.model';
import {ConfigModule, ConfigService} from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get<'postgres'>('DB_DIALECT'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        models: [Artwork],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    ArtworksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
