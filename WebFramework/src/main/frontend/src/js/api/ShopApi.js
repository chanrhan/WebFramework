import {AxiosApiWithAccessToken} from "./ApiCommon";

function ShopApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();

    return {
        // 안씀 이거
        getCorp : async ({keyword})=>{
            return await axiosApiWithAccessToken.get(`/api/v1/corp/search/role-detail?keyword=${keyword}`, accessToken);
        },
        addShop : async (data)=>{
            return await axiosApiWithAccessToken.post('/api/v1/shop',data,accessToken);
        },
        // addShopBulk: async (data)=>{
        //     return await axiosApiWithAccessToken.post(`/api/v1/shop/bulk`, data, accessToken);
        // },
        getShop : async (keyword)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/shop?keyword=${keyword}`,accessToken);
        },
        getShopAll : async ()=>{
            return await axiosApiWithAccessToken.get('/api/v1/shop/all',accessToken);
        },
        joinShop: async (shopId)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/shop/join?shopId=${shopId}`, accessToken);
        },
        getShopAdmin: async (body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/shop/admin`, body, accessToken);
        }
    }
}

export default ShopApi;




