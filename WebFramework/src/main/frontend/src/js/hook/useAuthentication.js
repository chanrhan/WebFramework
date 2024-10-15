import useApi from "./useApi";
import {removeRefreshToken, setRefreshToken} from "../utils/Cookies";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../store/slices/authSlice";
import {ModalType} from "../common/modal/ModalType";
import {useEffect} from "react";
import {userActions} from "../store/slices/userSlice";

export const useAuthentication = ()=>{
    const {publicApi} = useApi();
    const dispatch = useDispatch();

    const login = async (data)=>{
        let rst = null;
        await publicApi.login(data).then((res)=>{
            // console.table(res)
            rst = (res.status === 200)
            if(res.status === 200){
                if(res.data){

                }
                const accessToken = res.headers.get('authorization')
                const refreshtoken = res.headers.get('refreshtoken');
                const refreshexpiretime = res.headers.get('refreshexpiretime');
                // console.log(`r e t : ${refreshexpiretime / 1000 / 60}`)
                dispatch(authActions.setAccessToken(accessToken));
                setRefreshToken(refreshtoken, refreshexpiretime);
            }
        })
        // console.log(`rst: ${rst}`)
        return rst;
    }

    const logout = ()=>{
        const refreshToken = localStorage.getItem('refresh_token')
        console.log('logout')
        localStorage.removeItem('authorization') // 웹페이지 Accesstoekn 쿠키 제거
        removeRefreshToken() // 웹페이지 Refresh 쿠키 제거
        dispatch(authActions.clear()) // 리액트 내장 변수 제거

        dispatch(userActions.deleteUserInfo())
        publicApi.logout(refreshToken);
    }


    return {
        login,
        logout
    }
}