import {Link, Outlet, useNavigate} from "react-router-dom";
import SseHeader from "./SseHeader";
import {MainHeader} from "./MainHeader";
import Layout from "../../css/layout.module.css"
import {Sidebar} from "./Sidebar";
import React, {useEffect, useMemo} from "react";
import useApi from "../hook/useApi";
import {userActions} from "../store/slices/userSlice";
import {ObjectUtils} from "../utils/objectUtil";
import {useDispatch, useSelector} from "react-redux";
import {WaitingApproval} from "./WaitingApproval";
import useUserInfo from "../hook/useUserInfo";
import {cm} from "../utils/cm";
import User from "../../css/user.module.css";

function MainLayout(){
    const userInfo = useUserInfo();
    // const nav = useNavigate()
    const {accessToken} = useSelector(state=>state.authReducer)

    useEffect(()=>{
        userInfo.updateUser();
    },[accessToken]);



    // if(userInfo.curr_shop_id === -1){
    //     nav('/admin')
    // }

    return (
        <div className='container'>
            {/*<SseHeader/>*/}
            <MainHeader/>
            <main>
                <Sidebar/>
                <div className={Layout.contents}>
                    {/*{*/}
                    {/*    userInfo.curr_shop_id === -1 ? <Outlet/>*/}
                    {/*        : <LayoutSelector approval_state={userInfo.approval_st}/>*/}
                    {/*}*/}
                    <LayoutSelector approval_state={userInfo.approval_st}/>
                    {/*{*/}
                    {/*    (userInfo && userInfo.approval_st && userInfo.approval_st !== 'NONE') ?*/}
                    {/*        <Outlet/> : <WaitingApproval/>*/}
                    {/*}*/}
                </div>
            </main>

        </div>
)
}

function LayoutSelector({approval_state}){
    if(approval_state === null){
        return (
            <div className={cm(User.approval)}>
                <h2 className={cm(User.approval_title)}>내 정보 설정111</h2>
                <p className={cm(User.approval_text)}>승인이 늦어지는 경우 대표님에게 직접 문의해주세요.</p>
                <span className={cm(User.approval_stat)}>승인 대기중</span>
            </div>
        )
    }

    switch (approval_state) {
        case -1:
            return (
                <div className={cm(User.approval)}>
                    <h2 className={cm(User.approval_title)}>매장 없음</h2>
                    <p className={cm(User.approval_text)}>새로운 매장을 추가하거나 기존 매장에 승인 요청을 보내세요.</p>
                    <Link to='/shop/list'>
                        <span className={cm(User.approval_stat)}>매장 등록하기</span>
                    </Link>
                </div>
            )
        case 0:
            return (
                <div className={cm(User.approval)}>
                    <h2 className={cm(User.approval_title)}>승인 대기중</h2>
                    <p className={cm(User.approval_text)}>승인이 늦어지는 경우 대표님에게 직접 문의해주세요.</p>
                    <span className={cm(User.approval_stat)}>...</span>
                </div>
            )
        case 1:
            return (
                <Outlet/>
            )
        case 2:
            return (
                <div className={cm(User.approval)}>
                    <h2 className={cm(User.approval_title)}>승인 거절됨</h2>
                    <p className={cm(User.approval_text)}>매장으로부터 승인이 거절되었습니다.</p>
                    <span className={cm(User.approval_stat)}>...</span>
                </div>
            )
    }
}

export default MainLayout;