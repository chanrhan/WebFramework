import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";
import {ObjectUtils} from "../utils/objectUtil";
import useModal from "../hook/useModal";

function UserApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();
    const axiosApi = AxiosApi();

    return {
        getUser : async ()=>{
            return await axiosApiWithAccessToken.get('/api/v1/user/info', accessToken);
        },
        // 이건 이미지 api로 옮겨야 함
        getProfilePicture : async (id)=>{
            // const response = await axiosApiWithAccessToken.get(`/api/v1/img/pfp/${id}`, accessToken);
            // if(response.status === 200){
            //     if(!ObjectUtils.isEmpty(response.data)){
            //         return response.data;
            //     }
            // }
            return '/img/tmp/default_pfp.png';
        },
        checkBrNoStatus : async (brNo)=>{
            // console.table(array)
            return await axiosApiWithAccessToken.get(`/api/v1/user/brno/status?brNo=${brNo}`, accessToken);
        },
        updateNickname : async (nickname)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/user/nickname?nickname=${nickname}`,accessToken);
        },
        updateCurrentShop : async (shopId)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/user/shop/curr?shopId=${shopId}`, accessToken);
        },
        updateProfile : async (data)=>{
            return await axiosApiWithAccessToken.post('/api/v1/user/profile', data, accessToken);
        },
        updateRole: async (userId, role)=>{
            return await axiosApiWithAccessToken.put(`/api/v1/user/${userId}/role?role=${role}`)
        },
        updatePfp : async (data)=>{
            const option = {
                headers:{
                    'X-ACCESS-TOKEN': accessToken,
                    'Content-Type': "multipart/form-data"
                }
            }
            return await axiosApi.post('/api/v1/user/pfp',data, option);
        },
        updatePassword: async (data)=>{
          return await axiosApiWithAccessToken.post('/api/v1/user/password',data, accessToken);
        },
        // getUserAsStaff : async ()=>{
        //     return await axiosApiWithAccessToken.get('/api/v1/user/staff', accessToken);
        // },
        getInnerStaffAsObject: async ()=>{
            return await axiosApiWithAccessToken.get('/api/v1/user/staff/inner', accessToken);
        },
        getInnerStaffAll: async (keyword)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/user/staff/inner/all?keyword=${keyword}`, accessToken);
        },
        getInnerStaffTotalCount: async ()=>{
            return await axiosApiWithAccessToken.get(`/api/v1/user/staff/inner/count`, accessToken);
        },
        getInnerStaffName: async ()=>{
            return await axiosApiWithAccessToken.get('/api/v1/user/staff/name/inner', accessToken);
        },
        getUserAll: async (body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/user/all`, body, accessToken);
        },
        // sendShopRequest: async (shopId)=>{
        //     return await axiosApiWithAccessToken.post(`/api/v1/user/shop/request?shopId=${shopId}`,accessToken)
        // },
        updateApprovalState: async (staffId, shopId, state)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/user/${staffId}/${shopId}/state`, state, accessToken);
        },
        invite: async (body)=>{
            return await axiosApiWithAccessToken.post('/api/v1/user/invite', body, accessToken);
        }
    }
}

export default UserApi;

