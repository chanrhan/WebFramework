import {Route, Router, Routes} from "react-router-dom";
import React from "react";
import Authorization from "../components/common/Authorization";
import Sale from "../service/sale/Sale";
import ManageCustomer from "../service/manage-customer/ManageCustomer";
import ReserveMessage from "../service/reserve-msg/ReserveMessage";


const RouterInfo = [
    {path: '/service/sale', element: <Sale/>, withAuthorization: false},
    {path: '/service/manage-customer', element: <ManageCustomer/>, withAuthorization: false},
    {path: '/service/reserve-msg', element: <ReserveMessage/>, withAuthorization: false},
];

const       AutoRouter = () => {
    return (
        <>
            {
                RouterInfo.map((route) => {
                    return (
                        <Route key={route.path}
                               path={route.path}
                               element={
                                   route.withAuthorization ? (
                                       <Authorization
                                           redirectTo='/account/login'
                                       >
                                           {route.element}
                                       </Authorization>
                                   ) : (
                                       route.element
                                   )
                               }
                        />
                    )
                })
            }
        </>
    )
}

export default AutoRouter;