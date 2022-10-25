import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import routes from "../helpers/routes";

const setActiveHelper = (state, id) => state.activeChannelId = id;

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
    activeChannelId: 1,
};


//TODO
// После срабатывания getChannels нужно передавать редьюсер setActiveChannel

const channelsSlice = createSlice({
    name:'channels',
    initialState,
    reducers: {
        getMessage(state, {payload}) {
            state.messages.push(payload);
        },
        getChannels(state, {payload}) {
            state.channels.push(payload);
            setActiveHelper(state, payload.id)
        },
        deleteChannel(state, {payload}) {
            const channelId = Number(payload.id);
            state.channels = state.channels.filter(item => item.id !== channelId);
            state.messages = state.messages.filter(item => item.channelId !== channelId);
            setActiveHelper(state, 1)
        },
        setActiveChannel(state, {payload}) {
                const activeChannelIds = state.channels.filter(item => item.id === payload);
                if(!activeChannelIds.length) {
                    state.activeChannelId = 1;
                    return;
                }
            state.activeChannelId = payload;
        },
        renameLocalChannel(state, {payload}) {
            const channelId = Number(payload.id);
            state.channels = state.channels.map(item => {
                if (item.id !== channelId) return item;
                return  {
                    ...item,
                    name: payload.name
                }
            })
    },
},
    extraReducers: (builder) => {
        builder.addCase(fetchChannels.fulfilled, (state, action) => {
                const { channels, messages } = action.payload;
                state.channels = channels;
                state.messages = messages;
        })
    }
});
export const { getMessage, setActiveChannel, getChannels, deleteChannel, renameLocalChannel } = channelsSlice.actions;
export default channelsSlice.reducer;