import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const removeUser = createAsyncThunk('users/remove', async (user) => {


    await axios.delete(`http://localhost:3010/users/${user.id}`);
    // const response = await axios.delete(`http://localhost:3010/users/${user.id}`);
    // We have to fix this response.data (not particularly this becuase it is sent into the slice), because it will return an empty object
    // so we don't get any information about the deleted object. So instead of returning response.data, we will return the user 
    // object that is passed in the arguments. And if there is some error thunk will handle it for us in rejected action automatically.
    // And because of that we will no longer need the response variable
    // return response.data;

    return user;

});


export { removeUser };