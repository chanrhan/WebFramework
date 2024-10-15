import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRefreshToken, removeRefreshToken, setRefreshToken} from "./Cookies";
import {authActions} from "../store/slices/authSlice";
import {requestAccessToken} from "../api/Auth";
import useApi from "../hook/useApi";

//

export function CheckToken(key){
    const [isAuth, setIsAuth] = useState('Loading');
    const {authenticated, accessToken, expireTime} = useSelector(state=>state.authReducer);
    const refreshToken = getRefreshToken();
    const dispatch = useDispatch();

    const checkAuthToken = async ()=> {
        if (refreshToken === undefined) {
            dispatch(authActions.delAccessToken());
            setIsAuth('Failed');
        } else {
            if (authenticated && new Date().getTime() < expireTime) {
                setIsAuth('Success');
            } else {
                const response = await requestAccessToken(refreshToken);

                if (response.status === 200) {
                    // const token = response.jwtToken.access_token;
                    // console.log(`new access token: ${response.jwt.access_token}`)
                    dispatch(authActions.setAccessToken(response.jwt.access_token))
                    // setRefreshToken(response.jwt.refresh_token);
                    setIsAuth('Success')
                } else {
                    dispatch(authActions.delAccessToken());
                    removeRefreshToken();
                    setIsAuth('Failed');
                }
            }
        }
    };

    useEffect(()=>{
        // console.log(`Check Token -> ${key}`)
        // console.log(`authenticated ${authenticated}, expireTime: ${expireTime}`)

        checkAuthToken();
    }, [refreshToken, dispatch, key]);

    return {
        isAuth
    }
}
