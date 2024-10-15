import {LayerModal} from "../../common/modal/LayerModal";
import Popup from "../../../css/popup.module.css"
import User from "../../../css/user.module.css"
import profileImg1 from "../../../images/profile_img1.jpg"
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import {cm} from "../../utils/cm";
import useUserInfo from "../../hook/useUserInfo";

export function NameCardModal(props){
    const modal  = useModal()
    const userInfo = useUserInfo();

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Name_Card)
    }

    return (
        <LayerModal top={100}>
            {/*활성화시 active 추가 -->*/}
            <div className={Popup.popup_title}>명함</div>

            <div className={Popup.business_card}>
                <div className={Popup.card_name}>{userInfo.name}<span className={Popup.span}>{userInfo.nickname}</span></div>
                <div className={Popup.card_img}><img src={profileImg1} alt="명함 이미지"/></div>
                <div className={Popup.card_address}>{userInfo.shop_addr}</div>
                <ul className={Popup.card_info}>
                    <li className={Popup.li}>T: {userInfo.tel}</li>
                    {/*<li className={Popup.li}>M: 010 - 3903 - 1234</li>*/}
                </ul>
                <div className={Popup.card_company}>{userInfo.shop_nm}</div>
            </div>

            <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
        </LayerModal>
    )
}