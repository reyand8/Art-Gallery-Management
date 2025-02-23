import { Test, TestingModule } from '@nestjs/testing';

import { ArtworksController } from '../artworks/artworks.controller';
import { ArtworksService } from '../artworks/artworks.service';
import { IArtwork } from '../interfaces/IArtwork.interface';
import { CreateArtworkDto } from '../artworks/dto/createArtwork.dto';
import { UpdateArtworkDto } from '../artworks/dto/updateArtwork.dto';


describe('ArtworksController', (): void => {
    let controller: ArtworksController;
    let service: ArtworksService;

    const mockArtwork: IArtwork = {
        title: 'Mock Artwork',
        artist: 'Mock Artist',
        type: 'painting',
        price: 1000,
    };

    const mockService = {
        findAll: jest.fn().mockResolvedValue([mockArtwork]),
        findOne: jest.fn().mockResolvedValue(mockArtwork),
        create: jest.fn().mockResolvedValue(mockArtwork),
        update: jest.fn().mockResolvedValue(mockArtwork),
        remove: jest.fn().mockResolvedValue(undefined),
    };

    beforeEach(async (): Promise<void> => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ArtworksController],
            providers: [
                {
                    provide: ArtworksService,
                    useValue: mockService,
                },
            ],
        }).compile();

        controller = module.get<ArtworksController>(ArtworksController);
        service = module.get<ArtworksService>(ArtworksService);
    });

    it('should be defined', (): void => {
        expect(controller).toBeDefined();
    });

    it('should return all artworks', async (): Promise<void> => {
        const result: IArtwork[]  = await controller.findAll({});
        expect(result).toEqual([mockArtwork]);
        expect(service.findAll).toHaveBeenCalledWith({});
    });

    it('should return one artwork', async (): Promise<void> => {
        const result: IArtwork  = await controller.findOne('1');
        expect(result).toEqual(mockArtwork);
        expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should create an artwork', async (): Promise<void> => {
        const createArtworkDto: CreateArtworkDto = {
            title: 'New Artwork',
            artist: 'New Artist',
            type: 'sculpture',
            price: 1500,
        };
        const result: IArtwork  = await controller.create(createArtworkDto);
        expect(result).toEqual(mockArtwork);
        expect(service.create).toHaveBeenCalledWith(createArtworkDto);
    });

    it('should update an artwork', async (): Promise<void> => {
        const updateArtworkDto: UpdateArtworkDto = {
            title: 'Updated Artwork',
        };
        const result: IArtwork = await controller.update('1', updateArtworkDto);
        expect(result).toEqual(mockArtwork);
        expect(service.update).toHaveBeenCalledWith('1', updateArtworkDto);
    });

    it('should remove an artwork', async (): Promise<void> => {
        const result: void = await controller.remove('1');
        expect(result).toBeUndefined();
        expect(service.remove).toHaveBeenCalledWith('1');
    });
});
