import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';

import { ArtworksService } from './artworks.service';
import { CreateArtworkDto } from './dto/createArtwork.dto';
import { UpdateArtworkDto } from './dto/updateArtwork.dto';
import { QueryArtworksDto } from './dto/queryArtworks.dto';
import { IArtwork } from '../interfaces/IArtwork';


@Controller('artworks')
export class ArtworksController {
    constructor(private readonly artworksService: ArtworksService) {}

    @Get()
    findAll(@Query() query: QueryArtworksDto): Promise<IArtwork[]> {
        return this.artworksService.findAll(query);
    }

    @Post()
    create(@Body() createArtworkDto: CreateArtworkDto): Promise<IArtwork> {
        console.log(createArtworkDto)
        return this.artworksService.create(createArtworkDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<IArtwork> {
        return this.artworksService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string,
           @Body() updateArtworkDto: UpdateArtworkDto): Promise<IArtwork> {
        return this.artworksService.update(id, updateArtworkDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.artworksService.remove(id);
    }
}
