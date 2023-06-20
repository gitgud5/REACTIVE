import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const photosAPI = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3010"
    }),
    endpoints(builder) {
        return {
            fetchPhotos: builder.query({
                // builder.query because it is a read request
                providesTags: (result, error, album) => {
                    const tags = result.map((photo) => {
                        return { type: "Photo", id: photo.id }
                    });
                    tags.push({ type: "AlbumPhoto", id: album.id });
                    return tags;
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        params: {
                            albumId: album.id,
                        },
                        method: "GET",
                    }
                }
            }),
            addPhoto: builder.mutation({
                // builder.mutation because it is a POST request, that is a write request
                invalidatesTags: (result, error, album) => {
                    return [{ type: "AlbumPhoto", id: album.id }]
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        method: "POST",
                        body: {
                            albumId: album.id,
                            url: faker.image.url(150, 150, true)
                        }
                    }
                }
            }),
            removePhoto: builder.mutation({
                // builder.mutation because it is a DELETE request, that is a kind of request that is doing changing in the server
                invalidatesTags: (result, error, photo) => {
                    return [{ type: "Photo", id: photo.id }]
                },
                query: (photo) => {
                    return {
                        method: "DELETE",
                        url: `/photos/${photo.id}`
                    }
                }
            })
        }
    }
});


export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosAPI;
export { photosAPI };