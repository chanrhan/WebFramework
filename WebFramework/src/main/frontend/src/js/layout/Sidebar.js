import Layout from "../../css/layout.module.css"
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

// import "../../css/user.module.css"

const selectTab = (pathname)=>{
    // console.log(`path: ${pathname}`)
    switch (pathname){
        case '/service':
            return -1;
        case '/service/sale':
            return 0;
        case '/service/task':
            return 1;
        case '/service/communication':
            return 2;
        case '/service/analysis':
            return 3;
        default:
            return -2;
    }
}

export function Sidebar() {
    const pathname = window.location.pathname
    const [tab, setTab] = useState(selectTab(pathname))

    // useEffect(() => {
    //     console.log(`tab: ${tab}`)
    // }, [tab]);
    //
    // useEffect(() => {
    //     console.log(`p tab: ${tab}`)
    // }, [window.location.pathname]);

    return (
        <div className={Layout.lnb}>
            <nav className={Layout.menu}>
                <ul className={Layout.menu_list}>
                    <li className={`${Layout.menu_item} ${tab === -1 && Layout.active}`}>
                        <Link className={Layout.a} to='/service' onClick={() => {
                            setTab(-1)
                        }}>홈</Link>
                    </li>
                    <li className={`${Layout.menu_item} ${Layout.menu_customer} ${tab === 0 && Layout.active}`}>
                        <Link className={Layout.a} to='/service/sale' onClick={() => {
                            setTab(0)
                        }}>고객</Link>
                    </li>
                    <li className={`${Layout.menu_item} ${Layout.menu_work} ${tab === 1 && Layout.active}`}><Link
                        className={Layout.a} to='/service/task' onClick={() => {
                        setTab(1)
                    }}>업무</Link></li>
                    <li className={`${Layout.menu_item} ${Layout.menu_communication} ${tab === 2 && Layout.active}`}>
                        <Link className={Layout.a} to='/service/communication' onClick={() => {
                            setTab(2)
                        }}>연락</Link></li>
                    <li className={`${Layout.menu_item} ${Layout.menu_data} ${tab === 3 && Layout.active}`}><Link
                        className={Layout.a} to='/service/analysis' onClick={() => {
                        setTab(3)
                    }}>데이터</Link></li>
                    {/*<li className={`${Layout.menu_item} ${Layout.menu_chat} ${tab === 4 && Layout.active}`}><Link*/}
                    {/*    className={Layout.a} to='/service/chat' onClick={() => {*/}
                    {/*    setTab(4)*/}
                    {/*}}>팀 채팅</Link></li>*/}
                </ul>
                <ul className={Layout.menu_list}>
                    <li className={`${Layout.menu_item} ${Layout.menu_set}`}><Link className={Layout.a}
                                                                                   to='/setting'>설정</Link></li>
                </ul>
            </nav>
        </div>
    )
}