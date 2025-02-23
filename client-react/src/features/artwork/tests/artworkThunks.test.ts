import {
    fetchArtworks, createArtwork,
    getArtwork, updateArtwork, deleteArtwork } from '../artworkApi/artworkApi';
import {
    fetchArtworksThunk, createArtworkThunk,
    getArtworkThunk, updateArtworkThunk,
    deleteArtworkThunk } from '../artworkThunks/artworkThunks';
import { IArtwork, ICreateArtwork, IUpdateArtwork } from '../../../interfaces/IArtwork.interface';


jest.mock('../artworkApi/artworkApi', () => ({
    fetchArtworks: jest.fn(),
    createArtwork: jest.fn(),
    getArtwork: jest.fn(),
    updateArtwork: jest.fn(),
    deleteArtwork: jest.fn(),
    handleAxiosError: jest.fn((error) => ({
        message: error.message,
        statusCode: 500,
    })),
}));


describe('Artworks Thunks', (): void => {
    const mockDate = new Date(2025, 0, 1);

    beforeEach((): void => {
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate as unknown as Date);
    });

    afterEach((): void => {
        jest.clearAllMocks();
    });

    test('should dispatch fulfilled action for fetchArtworksThunk', async (): Promise<void> => {
        const mockData: IArtwork[] = [
            {
                id: '1',
                title: 'Artwork 1',
                artist: 'Artist 1',
                type: 'painting',
                price: 100,
                availability: true,
                createdAt: mockDate,
                updatedAt: mockDate,
            }
        ];
        (fetchArtworks as jest.Mock).mockResolvedValueOnce({ data: mockData });

        const dispatch = jest.fn();
        const getState = jest.fn();

        await fetchArtworksThunk({})(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: fetchArtworksThunk.pending.type,
            meta: expect.objectContaining({
                arg: {},
                requestStatus: 'pending',
            }),
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: fetchArtworksThunk.fulfilled.type,
            payload: mockData,
            meta: expect.objectContaining({
                arg: {},
                requestStatus: 'fulfilled',
            }),
        });
    });

    test('should dispatch rejected action for fetchArtworksThunk on error', async (): Promise<void> => {
        const errorMessage: string = 'Error fetching artworks';
        (fetchArtworks as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        const dispatch = jest.fn();
        const getState = jest.fn();

        await fetchArtworksThunk({})(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: fetchArtworksThunk.pending.type,
            meta: expect.objectContaining({
                arg: {},
                requestStatus: 'pending',
            }),
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: fetchArtworksThunk.rejected.type,
            payload: { message: errorMessage, statusCode: 500 },
            error: { message: 'Rejected' },
            meta: expect.objectContaining({
                arg: {},
                requestStatus: 'rejected',
                rejectedWithValue: true,
                aborted: false,
                condition: false,
            }),
        });
    });

    test('should dispatch fulfilled action for createArtworkThunk', async (): Promise<void> => {
        const artworkData: ICreateArtwork = {
            title: 'New Artwork',
            artist: 'Artist 1',
            type: 'painting',
            price: 200,
            availability: true,
        };
        const createdArtwork = { ...artworkData, id: '2', createdAt: mockDate, updatedAt: mockDate };
        (createArtwork as jest.Mock).mockResolvedValueOnce({ data: createdArtwork });

        const dispatch = jest.fn();
        const getState = jest.fn();

        await createArtworkThunk(artworkData)(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: createArtworkThunk.pending.type,
            meta: expect.objectContaining({
                arg: artworkData,
                requestStatus: 'pending',
            }),
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: createArtworkThunk.fulfilled.type,
            payload: createdArtwork,
            meta: expect.objectContaining({
                arg: artworkData,
                requestStatus: 'fulfilled',
            }),
        });
    });

    test('should dispatch rejected action for createArtworkThunk on error', async (): Promise<void> => {
        const errorMessage: string = 'Error creating artwork';
        (createArtwork as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        const dispatch = jest.fn();
        const getState = jest.fn();

        await createArtworkThunk({
            title: 'New Artwork',
            artist: 'Artist 1',
            type: 'painting',
            price: 200,
        })(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: createArtworkThunk.pending.type,
            meta: expect.objectContaining({
                arg: {
                    title: 'New Artwork',
                    artist: 'Artist 1',
                    type: 'painting',
                    price: 200,
                },
                requestStatus: 'pending',
            }),
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: createArtworkThunk.rejected.type,
            payload: { message: errorMessage, statusCode: 500 },
            error: { message: 'Rejected' },
            meta: expect.objectContaining({
                arg: {
                    title: 'New Artwork',
                    artist: 'Artist 1',
                    type: 'painting',
                    price: 200,
                },
                requestStatus: 'rejected',
                rejectedWithValue: true,
                aborted: false,
                condition: false,
            }),
        });
    });

    test('should dispatch fulfilled action for getArtworkThunk', async (): Promise<void> => {
        const mockArtwork: IArtwork = {
            id: '1',
            title: 'Artwork 1',
            artist: 'Artist 1',
            type: 'painting',
            price: 100,
            availability: true,
            createdAt: mockDate,
            updatedAt: mockDate,
        };
        (getArtwork as jest.Mock).mockResolvedValueOnce({ data: mockArtwork });

        const dispatch = jest.fn();
        const getState = jest.fn();

        await getArtworkThunk('1')(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: getArtworkThunk.pending.type,
            meta: expect.objectContaining({
                arg: '1',
                requestStatus: 'pending',
            }),
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: getArtworkThunk.fulfilled.type,
            payload: mockArtwork,
            meta: expect.objectContaining({
                arg: '1',
                requestStatus: 'fulfilled',
            }),
        });
    });

    test('should dispatch rejected action for getArtworkThunk on error', async (): Promise<void> => {
        const errorMessage: string = 'Error fetching artwork';
        (getArtwork as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        const dispatch = jest.fn();
        const getState = jest.fn();

        await getArtworkThunk('1')(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: getArtworkThunk.pending.type,
            meta: expect.objectContaining({
                arg: '1',
                requestStatus: 'pending',
            }),
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: getArtworkThunk.rejected.type,
            payload: { message: errorMessage, statusCode: 500 },
            error: { message: 'Rejected' },
            meta: expect.objectContaining({
                arg: '1',
                requestStatus: 'rejected',
                rejectedWithValue: true,
                aborted: false,
                condition: false,
            }),
        });
    });

    test('should dispatch fulfilled action for updateArtworkThunk', async (): Promise<void> => {
        const updatedArtwork: IUpdateArtwork = {
            title: 'Updated Artwork',
            artist: 'New Artist',
            type: 'sculpture',
            price: 150,
            availability: false,
        };
        const updatedData = { ...updatedArtwork, id: '1', createdAt: mockDate, updatedAt: mockDate };
        (updateArtwork as jest.Mock).mockResolvedValueOnce({ data: updatedData });

        const dispatch = jest.fn();
        const getState = jest.fn();

        await updateArtworkThunk({ id: '1', updatedData })(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: updateArtworkThunk.pending.type,
            meta: expect.objectContaining({
                arg: { id: '1', updatedData },
                requestStatus: 'pending',
            }),
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: updateArtworkThunk.fulfilled.type,
            payload: updatedData,
            meta: expect.objectContaining({
                arg: { id: '1', updatedData },
                requestStatus: 'fulfilled',
            }),
        });
    });

    test('should dispatch fulfilled action for deleteArtworkThunk', async (): Promise<void> => {
        const artworkId: string = '1';
        (deleteArtwork as jest.Mock).mockResolvedValueOnce({});

        const dispatch = jest.fn();
        const getState = jest.fn();

        await deleteArtworkThunk(artworkId)(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: deleteArtworkThunk.pending.type,
            meta: expect.objectContaining({
                arg: artworkId,
                requestStatus: 'pending',
            }),
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: deleteArtworkThunk.fulfilled.type,
            payload: { id: artworkId },
            meta: expect.objectContaining({
                arg: artworkId,
                requestStatus: 'fulfilled',
            }),
        });
    });
});