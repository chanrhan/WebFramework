import {LayerModal} from "../../../common/modal/LayerModal";
import {cm, cmc} from "../../../utils/cm";
import Popup from "../../../../css/popup.module.css";
import useModal from "../../../hook/useModal";
import User from "../../../../css/user.module.css";
import {NumberUtils} from "../../../utils/NumberUtils";
import {SelectIndexLayer} from "../../../common/module/SelectIndexLayer";
import {ModalType} from "../../../common/modal/ModalType";
import {PriceInput} from "../../../common/inputbox/PriceInput";
import {useState} from "react";

export function UsedDeviceCmsModal(props){
    const modal = useModal();

    console.log(props.cms)
    const [amount, setAmount] = useState(props.cms ?? null)

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Used_Device_Cms)
    }

    const submit = ()=>{
        if(props.onSubmit){
            props.onSubmit(amount)
            close();
        }
    }

    return (
        <LayerModal maxWidth={348} top={200}>
            <div className={Popup.popup_title}>중고폰 판매 수수료 입력</div>
            {/*<div className={Popup.popup_text}>판매 수수료를 입력해주세요</div>*/}

            <form className={cm(Popup.user_form, User.user_form)}>
                <div className={Popup.popup_cont}>
                    <ul className={User.form_list}>
                        <li className="form_item">
                            <label htmlFor="name" className={User.form_label}>"{props.ud_nm}" 에 대한 판매 수수료</label>
                            <div className={User.form_inp}>
                                <PriceInput name='ud_cms' className={cmc(User.inp)}
                                            value={amount}
                                            onChange={(e)=>{
                                                setAmount(e.target.value)
                                            }}
                                            placeholder='금액을 입력해주세요'/>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className={Popup.popup_btn_box}>
                    <button type="button" className={`btn_blue ${cmc(Popup.btn)}`}
                            onClick={submit}>확인</button>
                </div>
            </form>

            <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
        </LayerModal>
    )
}