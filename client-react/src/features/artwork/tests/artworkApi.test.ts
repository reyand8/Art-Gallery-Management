import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { ICreateArtwork, IUpdateArtwork } from '../../../interfaces/IArtwork.interface';

const mock = new MockAdapter(axios);


describe('Artwork API', (): void => {
    beforeEach((): void => {
        mock.onGet('/artworks').reply(200, [
            {
                id: '1',
                title: 'Artwork 1',
                artist: 'Artist 1',
                type: 'painting',
                price: 100,
                availability: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: '2',
                title: 'Artwork 2',
                artist: 'Artist 2',
                type: 'sculpture',
                price: 200,
                availability: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
        ]);
    });

    afterEach((): void  => {
        mock.reset();
    });

    test('fetchArtworks should return data', async () => {
        const response = await axios.get('/artworks');
        expect(response.status).toBe(200);
        expect(response.data).toEqual([
            {
                id: '1',
                title: 'Artwork 1',
                artist: 'Artist 1',
                type: 'painting',
                price: 100,
                availability: true,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            {
                id: '2',
                title: 'Artwork 2',
                artist: 'Artist 2',
                type: 'sculpture',
                price: 200,
                availability: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
        ]);
    });

    test('createArtwork should send data and return result', async (): Promise<void> => {
        const newArtwork: ICreateArtwork = {
            title: 'New Artwork',
            artist: 'New Artist',
            type: 'painting',
            price: 300
        };

        mock.onPost('/artworks', newArtwork).reply(201, {
            id: '3',
            ...newArtwork,
            availability: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        const response = await axios.post('/artworks', newArtwork);
        expect(response.status).toBe(201);
        expect(response.data).toEqual({
            id: '3',
            title: 'New Artwork',
            artist: 'New Artist',
            type: 'painting',
            price: 300,
            availability: true,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        });
    });

    test('updateArtwork should update data and return result', async (): Promise<void>  => {
        const updatedArtwork: IUpdateArtwork = {
            title: 'Updated Artwork',
            artist: 'Updated Artist',
            type: 'sculpture',
            price: 500
        };

        mock.onPut('/artworks/1', updatedArtwork).reply(200, {
            id: '1',
            ...updatedArtwork,
            availability: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        const response = await axios.put('/artworks/1', updatedArtwork);
        expect(response.status).toBe(200);
        expect(response.data).toEqual({
            id: '1',
            title: 'Updated Artwork',
            artist: 'Updated Artist',
            type: 'sculpture',
            price: 500,
            availability: true,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        });
    });

    test('getArtwork should return data by ID', async (): Promise<void>  => {
        mock.onGet('/artworks/1').reply(200, {
            id: '1',
            title: 'Artwork 1',
            artist: 'Artist 1',
            type: 'painting',
            price: 100,
            availability: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        const response = await axios.get('/artworks/1');
        expect(response.status).toBe(200);
        expect(response.data).toEqual({
            id: '1',
            title: 'Artwork 1',
            artist: 'Artist 1',
            type: 'painting',
            price: 100,
            availability: true,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        });
    });

    test('deleteArtwork should delete data', async (): Promise<void>  => {
        mock.onDelete('/artworks/1').reply(200);

        const response = await axios.delete('/artworks/1');
        expect(response.status).toBe(200);
    });
});
