import {LayerModal} from "../../common/modal/LayerModal";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import Popup from "../../../css/popup.module.css"
import User from "../../../css/user.module.css"
import {cm, cmc} from "../../utils/cm";
import {UserFormItem} from "../../account/module/UserFormItem";
import {UserFormInput} from "../../account/module/UserFormInput";
import {useObjectInputField} from "../../hook/useObjectInputField";

export function PaymentCardModal(props){
    const modal = useModal()
    const inputField = useObjectInputField();

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Payment_Card)
    }

    return (
        <LayerModal maxWidth={548} top={10}>
            {/*활성화시 active 추가 -->*/}
            <div className={Popup.popup_title}>결제 카드 등록</div>
            <div className={Popup.popup_text}>결제하실 카드를 등록해주세요.</div>

            <form className={`${cm(Popup.user_form, User.user_form)}`}>
                <div className={Popup.popup_cont}>
                    <ul className={`form_list ${cm(Popup.form_list, User.form_list)}`}>
                        <li className={cmc(User.form_item)}>
                            <label htmlFor="cardNum" className={cmc(User.form_label)}>카드 번호</label>
                            <div className={cmc(User.form_inp)}>
                                <input type="text" id="cardNum" className={cmc(User.inp)} placeholder="0000 0000 0000 0000"/>
                            </div>
                        </li>
                        <li className={cmc(User.form_item)}>
                            <label htmlFor="cardDate" className={cmc(User.form_label)}>유효 기간</label>
                            <div className={cmc(User.form_inp)}>
                                <button type="button"  className={`ta_c ${cmc(User.inp)}`}
                                        style={{
                                            width: '80px'
                                        }}>MM</button>
                                <button type="button" title="유효 기간"  className={`ta_c ${cmc(User.inp)}`}
                                        style={{
                                            width: '90px',
                                            marginLeft: '8px'
                                        }}>YY</button>
                            </div>
                        </li>
                        <li className={cmc(User.form_item)}>
                            <label htmlFor="cardPw" className={cmc(User.form_label)}>비밀번호 앞 2자리</label>
                            <div className={cmc(User.form_inp)}>
                                <input type="password" id="cardPw" className={cmc(User.inp)} placeholder="**"/>
                            </div>
                        </li>
                        <li className={cmc(User.form_item)}>
                            <label htmlFor="birth" className={cmc(User.form_label)}>생년월일 6자리</label>
                            <div className={cmc(User.form_inp)}>
                                <input type="text" id="birth" className={cmc(User.inp)} placeholder="000000"/>
                            </div>
                        </li>
                    </ul>

                    <p className={cm(Popup.form_text)}>법인 카드의 경우 사업자 등록번호 10자리를 입력해주세요.</p>
                </div>

                <div className={Popup.popup_btn_box}>
                    <button type="button" className={`btn_blue ${cmc(Popup.btn)}`}>확인</button>
                </div>
            </form>

            <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
        </LayerModal>
    )
}