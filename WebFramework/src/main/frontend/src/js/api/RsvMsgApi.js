import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";
import {ObjectUtils} from "../utils/objectUtil";
import axios from "axios";

function SaleApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();

    return {
        getReserveMsgForCalendar: async (date)=>{
            return axiosApiWithAccessToken.get(`/api/v1/msg/calendar?date=${date}`, accessToken);
        },
        getReserveMsgDetail: async (date, state)=>{
            return axiosApiWithAccessToken.get(`/api/v1/msg/detail?date=${date}&state=${state}`, accessToken);
        }
    }
}

export default SaleApi;

