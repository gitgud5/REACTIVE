import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUsers";
import { removeUser } from "../thunks/removeUser";




const usersSlice = createSlice({
    name: "users",
    initialState: {
        isLoading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        // fetchUsers.pending gives the string address for the action
        // console.log it for getting clear concept
        builder.addCase(fetchUsers.pending, (state, action) => {
            // Update our state object however appropriate
            // to show the user when we are loading data
            state.isLoading = true;

        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(addUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);

        });
        builder.addCase(addUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;

        });
        builder.addCase(removeUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(removeUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(removeUser.fulfilled, (state, action) => {
            state.isLoading = false;
            // There is a very common bug here and that is shown in the removeUser thunk.
            // Also it's fix is shown
            state.data = state.data.filter(user => {
                return user.id !== action.payload.id;
            });

        });

    }
});



export const usersReducer = usersSlice.reducer;