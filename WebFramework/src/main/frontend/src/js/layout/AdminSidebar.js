import {useState} from "react";
import Layout from "../../css/layout.module.css";
import {Link} from "react-router-dom";

const selectTab = (pathname)=>{
    // console.log(pathname)
    switch (pathname){
        case '/admin':
            return 0;
        case '/admin/gmd':
            return 1;
        case '/admin/stat':
            return 2;
        case '/admin/dev':
            return 3;
        default:
            return 0;
    }
}

export function AdminSidebar(){
    const pathname = window.location.pathname;
    const [tab, setTab] = useState(selectTab(pathname))

    return (
        <div className={Layout.lnb}>
            <nav className={Layout.menu}>
                <ul className={Layout.menu_list}>
                    <li className={`${Layout.menu_item} ${Layout.menu_customer} ${tab === 0 && Layout.active}`}>
                        <Link className={Layout.a} to='/admin' onClick={() => {
                            setTab(0)
                        }}>유저</Link>
                    </li>
                    <li className={`${Layout.menu_item} ${Layout.menu_work} ${tab === 1 && Layout.active}`}><Link
                        className={Layout.a} to='/admin/gmd' onClick={() => {
                        setTab(1)
                    }}>데이터</Link></li>
                    <li className={`${Layout.menu_item} ${Layout.menu_data} ${tab === 2 && Layout.active}`}><Link
                        className={Layout.a} to='/admin/shop' onClick={() => {
                        setTab(2)
                    }}>매장</Link></li>
                    <li className={`${Layout.menu_item} ${Layout.menu_data} ${tab === 3 && Layout.active}`}><Link
                        className={Layout.a} to='/admin/stat' onClick={() => {
                        setTab(3)
                    }}>통계</Link></li>
                    <li className={`${Layout.menu_item} ${Layout.menu_communication} ${tab === 4 && Layout.active}`}>
                        <Link className={Layout.a} to='/admin/dev' onClick={() => {
                            setTab(4)
                        }}>개발자</Link></li>
                </ul>
                <ul className={Layout.menu_list}>
                    <li className={`${Layout.menu_item} ${Layout.menu_set}`}><Link className={Layout.a}
                                                                                   to='/setting'>설정</Link></li>
                </ul>
            </nav>
        </div>
    )
}