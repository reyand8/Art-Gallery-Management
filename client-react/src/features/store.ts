import { configureStore } from '@reduxjs/toolkit';

import artworkSlice from './artwork/artworkSlice/artworkSlice';


const store = configureStore({
    reducer: {
        artworks: artworkSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;