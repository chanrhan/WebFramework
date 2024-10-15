import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";

function NotificationApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();

    return {
        countUnreadNotif: async ()=>{
            return await axiosApiWithAccessToken.get('/api/v1/notif/count/unread', accessToken);
        },
        readAll: async ()=>{
            return await axiosApiWithAccessToken.get('/api/v1/notif/read/all', accessToken);
        },
        getNotifList: async ()=>{
            return await axiosApiWithAccessToken.get('/api/v1/notif/all', accessToken);
        }
    }
}

export default NotificationApi;