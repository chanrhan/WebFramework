import {useSelector} from "react-redux";
import UserApi from "../api/UserApi";
import PublicApi from "../api/PublicApi";
import NotificationApi from "../api/NotificationApi";
import FileApi from "../api/FileApi";

function useApi(){
    const {accessToken} = useSelector(state=>state.authReducer);

    return {
        publicApi: PublicApi(),
        userApi: UserApi(accessToken),
        notifApi: NotificationApi(accessToken),
        fileApi: FileApi(accessToken)
    }
}

export default useApi;