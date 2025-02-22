import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ArtworksModule } from './artworks/artworks.module';
import { Artwork } from './models/artwork.model';


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'art-galley',
      models: [Artwork],
      autoLoadModels: true,
      synchronize: true,
    }),
    ArtworksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
