import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import routes from "../helpers/routes";
import _ from "lodash";

const setActiveHelper = (state, data) => {
    state.channels = state.channels.map(item => {
        if (item.id === data) return {
            ...item,
            active: true
        };
        return {
            ...item,
            active: false
        }
    });
}

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


//TODO
// После срабатывания getChannels нужно передавать редьюсер setActiveChannel

const channelsSlice = createSlice({
    name:'channels',
    initialState,
    reducers: {
        getMessage(state, {payload}) {
            state.messages.push(payload);
        },
        setActiveChannel(state, {payload}) {
            const activeChannelIds = state.channels.filter(item => item.id === payload);
            if(!activeChannelIds.length) {
                setActiveHelper(state, 1)
                return;
            }
            setActiveHelper(state, payload)
        },
        getChannels(state, {payload}) {
            state.channels.push(payload);
            setActiveHelper(state, payload.id)
        },
        deleteChannel(state, {payload}) {
            const channelId = Number(payload.id);
            state.channels = state.channels.filter((item) => item.id !== channelId);
            setActiveHelper(state, 1)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChannels.fulfilled, (state, action) => {
                const { channels, messages } = action.payload;
                state.channels = channels.map(item => item.id === 1 ? {...item, active: true} : item);
                state.messages = messages;
        })
    }
});
export const { getMessage, setActiveChannel, getChannels, deleteChannel } = channelsSlice.actions;
export default channelsSlice.reducer;