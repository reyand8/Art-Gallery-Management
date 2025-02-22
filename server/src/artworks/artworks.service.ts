import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Artwork } from '../models/artwork.model';
import { CreateArtworkDto } from './dto/createArtwork.dto';
import { UpdateArtworkDto } from './dto/updateArtwork.dto';
import {IArtwork} from "../interfaces/IArtwork";


@Injectable()
export class ArtworksService {
    constructor(@InjectModel(Artwork) private artworkModel: typeof Artwork) {}

    async findAll(query: any): Promise<Artwork[]> {
        const { price, artist, type } = query;
        const options: any = { where: {} };

        if (price) options.order = [['price', price]];
        if (artist) options.where.artist = artist;
        if (type) options.where.type = type;

        return this.artworkModel.findAll(options);
    }

    async findOne(id: string): Promise<Artwork> {
        const artwork: Artwork | null = await this.artworkModel.findByPk(id);
        if (!artwork) throw new NotFoundException('Artwork not found');
        return artwork;
    }

    async create(createArtworkDto: CreateArtworkDto): Promise<IArtwork> {
        return await this.artworkModel.create(createArtworkDto);
    }

    async update(id: string, updateArtworkDto: UpdateArtworkDto): Promise<Artwork> {
        const artwork = await this.findOne(id);
        return artwork.update(updateArtworkDto);
    }

    async remove(id: string): Promise<void> {
        const artwork: any = await this.findOne(id);
        await artwork.destroy();
    }
}
