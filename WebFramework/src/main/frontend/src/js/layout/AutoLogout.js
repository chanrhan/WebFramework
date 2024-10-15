import {useAuthentication} from "../hook/useAuthentication";
import {useEffect} from "react";

export function AutoLogout(){
    const authentication = useAuthentication()

    useEffect(() => {
        authentication.logout();
        // console.log('auto logout')
    }, []);

    return (
        <>
        </>
    )
}