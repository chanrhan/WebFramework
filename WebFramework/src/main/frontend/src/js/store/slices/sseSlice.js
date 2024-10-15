import {createSlice} from "@reduxjs/toolkit";

export const sseSlice = createSlice({
    name: 'sse',
    initialState: {
        sse: null
    },
    reducers:{
        setEventSource: (state, action)=>{
            state.sse = action.payload;
        },
        addEventListener: (state, action)=>{
            if(state.sse !== null){
                const {type, callback} = action.payload;
                state.sse.addEventListener(type, callback);
            }
        },
        removeEventListener: (state,action)=>{
            if(state.sse !== null){

            }
        }
    }
});

export const sseReducer = sseSlice.reducer;
export const sseActions = sseSlice.actions;