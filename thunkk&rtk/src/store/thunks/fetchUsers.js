import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// The string that we write here is a base string and thunk automatically
// attaches '/fulfilled' or '/pending' or '/rejected', you know to call to action reducer
const fetchUsers = createAsyncThunk('users/fetch', async () => {

    const response = await axios.get("http://localhost:3010/users");


    //DEV Only, remove it for production or if you just wanna do testing fast
    await pause(1500);


    return response.data;

});


//For DEV only
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
}


export { fetchUsers };

