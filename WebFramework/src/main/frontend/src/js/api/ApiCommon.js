// import axiosInstance from "../utils/axiosInstance";
import axios from "axios";
import useModal from "../hook/useModal";
import {ModalType} from "../common/modal/ModalType";
import {errorMonitor} from "form-data";
import axiosInstance from "../utils/axiosInstance";

export const AxiosApi = ()=> {
    const modal = useModal();

    // const axiosInstance = axios.create({
    //     baseURL: "http://localhost:8080",
    //     timeout: 10000,
    //     headers: {
    //         "Content-Type": `application/json`,
    //         "Accept": "application/json",
    //         "Access-Control-Allow-Origin": `http://localhost:3000`,
    //         'Access-Control-Allow-Credentials':"true",
    //     },
    //     withCredentials: true,
    // });

    // // axiosInstance.interceptors.request.use(()=>{
    // //     // access, refresh 판별해서 재발급하는 함수
    // //
    // //
    // // }, ()=>{
    // //
    // })

    axiosInstance.interceptors.response.use((response)=>{
        // const status = response.status;
        // if(status !== 200){
        //     throw response
        // }
        // console.log(111)
        // console.log('success')
        // console.table(response)
        return {
            status: response.status,
            data: response.data,
            headers: response.headers
        }
    }, (error)=>{
        // console.error("error")
        // console.table(error)
        // console.log(222)
        if(!error){
            return error.response;
        }
        let msg = "문제가 발생했습니다. 다시 한번 시도해 주세요.";
        if(error.code === 'ERR_NETWORK'){
            msg =  '서버 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.'
        }else if(error.response && error.response.data){
            msg = error.response.data.message;
        }
        // if(msg){
        //
        // }
        modal.openModal(ModalType.SNACKBAR.Warn, {
            msg: msg ?? "문제가 발생했습니다. 다시 한번 시도해 주세요."
        })
        // throw msg;
        return  {
            status: error.response.status,
            data: error.response.data
        }
    })

    const post = async(url, data, option)=>{
        return await axiosInstance.post(url, data, option);
    }

    const get = async(url, option)=>{
        return await axiosInstance.get(url, option).catch(e=>{
            console.log(123)
        })
    }

    const del = async(url, option)=>{
        return await axiosInstance.delete(url, option);
    }

    const put = async (url, data, option)=>{
        return await axiosInstance.put(url, data, option);
    }

    return {
        post,
        get,
        del,
        put
    }
}

export const AxiosApiWithAccessToken = ()=> {
    const axiosApi = AxiosApi();

    const post = async(url, data, accessToken)=>{
        return axiosApi.post(url,data, {
            headers: {
                "X-ACCESS-TOKEN": accessToken
            }
        });
    }


    const get=(url, accessToken)=>{
        return axiosApi.get(url, {
            headers: {
                "X-ACCESS-TOKEN": accessToken
            }
        });
    }

    const del = async(url, accessToken, data)=>{
        return axiosApi.delete(url, {
            data: data,
            headers: {
                "X-ACCESS-TOKEN": accessToken
            }
        });
    }

    const put = async (url, data, accessToken) => {
        return axiosApi.put(url, data, {
            headers: {
                "X-ACCESS-TOKEN": accessToken
            }
        });
    }

    return {
        post,
        get,
        del,
        put,
    }
}
