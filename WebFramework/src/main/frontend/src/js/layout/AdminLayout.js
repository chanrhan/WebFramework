import {MainHeader} from "./MainHeader";
import {Sidebar} from "./Sidebar";
import Layout from "../../css/layout.module.css";
import {Link, Outlet, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import logo from "../../images/logo.png";
import {HeaderSearchLayer} from "./module/HeaderSearchLayer";
import {cm} from "../utils/cm";
import {SelectItem, SelectLayer} from "../common/module/SelectLayer";
import {AdminSidebar} from "./AdminSidebar";
import {useAuthentication} from "../hook/useAuthentication";
import {useRenderlessModal} from "../hook/useRenderlessModal";

export function AdminLayout(){
    // console.log(`layout: ${window.location.pathname}`)
    const nav = useNavigate()
    const authentication = useAuthentication()
    const renderlessModal = useRenderlessModal(`RDL_${Date.now()}`)


    return (
        <div className='container'>
            <header className={Layout.header}>
                <h1 className={Layout.logo}>
                    {/*<Link to='/service' className={Layout.a}>*/}
                    {/*    <img src={logo} className={Layout.img} alt="momo"/>*/}
                    {/*</Link>*/}
                </h1>

                <div className={Layout.gnb}>
                    <div className={Layout.gnb_link}>
                        <ul className="link_list">
                            <li className={`${cm(Layout.link_item, Layout.my)} select_box`}>
                                {/*<button type="button" className={Layout.link_btn} onClick={toggleActive}>내 정보</button>*/}
                                <SelectLayer width='150px' top='45px' left='-110px' renderlessModal={renderlessModal}>
                                    <SelectItem onClick={() => {
                                        renderlessModal.close()
                                        authentication.logout();
                                        nav('/account/login')
                                    }}>로그아웃</SelectItem>
                                </SelectLayer>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <main>
                <AdminSidebar/>
                <div className={Layout.contents}>
                    <Outlet/>
                </div>
            </main>

        </div>
    )
}