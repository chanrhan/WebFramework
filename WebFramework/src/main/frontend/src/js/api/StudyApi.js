import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";

export function StudyApi(){
    const axiosApi = AxiosApi();
    return {
        getNode: async (parentId)=>{
            return await axiosApi.get(`/study/node/children?parentId=${parentId}`, {});
        },
        insertNode: async (data)=>{
            return await axiosApi.post('/study/node/add', data, {})
        }

    }
}
