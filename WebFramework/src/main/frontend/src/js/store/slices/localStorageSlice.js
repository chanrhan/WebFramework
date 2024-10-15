import {createSlice} from "@reduxjs/toolkit";

export const localSlice = createSlice({
    name: 'local_storage',
    initialState: {
        unreadNotif: 0
    },
    reducers:{
        updateUnreadNotif: (state, action)=>{
            state.unreadNote = action.payload;
        }
    }
});

export const localReducer = localSlice.reducer;
export const localActions = localSlice.actions;