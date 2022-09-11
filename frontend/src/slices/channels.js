import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChannels = createAsyncThunk(
    'channels/fetchChannels',
    async (token) => {
        const response = await axios.get('/api/v1/data', {
            headers: {
                'Authorization': token,
            }
        });
        return response.data
    }
)

const initialState = {
    content: [],
};

const channelsSlice = createSlice({
    name:'channels',
    initialState,
    extraReducers: (builder) => {
        builder.
            addCase(fetchChannels.fulfilled, (state, action) => {
                state.content = action.payload;
        })
    }
});

export default channelsSlice.reducer;