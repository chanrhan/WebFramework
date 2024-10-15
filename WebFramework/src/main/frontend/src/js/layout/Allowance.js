import {Navigate} from "react-router-dom";

export function Allowance({condition, redirectTo, children}){

    if(condition()){
        // console.log(`allowed: ${window.location.pathname}`)
        return <>{children}</>
    }else{
        // console.log(`not allow: ${window.location.pathname}`)
        return <Navigate to={redirectTo}/>
    }
}