import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import routes from "../helpers/routes";

export const fetchChannels = createAsyncThunk(
    'channels/fetchChannels',
    async (token) => {
        const response = await axios.get(routes.usersPath(), {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data
    }
);

const initialState = {
    channels: [],
    messages: [],
};

const channelsSlice = createSlice({
    name:'channels',
    initialState,
    reducers: {
        sendMessage(state, {payload}) {
            state.messages.push(payload);
        },
        setActiveChannel(state, {payload}) {
            state.channels = state.channels.map(item => {
                if (item.id === payload) return {
                    ...item,
                    active: true
                };
                return {
                    ...item,
                    active: false
                }
            });
        }
    },
    extraReducers: (builder) => {
        builder.
            addCase(fetchChannels.fulfilled, (state, action) => {
                const { channels, messages } = action.payload;

                state.channels = channels.map(item => item.id === 1 ? {...item, active: true} : item);
                state.messages = messages;
        })
    }
});
export const { sendMessage, setActiveChannel } = channelsSlice.actions;
export default channelsSlice.reducer;