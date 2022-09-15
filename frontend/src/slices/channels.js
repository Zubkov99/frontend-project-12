import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChannels = createAsyncThunk(
    'channels/fetchChannels',
    async (token) => {
        const response = await axios.get('/api/v1/data', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data
    }
)

const initialState = {
    channels: [],
    messages: [],
};

const channelsSlice = createSlice({
    name:'channels',
    initialState,
    extraReducers: (builder) => {
        builder.
            addCase(fetchChannels.fulfilled, (state, action) => {
                const { channels, messages }= action.payload;
                state.channels = channels;
                state.messages = messages;
        })
    }
});

export default channelsSlice.reducer;