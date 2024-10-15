import {Cookies} from "react-cookie";

const cookies = new Cookies();

export const setRefreshToken = (refreshToken, time: Number)=>{
    const expireTime = new Date();
    expireTime.setTime(expireTime.getTime()+Number(time))

    return cookies.set('refresh_token', refreshToken, {
        sameSite: 'strict',
        path: '/',
        expires: expireTime
    })
};

export const getRefreshToken = ()=>{
    return cookies.get('refresh_token');
}

export const removeRefreshToken = ()=>{
    return cookies.remove('refresh_token',{
        sameSite: 'strict',
        path: '/'
    })
}

export const getAutoLogin = ()=>{
    return cookies.get("auto_login");
}

export const setAutoLogin = ()=>{
    const expireTime = new Date()
    expireTime.setDate(expireTime.getDate()+7);
    return cookies.set("auto_login", true, {
        sameSite: 'strict',
        path: '/',
        expires: expireTime
    })
}

export const removeAutoLogin = ()=>{
    console.log('remove')
    return cookies.remove("auto_login", {
        sameSite: 'strict',
        path: '/'
    })
}