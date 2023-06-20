import { fakerRU as faker } from '@faker-js/faker';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


//For DEV only
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
};



const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3010/',
        // Here we are writing a fetch function that will be called on every request, 
        // as we know that RTK query use "fetch" to get data from the URL
        // This fetchFn is for DEV purposes, and remove it for production
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);

        }
    }),
    endpoints(builder) {
        return {
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {


                    // This is the easy solution because luckily we have a userId 
                    // inside of our album object
                    // console.log(album)
                    // return [{ type: "Album", id: album.userId }]

                    // Now here we will invalidate the tag so the above statement will change accordingly
                    return [{ type: "Album", id: album.id }]


                },
                query: (album) => {
                    return {
                        method: "DELETE", url: `/albums/${album.id}`
                    }
                }
            }),
            addAlbum: builder.mutation({
                // Remember the third argument is the argument that we provide inside the hook.
                // In this case it is user, but in documentation it is called "arg"
                invalidatesTags: (result, error, user) => {
                    // return [{ type: "Album", id: user.id }]

                    // Now here we will invalidate the tag so the above statement will change accordingly
                    return [{ type: "UsersAlbum", id: user.id }]
                },
                query: (user) => {
                    return {
                        url: "/albums",
                        method: "POST",
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
                        }
                    }
                }
            }),
            fetchAlbums: builder.query({
                // Remember the third argument is the argument that we provide inside the hook.
                // In this case it is user, but in documentation it is called arg
                providesTags: (result, error, user) => {
                    // This statement depends on the userId, and if we don't have userID then we have to get clever with the tags
                    // return [{ type: "Album", id: user.id }]

                    // here is where we are getting clever with tags
                    const tags = result.map(album => {
                        return { type: 'Album', id: album.id }
                    });
                    tags.push({ type: 'UsersAlbum', id: user.id });
                    return tags;


                },
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id
                        },
                        method: "GET",
                    };
                }
            })
        }
    }
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi }