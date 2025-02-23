import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';

import { Artwork } from '../models/artwork.model';
import { ArtworksService } from '../artworks/artworks.service';
import { CreateArtworkDto } from '../artworks/dto/createArtwork.dto';
import { QueryArtworksDto } from '../artworks/dto/queryArtworks.dto';
import { UpdateArtworkDto } from '../artworks/dto/updateArtwork.dto';
import { IArtwork } from '../interfaces/IArtwork.interface';


describe('ArtworksService', (): void => {
    let service: ArtworksService;
    let model: typeof Artwork;

    beforeEach(async (): Promise<void> => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ArtworksService,
                {
                    provide: getModelToken(Artwork),
                    useValue: {
                        findAll: jest.fn().mockResolvedValue([
                            { id: 1, title: 'Artwork 1', artist: 'Artist 1', price: 100, type: 'painting' },
                            { id: 2, title: 'Artwork 2', artist: 'Artist 2', price: 150, type: 'sculpture' },
                        ]),
                        findByPk: jest.fn().mockResolvedValue(
                            { id: 1, title: 'Artwork 1', artist: 'Artist 1', price: 100, type: 'painting' }),
                        create: jest.fn().mockResolvedValue(
                            { id: 3, title: 'Artwork 3', artist: 'Artist 3', price: 200, type: 'drawing' }),
                        update: jest.fn().mockResolvedValue([1]),
                        destroy: jest.fn().mockResolvedValue(undefined),
                    },
                },
            ],
        }).compile();
        service = module.get<ArtworksService>(ArtworksService);
        model = module.get(getModelToken(Artwork));
    });

    it('should return an array of artworks', async (): Promise<void> => {
        const artworks: Artwork[] = await service.findAll({});
        expect(artworks).toEqual([
            { id: 1, title: 'Artwork 1', artist: 'Artist 1', price: 100, type: 'painting' },
            { id: 2, title: 'Artwork 2', artist: 'Artist 2', price: 150, type: 'sculpture' },
        ]);
    });

    it('should return an artwork by id', async (): Promise<void> => {
        const artwork: Artwork = await service.findOne('1');
        expect(artwork).toEqual(
            { id: 1, title: 'Artwork 1', artist: 'Artist 1', price: 100, type: 'painting' });
    });

    it('should throw an error if artwork not found for findOne', async (): Promise<void> => {
        const id: string = '999';
        jest.spyOn(model, 'findByPk').mockResolvedValue(null);

        await expect(service.findOne(id)).rejects.toThrowError(NotFoundException);
    });

    it('should create an artwork', async (): Promise<void> => {
        const createArtworkDto: CreateArtworkDto =
            { title: 'Artwork 3', artist: 'Artist 3', price: 200, type: 'painting' };
        const newArtwork = { id: 3, ...createArtworkDto };

        jest.spyOn(model, 'create').mockResolvedValue(newArtwork as any);

        const createdArtwork: IArtwork = await service.create(createArtworkDto);
        expect(createdArtwork).toEqual(newArtwork);
    });

    it('should update an artwork', async (): Promise<void> => {
        const id: string = '1';
        const updateArtworkDto: UpdateArtworkDto = { title: 'Updated Artwork 1', price: 150 };
        const updatedArtwork =
            { id, title: 'Updated Artwork 1', artist: 'Artist 1', price: 150, type: 'painting' };

        const artworkMock = {
            ...updatedArtwork,
            update: jest.fn().mockResolvedValue(updatedArtwork),
        };

        jest.spyOn(service, 'findOne').mockResolvedValue(artworkMock as any);

        const result: Artwork = await service.update(id, updateArtworkDto);
        expect(result.title).toBe('Updated Artwork 1');
        expect(result.price).toBe(150);
        expect(artworkMock.update).toHaveBeenCalledWith(updateArtworkDto);
    });

    it('should remove an artwork', async (): Promise<void> => {
        const id: string = '1';
        const artworkToRemove =
            { id, title: 'Artwork 1', artist: 'Artist 1', price: 100, type: 'painting' };

        const artworkMock = {
            ...artworkToRemove,
            destroy: jest.fn().mockResolvedValue(undefined),
        };

        jest.spyOn(service, 'findOne').mockResolvedValue(artworkMock as any);

        await service.remove(id);
        expect(artworkMock.destroy).toHaveBeenCalled();
    });

    it('should return filtered artworks by price and artist', async (): Promise<void> => {
        const query: QueryArtworksDto = { price: 'ASC', artist: 'Artist 1' };
        const filteredArtworks = [
            { id: 1, title: 'Artwork 1', artist: 'Artist 1', price: 100, type: 'painting' },
        ];

        jest.spyOn(model, 'findAll').mockResolvedValue(filteredArtworks as any);

        const artworks: Artwork[] = await service.findAll(query);
        expect(artworks).toEqual(filteredArtworks);
    });
});
