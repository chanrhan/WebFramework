import axiosInstance from "../utils/axiosInstance";
import {useSelector} from "react-redux";

const TIME_OUT = 300 * 1000;

const statusError = {
    status: false,
    json: {
        error: ["연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요"]
    }
}

// React Function Component 에서만 useState, useEffect, useSelector 등을 사용할 수 있음
// const getAccessToken = ()=>{
//     let {accessToken} = useSelector(state=>state.authReducer);
//     return accessToken;
// }


export const requestAccessToken = async (refreshToken)=>{
    const option = {
        headers: {
            'X-REFRESH-TOKEN': refreshToken
        }
    }
    // console.log(`requestToken refresh: ${option}`)
    const data = await axiosInstance.post('/api/v1/auth/refresh',{}, option)
        .catch(()=>{
            return statusError;
        })
    console.table(data)

    if(parseInt(Number(data.status) / 100) === 2){
        const status = data.status;

        const jwt = {
            access_token: data.headers.get('authorization')
            // refresh_token: data.headers.get('refreshtoken')
        }

        return {
            status,
            jwt
        }
    }else{
        return statusError;
    }

}

