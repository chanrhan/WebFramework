import {useSelector} from "react-redux";
import UserApi from "../api/UserApi";
import ChatApi from "../api/ChatApi";
import PublicApi from "../api/PublicApi";
import SaleApi from "../api/SaleApi";
import ShopApi from "../api/ShopApi";
import NotificationApi from "../api/NotificationApi";
import TestApi from "../api/TestApi";
import GMDApi from "../api/GMDApi";
import RsvMsgApi from "../api/RsvMsgApi";
import TodoApi from "../api/TodoApi";
import FileApi from "../api/FileApi";
import PostImageApi from "../api/PostImageApi";
import {StudyApi} from "../api/StudyApi";

function useApi(){
    const {accessToken} = useSelector(state=>state.authReducer);

    return {
        publicApi: PublicApi(),
        userApi: UserApi(accessToken),
        chatApi: ChatApi(accessToken),
        saleApi: SaleApi(accessToken),
        rsvMsgApi: RsvMsgApi(accessToken),
        shopApi: ShopApi(accessToken),
        notifApi: NotificationApi(accessToken),
        todoApi: TodoApi(accessToken),
        testApi: TestApi(accessToken),
        gmdApi: GMDApi(accessToken),
        fileApi: FileApi(accessToken),
        pimgApi: PostImageApi(accessToken),
        studyApi: StudyApi()
    }
}

export default useApi;