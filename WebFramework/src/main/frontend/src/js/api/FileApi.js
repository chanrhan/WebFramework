import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";

function FileApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();
    const axiosApi = AxiosApi();

    return {
        load: async (dir, fileName)=>{
            const option = {
                headers:{
                    'X-ACCESS-TOKEN': accessToken
                },
                responseType: 'blob'
            }

            return await axiosApi.get(`api/v1/img/download/${dir}?filename=${fileName}`, option);
        }
    }
}

export default FileApi;