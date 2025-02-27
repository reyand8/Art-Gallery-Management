import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Artwork } from '../models/artwork.model';
import { CreateArtworkDto } from './dto/createArtwork.dto';
import { UpdateArtworkDto } from './dto/updateArtwork.dto';
import { IArtwork } from '../interfaces/IArtwork.interface';
import { IArtworkFilters } from '../interfaces/IArtworkFilters.interface';
import { IFilters } from '../interfaces/IFilters.interface';


@Injectable()
export class ArtworksService {
    constructor(@InjectModel(Artwork) private artworkModel: typeof Artwork) {}

    /**
     * Retrieves a list of artworks with optional filters and sorting.
     * @param query - Query parameters for filtering and sorting artworks.
     * @returns Promise<Artwork[]> - List of artworks.
     */
    async findAll(query: IFilters): Promise<Artwork[]> {
        const { price, artist, type } = query;
        const options: IArtworkFilters = { where: {} };

        if (price) options.order = [['price', price]];
        if (artist) options.where.artist = artist;
        if (type) options.where.type = type;

        return this.artworkModel.findAll(options);
    }

    /**
     * Retrieves a specific artwork by its ID.
     * @param id - ID of the artwork.
     * @returns Promise<Artwork> - The requested artwork.
     * @throws NotFoundException - If no artwork is found with the given ID.
     */
    async findOne(id: string): Promise<Artwork> {
        const artwork: Artwork | null = await this.artworkModel.findByPk(id);
        if (!artwork) throw new NotFoundException('Artwork not found');
        return artwork;
    }

    /**
     * Creates a new artwork.
     * @param createArtworkDto - Data for the new artwork.
     * @returns Promise<IArtwork> - The created artwork.
     */
    async create(createArtworkDto: CreateArtworkDto): Promise<IArtwork> {
        return await this.artworkModel.create(createArtworkDto);
    }

    /**
     * Updates an existing artwork by its ID.
     * @param id - ID of the artwork to update.
     * @param updateArtworkDto - Data for updating the artwork.
     * @returns Promise<Artwork> - The updated artwork.
     * @throws NotFoundException - If no artwork is found with the given ID.
     */
    async update(id: string, updateArtworkDto: UpdateArtworkDto): Promise<Artwork> {
        const artwork = await this.findOne(id);
        return artwork.update(updateArtworkDto);
    }

    /**
     * Removes an artwork by its ID.
     * @param id - ID of the artwork to remove.
     * @returns Promise<Artwork> - The removed artwork.
     * @throws NotFoundException - If no artwork is found with the given ID.
     */
    async remove(id: string): Promise<Artwork> {
        const artwork: Artwork = await this.findOne(id);
        await artwork.destroy();
        return artwork
    }
}
