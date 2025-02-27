import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';

import { ArtworksService } from './artworks.service';
import { CreateArtworkDto } from './dto/createArtwork.dto';
import { UpdateArtworkDto } from './dto/updateArtwork.dto';
import { QueryArtworksDto } from './dto/queryArtworks.dto';
import { IArtwork } from '../interfaces/IArtwork.interface';


@Controller('artworks')
export class ArtworksController {
    constructor(private readonly artworksService: ArtworksService) {}

    /**
     * GET /artworks
     * Retrieves a list of artworks with optional filters.
     * @param query - Query parameters for filtering artworks.
     * @returns Promise<IArtwork[]> - List of artworks.
     */
    @Get()
    findAll(@Query() query: QueryArtworksDto): Promise<IArtwork[]> {
        return this.artworksService.findAll(query);
    }

    /**
     * POST /artworks
     * Creates a new artwork.
     * @param createArtworkDto - Data for the new artwork.
     * @returns Promise<IArtwork> - The created artwork.
     */
    @Post()
    create(@Body() createArtworkDto: CreateArtworkDto): Promise<IArtwork> {
        return this.artworksService.create(createArtworkDto);
    }

    /**
     * GET /artworks/:id
     * Retrieves a specific artwork by its ID.
     * @param id - ID of the artwork.
     * @returns Promise<IArtwork> - The requested artwork.
     */
    @Get(':id')
    findOne(@Param('id') id: string): Promise<IArtwork> {
        return this.artworksService.findOne(id);
    }

    /**
     * PUT /artworks/:id
     * Updates an existing artwork by its ID.
     * @param id - ID of the artwork to update.
     * @param updateArtworkDto - Data for updating the artwork.
     * @returns Promise<IArtwork> - The updated artwork.
     */
    @Put(':id')
    update(@Param('id') id: string,
           @Body() updateArtworkDto: UpdateArtworkDto): Promise<IArtwork> {
        return this.artworksService.update(id, updateArtworkDto);
    }

    /**
     * DELETE /artworks/:id
     * Removes an artwork by its ID.
     * @param id - ID of the artwork to remove.
     * @returns Promise<IArtwork> - The removed artwork.
     */
    @Delete(':id')
    remove(@Param('id') id: string): Promise<IArtwork> {
        return this.artworksService.remove(id);
    }
}
