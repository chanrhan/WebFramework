import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";

function PostImageApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();
    const axiosApi = AxiosApi();

    return {
        getPostImageAll: async ()=>{
            return await axiosApiWithAccessToken.get('/api/v1/pimg', accessToken);
        },
        addPostImage: async (body)=>{
            const option = {
                headers:{
                    'X-ACCESS-TOKEN': accessToken,
                    'Content-Type': "multipart/form-data"
                }
            }
            return await axiosApi.post('/api/v1/pimg/add', body, option)
        },
        updatePostImage: async (body)=>{
            const option = {
                headers:{
                    'X-ACCESS-TOKEN': accessToken,
                    'Content-Type': "multipart/form-data"
                }
            }
            return await axiosApi.post('/api/v1/pimg/update', body, option)
        },
        deletePostImage: async (id)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/pimg/del?id=${id}`, accessToken)
        }
    }
}

export default PostImageApi;