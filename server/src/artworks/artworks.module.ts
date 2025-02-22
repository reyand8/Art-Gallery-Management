import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ArtworksController } from './artworks.controller';
import { ArtworksService } from './artworks.service';
import { Artwork } from '../models/artwork.model';


@Module({
  imports: [SequelizeModule.forFeature([Artwork])],
  controllers: [ArtworksController],
  providers: [ArtworksService]
})
export class ArtworksModule {}
