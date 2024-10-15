import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: null,
    role: null,
    nickname: null,
    tel: null,
    email: null,
    pfp: null,
    corp_nm: null,
    shop_nm: null,
    shop_addr: null,
}

export const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers:{
        setUserInfo: (state, action)=>{
            state = action.payload;
            return state;
        },
        deleteUserInfo: (state)=>{
            state = initialState;
            return state;
        }
    }
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;