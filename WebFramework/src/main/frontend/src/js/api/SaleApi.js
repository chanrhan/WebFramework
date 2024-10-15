import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";
import {ObjectUtils} from "../utils/objectUtil";

function SaleApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();
    const axiosApi = AxiosApi();

    return {
        addSale: async (data)=>{
            const option = {
                headers:{
                    'X-ACCESS-TOKEN': accessToken,
                    'Content-Type': "multipart/form-data"
                }
            }
            return await axiosApi.post('/api/v1/sale/add',data,option);
        },
        getSaleAll : async (body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/all`, body, accessToken);
        },
        getSaleSimple : async (keyword)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/simple`, {
                keyword: keyword
            }, accessToken);
        },
        getSaleDetail: async (saleId)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/sale/detail/${saleId}`,accessToken);
        },
        // getSaleTotalCount: async ()=>{
        //     return await axiosApiWithAccessToken.get(`/api/v1/sale/count/total`, accessToken);
        // },
        // getSaleTotalCountByCategory: async (category)=>{
        //     return await axiosApiWithAccessToken.get(`/api/v1/sale/task/count/total?category=${category}`, accessToken);
        // },
        getSaleByCategory : async (body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/category`, body, accessToken);
        },
        // getPromise: async (body)=>{
        //     return await axiosApiWithAccessToken.post(`/api/v1/sale/promise`, body, accessToken);
        // },
        updatePromise: async (body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/promise`, body, accessToken);
        },
        updateSale: async (body)=>{
            const option = {
                headers:{
                    'X-ACCESS-TOKEN': accessToken,
                    'Content-Type': "multipart/form-data"
                }
            }
            return await axiosApi.post(`/api/v1/sale/update`,body, option);
        },
        deleteSales : async (data)=>{
            return await axiosApiWithAccessToken.post('/api/v1/sale/delete/bulk', data, accessToken);
        },
        changeSaleState: async (body)=>{
            return await axiosApiWithAccessToken.post('/api/v1/sale/state', body, accessToken);
        },
        updateUsedDeviceCms: async (body)=>{
            return await axiosApiWithAccessToken.post('/api/v1/sale/ud/cms', body, accessToken);
        },
        addPromiseContent: async (body)=>{
            return await axiosApiWithAccessToken.post('/api/v1/sale/promise/content', body, accessToken);
        },
        getSummary: async (prevMonth, month)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/sale/summary?prevMonth=${prevMonth}&month=${month}`, accessToken);
        },
        getSaleRatio: async (date)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/sale/ratio?date=${date}`, accessToken);
        },
        getWorkInProcess: async (date)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/sale/wip?date=${date}`, accessToken);
        },
        getCtChangeAmount: async (body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/change/ct`, body, accessToken);
        },
        getInternetChangeAmount: async (body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/change/internet`, body, accessToken);
        },
        getTvChangeAmount: async (body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/change/tv`, body, accessToken);
        },
        getTotalCmsChangeAmount: async (body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/change/total-cms`, body, accessToken);
        },
        getAvgCmsChangeAmount: async (body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/change/avg-cms`, body, accessToken);
        },
        // 그래프 페이지
        // 그래프 요약
        getGraphSummary: async (body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/graph/summary`, body, accessToken);
        },
        getCtGraphByDateType: async (dateType, body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/graph/ct/${dateType}`, body, accessToken);
        },
        getInternetGraphByDateType: async (dateType, body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/graph/internet/${dateType}`, body, accessToken);
        },
        getTvGraphByDateType: async (dateType, body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/graph/tv/${dateType}`, body, accessToken);
        },
        getMarginGraphByDateType: async (dateType, body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/graph/margin/${dateType}`, body, accessToken);
        },
        getAvgMarginGraphByDateType: async (dateType, body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/graph/avg-margin/date/${dateType}`, body, accessToken);
        },
        getCtCountBySelectType: async (selectType, body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/graph/ct/select/${selectType}`, body, accessToken);
        },
        getGraphStat: async (selectType, body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/graph/stat/select/${selectType}`, body, accessToken);
        },
        getRatio: async (selectType, body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/graph/ratio/select/${selectType}`, body, accessToken);
        },
        getPersonalStatistics: async (body)=>{
            return await axiosApiWithAccessToken.post('/api/v1/sale/stat', body, accessToken)
        }
    }
}

export default SaleApi;

