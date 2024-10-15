import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../store/slices/userSlice";
import useApi from "./useApi";

function useUserInfo(){
    const dispatch = useDispatch()
    const {userApi, fileApi} = useApi();
    const userInfo = useSelector(state=>state.userReducer);

    const updateUser = async ()=>{
        await userApi.getUser().then(({status,data})=>{
            if(status === 200 && data){
                dispatch(userActions.setUserInfo(data))
                console.table(data)
            }
        })
    }

    const clearUser = ()=>{
        dispatch(userActions.deleteUserInfo())
    }

    const getPfp = async ()=>{
        if(userInfo.pfp){
            console.log(userInfo.pfp)
            const res = await fileApi.load("pfp", userInfo.pfp);
            if(res.status === 200 && res.data){
                return window.URL.createObjectURL(res.data)
            }
        }
        return null;
    }

    return {
        ...userInfo,
        data: {...userInfo},
        updateUser,
        clearUser,
        getPfp
    }
}

export default useUserInfo;