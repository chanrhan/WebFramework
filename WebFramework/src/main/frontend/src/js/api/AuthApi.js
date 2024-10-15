import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";


function AuthApi(accessToken){

    return {
        getResetToken : async (data)=>{
            return await AxiosApi.post('/api/v1/auth/token/reset-pwd', data, {});
        }
    }
}

export default AuthApi;
