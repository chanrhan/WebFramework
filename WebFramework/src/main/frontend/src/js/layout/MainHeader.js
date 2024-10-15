import logo from "../../images/logo.png"
import Layout from "../../css/layout.module.css"
import {Link, useNavigate} from "react-router-dom";
import useApi from "../hook/useApi";
import {useEffect, useRef, useState} from "react";
import {cm, cmc} from "../utils/cm";
import {SelectItem, SelectLayer} from "../common/module/SelectLayer";
import alarmIcon2 from "../../images/alarm_icon2.png"
import {HeaderSearchLayer} from "./module/HeaderSearchLayer";
import useModal from "../hook/useModal";
import {ModalType} from "../common/modal/ModalType";
import {useAuthentication} from "../hook/useAuthentication";
import {useRenderlessModal} from "../hook/useRenderlessModal";
// import "../../css/user.module.css"

export function MainHeader(){
    const nav = useNavigate()
    const modal = useModal();
    const {notifApi, publicApi} = useApi();
    const authentication = useAuthentication();
    const [count, setCount] = useState(0)
    const renderlessModal = useRenderlessModal(`RDL_HEADER`)

    const countUnreadNotif = async ()=>{
        await notifApi.countUnreadNotif().then(({status,data})=>{
            if(status === 200){
                setCount(data)
            }
        })
    }

    useEffect( () => {
        countUnreadNotif()
    });


    const openChargePointModal = ()=>{
        modal.openModal(ModalType.LAYER.Charge_Point)
        renderlessModal.close()
    }


    return (
        <header className={Layout.header}>
            <h1 className={Layout.logo}><Link to='/service' className={Layout.a}><img src={logo} className={Layout.img} alt="momo"/></Link></h1>

            <div className={Layout.gnb}>
                <HeaderSearchLayer/>

                <div className={Layout.gnb_link}>
                    <ul className="link_list">
                        <li className={cm(Layout.link_item, Layout.alarm, `${count > 0 && Layout.has}`)}>
                             {/*알람 있을 경우 has 추가 */}
                            <NotificationListLayer/>
                        </li>
                        <li className={`${cm(Layout.link_item, Layout.my)} select_box`}>
                            {/*<button type="button" className={Layout.link_btn} onClick={toggleActive}>내 정보</button>*/}
                            <SelectLayer width='150px' top='45px' left='-110px' renderlessModal={renderlessModal}>
                                <SelectItem onClick={() => {
                                    renderlessModal.close()
                                    nav('/profile')
                                }}>개인정보 보기</SelectItem>
                                <SelectItem onClick={() => {
                                    renderlessModal.close()
                                    nav('/staff')
                                }}>회원 관리</SelectItem>
                                {/*<SelectItem onClick={() => {*/}

                                {/*    openChargePointModal();*/}
                                {/*}}>문자 포인트 충전</SelectItem>*/}
                                <SelectItem onClick={() => {
                                    renderlessModal.close()
                                    nav('/account/login')
                                }}>로그아웃</SelectItem>
                            </SelectLayer>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

function NotificationListLayer({}){
    const {notifApi} = useApi()
    const nav = useNavigate()
    const [items, setItems] = useState(null)

    const renderlessModal = useRenderlessModal(`RDL_NOTIFICATION_${Date.now()}`)

    useEffect(() => {
        getNotif()
        readAll();
    }, []);


    // const [active, setActive ] = useState(false)
    // const componentRef = useRef(null)
    //
    // const onclickRef = useRef()
    //
    // useEffect(() => {
    //     if(active){
    //         attachOnClick();
    //         getNotif()
    //         readAll();
    //     }else{
    //         detachOnClick()
    //     }
    // }, [active]);
    //
    // const attachOnClick = ()=>{
    //     if(window.onclick){
    //         onclickRef.current = window.onclick;
    //     }
    //     const timer = setTimeout(()=>{
    //         window.onclick = e=>{
    //             if(componentRef.current && !componentRef.current.contains(e.target)){
    //                 setActive(false)
    //                 // detachOnClick();
    //             }
    //         }
    //         clearTimeout(timer);
    //     }, 10)
    //
    // }
    //
    // const detachOnClick = ()=>{
    //     if(window.onclick){
    //         const timer = setTimeout(()=>{
    //             window.onclick = onclickRef.current;
    //             onclickRef.current = null;
    //             clearTimeout(timer)
    //         }, 10)
    //     }
    // }

    const readAll = async ()=>{
        await notifApi.readAll();
    }

    const getNotif = async ()=>{
        await notifApi.getNotifList().then(({status,data})=>{
            // console.log(status)
            if(status === 200 && data){
                // console.table(data)
                setItems(data)
            }
        })
    }

    const getTimeAgo = (minute)=>{
        if(minute < 1){
            return '방금'
        }
        if(minute < 60){
            return `${minute}분`
        }
        const hour = Math.floor(minute / 60);
        if(hour < 24){
            return `${hour}시간`
        }
        const day = Math.floor(hour / 24);
        return `${day}일`
    }

    return (
        <>
            <button type="button" className={Layout.link_btn} onClick={renderlessModal.clickToOpen}>알람</button>
            <div className={cm(Layout.alarm_popup, `${renderlessModal.active && Layout.active}`)} ref={renderlessModal.ref}>
                {/*활성화시 active 추가 -->*/}
                <div className={Layout.alarm_today}>
                    <div className={Layout.alarm_title}>오늘알림</div>
                    <ul className={Layout.alarm_list}>
                        {
                            items && items.filter(v=>v.today).map((v,i)=> {
                                return <li key={i} className={cm(Layout.alarm_item, `${!v.read_st && Layout.new}`)}
                                           onClick={()=>{
                                    // console.log(v.type)
                                    if(v.type === 1) {
                                        nav('/staff')
                                        renderlessModal.close()
                                    }
                                }}>
                                    <div className={Layout.a}>
                                        <span className={Layout.alarm_img}><img src={alarmIcon2} alt=""/></span>
                                        <span className={Layout.alarm_text}>{v.content}</span>
                                        <span className={Layout.alarm_date}>{getTimeAgo(v.ago)} 전</span>
                                    </div>
                                </li>
                            })
                        }

                    </ul>
                </div>

                <div className={Layout.alarm_history}>
                    <div className={Layout.alarm_title}>이전알림</div>
                    <ul className={Layout.alarm_list}>
                        {
                            items && items.filter(v=>!v.today).map((v, i) => {
                                return <li key={i} className={cm(Layout.alarm_item, `${!v.read_st && Layout.new}`)}
                                           onClick={()=>{
                                    console.log(v.type)
                                    if(v.type === 1) {
                                        nav('/staff')
                                        renderlessModal.close()
                                    }
                                }}>>
                                <div className={Layout.a}>
                                        <span className={Layout.alarm_img}><img src={alarmIcon2} alt=""/></span>
                                        <span className={Layout.alarm_text}>{v.content}</span>
                                        <span className={Layout.alarm_date}>{getTimeAgo(v.ago)} 전</span>
                                    </div>
                                </li>
                            })
                        }

                    </ul>
                </div>
            </div>
        </>
    )
}