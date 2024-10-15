import {createSlice} from "@reduxjs/toolkit";

export const shopItemSlice = createSlice({
    name: 'shopItem',
    initialState: [],
    reducers:{
        setInput(state, action){
            const {index, key, value} = action.payload;
            state[index].input[key] = value;
            return state;
        },
        setError(state, action){
            const {index, key, value} = action.payload;
            state[index].error[key] = value;
            return state;
        },
        addItem(state){
          state.push({})
          return state;
        },
        deleteItem(state, action){
            const index = action.payload;
            state.splice(index, 1);
            return state;
        }
    }
})

export const shopItemReducer = shopItemSlice.reducer;
export const shopItemActions = shopItemSlice.actions;