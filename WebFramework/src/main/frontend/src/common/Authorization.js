import {Navigate, useLocation} from "react-router-dom";
import {AuthUtils, CheckToken} from "../js/utils/AuthUtils";
import Loading from "../js/common/module/Loading";
import useUserInfo from "../js/hook/useUserInfo";


export default function Authorization({redirectTo, children}){
    // console.log(`auth: ${window.location.pathname}`)
    const location = useLocation();
    const {isAuth} = CheckToken(location.key);
    console.log(`auth: ${isAuth}`)


    if(isAuth === 'Success'){
        return <>{children}</>
    }else if(isAuth === 'Loading') {
        return (
            <Loading/>
        )
    }else {
        return <Navigate to={redirectTo}/>;
    }
}
