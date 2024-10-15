import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    phone: null,
    secondDevice: null
}

const gmdSlice = createSlice({
    name: 'gmd',
    initialState,
    reducers: {
        setData: (state, action)=>{
            console.log('ㅇㄴㅁ')
            const {key, data} = action.payload;
            const copy = {...state};
            copy[key] = data;
            console.table(copy)
            return copy;
        }
    }
});

export const gmdReducer = gmdSlice.reducer;
export const gmdActions = gmdSlice.actions;

