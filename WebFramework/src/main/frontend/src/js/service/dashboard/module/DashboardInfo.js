import {cm, cmc} from "../../../utils/cm";
import Dashboard from "../../../../css/dashboard.module.css";
import {DashboardSchedule} from "./DashboardSchedule";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import useApi from "../../../hook/useApi";
import useModal from "../../../hook/useModal";
import {SelectIndexLayer} from "../../../common/module/SelectIndexLayer";
import {ChangeNicknameLayer} from "../../../common/module/ChangeNicknameLayer";
import {ModalType} from "../../../common/modal/ModalType";
import useUserInfo from "../../../hook/useUserInfo";

export function DashboardInfo({}){
    const {fileApi} = useApi();
    const modal = useModal();

    const userInfo = useUserInfo()
    const [profileImg, setProfileImg] = useState(null)
    const {userApi, shopApi} = useApi();
    const [shopName, setShopName] = useState(userInfo.shop_nm)
    const [nickname, setNickname] = useState(userInfo.nickname)

    const [shopItems, setShopItems] = useState([]);

    useEffect(() => {
        setShopName(userInfo.shop_nm)
    }, [userInfo]);

    const getShopAll = async ()=>{
        await shopApi.getShopAll().then(({status,data})=>{
            if(status === 200 && data){
                // console.table(data)
                setShopItems(data)
                // inputField.put('shop_nm',0)
            }
        })
    }


    useEffect(()=> {
        getShopAll();
        getPhp();
    },[])

    const getPhp = async ()=>{
        if(userInfo.pfp){
            await fileApi.load("pfp", userInfo.pfp).then(({status,data})=>{
                if(status === 200 && data){
                    const url = window.URL.createObjectURL(data)
                    setProfileImg(url)
                }
            })
        }
    }

    const getShopItems = ()=>{
        return shopItems ? shopItems.map((v,i)=>{
            return v.shop_nm
        }) : null;
    }

    const updateNickname = async (v)=>{
        setNickname(v);
        console.log(`update: ${v}`)
        await userApi.updateNickname(v).then(({status,data})=>{
            if(status === 200 && data){
                userInfo.updateUser();
                modal.openModal(ModalType.SNACKBAR.Info, {
                    msg: '호칭이 변경되었습니다'
                })
            }
        })
    }

    const updateShop = async (v)=>{
        setShopName(shopItems[v].shop_nm)
        await userApi.updateCurrentShop(shopItems[v].shop_id).then(({status,data})=>{
            if(status === 200 && data){
                userInfo.updateUser();
            }else{
                modal.openModal(ModalType.SNACKBAR.Warn, {
                    msg: '에러가 발생했습니다'
                })
            }
        })
    }

    const openInviteModal = ()=>{
        modal.openModal(ModalType.LAYER.Invite)
    }

    return (
        <div className={cm(Dashboard.dashboard_info, Dashboard.div)}>
            <div className={cm(Dashboard.info_company, Dashboard.div)}>
                <div className={cm(Dashboard.company_profile)}>
                        <span className={cm(Dashboard.profile_img)}><img src={profileImg}
                                                           alt="프로필 이미지"/></span>
                    <span className={cm(Dashboard.profile_name)}>{userInfo.name}<button type="button"
                                                              className={cm(Dashboard.profile_edit)}>수정</button></span>
                    <button type="button" className={`btn btn_blue btn_medium ${Dashboard.profile_btn}`}
                            onClick={openInviteModal}>초대하기</button>
                </div>

                <div className={cm(Dashboard.company_select)}>
                    <div className={cmc(Dashboard.select_box)}>
                        {/*<input type="hidden" id=""/>*/}
                        <SelectIndexLayer cssModules={Dashboard}
                                          value={shopName}
                                          onChange={updateShop}
                                          values={getShopItems()} name='shop_nm'/>
                    </div>

                    <div className={cmc(Dashboard.select_box)}>
                        {/*<input type="hidden" id=""/>*/}
                        <ChangeNicknameLayer value={nickname} values={['대표','점장']}
                                             onChange={updateNickname}/>
                    </div>
                </div>

                {
                    userInfo.role === 1 && <Link to='/shop/register'>
                        <button type="button" className={cm(Dashboard.company_add)}>매장 추가하기</button>
                    </Link>
                }

            </div>
            <DashboardSchedule userInfo={userInfo}/>
        </div>
    )
}