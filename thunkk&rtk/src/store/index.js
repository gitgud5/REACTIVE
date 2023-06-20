import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { albumsApi } from "./apis/albumsAPI";
import {  photosAPI } from "./apis/photosAPI";


export const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photosAPI.reducerPath]: photosAPI.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(albumsApi.middleware)
            .concat(photosAPI.middleware);
    }
});

setupListeners(store.dispatch);


export * from './thunks/fetchUsers';
export * from './thunks/addUsers';
export * from './thunks/removeUser';

export { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } from './apis/photosAPI';
export { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } from './apis/albumsAPI';