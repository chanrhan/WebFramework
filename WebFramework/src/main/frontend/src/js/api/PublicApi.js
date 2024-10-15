import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";


function PublicApi(){
    const axiosApi = AxiosApi();

    return {
        login: async (data)=>{
          return await axiosApi.post('/api/v1/public/login',data);
        },
        logout: async (refreshToken)=>{
            return await axiosApi.get(`/api/v1/public/logout?refreshToken=${refreshToken}`);
        },
        signup : async (data)=>{
            return await axiosApi.post('/api/v1/public/signup', data);
        },

        findUser : async (by, data)=>{
            return await axiosApi.get(`/api/v1/public/user/find?by=${by}&data=${data}`, {});
        },
        existUserId : async(id)=>{
            return await axiosApi.get(`/api/v1/public/user/id/${id}/exist`,{});
        },
        matchUserId : async(id, findBy, value)=>{
            return await axiosApi.get(`/api/v1/public/user/${id}/match?${findBy}=${value}`, {});
        },
        // 비밀번호 재설정
        // 보안**
        resetPassword : async (data, resetToken)=>{
            return await axiosApi.post('/api/v1/public/reset/password', data, {
                headers:{
                    "RESET-TOKEN": resetToken
                }
            });
        },
        getResetToken : async (data)=>{
            return await axiosApi.post('/api/v1/auth/token/reset-pwd', data, {});
        },
        getProtectedTelAndEmail : async(id)=>{
            return await axiosApi.get(`/api/v1/public/user/tel-email/protected?id=${id}`,{});
        },
        sendAuthNumber: async (tel)=>{
            return await axiosApi.get(`/api/v1/public/auth/send?tel=${tel}`,{});
        }
    }
}

export default PublicApi;


export const getRoleName = (role)=>{
    switch (role){
        case 'ADMIN':
            return "관리자"
        case 'REPS':
            return "대표"
        case 'BM':
            return "점장"
        case 'STF':
            return "직원"
    }
}