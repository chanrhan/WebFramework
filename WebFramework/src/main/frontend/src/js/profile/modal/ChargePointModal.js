import {LayerModal} from "../../common/modal/LayerModal";
import User from "../../../css/user.module.css"
import Popup from "../../../css/popup.module.css"
import {cm, cmc} from "../../utils/cm";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import {useObjectInputField} from "../../hook/useObjectInputField";
import {NumberUtils} from "../../utils/NumberUtils";
import {useState} from "react";
import {SelectIndexLayer} from "../../common/module/SelectIndexLayer";
import {ObjectUtils} from "../../utils/objectUtil";

const AUTO_CHARGE_AMOUNTS = [
    '10,000','20,000','50,000','100,000'
]

export function ChargePointModal(props){
    const modal = useModal()
    const inputField = useObjectInputField({
        trigger_amount: 0,
        charge_amount: 0
    });

    const [autoCharge, setAutoCharge] = useState(false)

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Charge_Point)
    }

    const openPaymentCardModal = ()=>{
        modal.openModal(ModalType.LAYER.Payment_Card)
    }

    return (
        <LayerModal maxWidth={548} top={10}>
            <div className={Popup.popup_title}>문자 포인트 충전</div>
            <div className={Popup.popup_text}>문자, 알림톡 푸시 메시지 비용은 충전 금액에서 차감됩니다.<br/>아무 조건 상관없이 사용량에 따라 자동으로 충전해서 사용하세요.
            </div>

            <form className={`${Popup.card} ${cm(User.user_form, Popup.form)}`}>
                <div className={Popup.popup_cont}>
                    <div className={Popup.card_info}>
                        <div className={Popup.card_title}>충전 금액</div>
                        <ul className={Popup.card_info_list}>
                            <li className={cm(Popup.price, Popup.card_info_item)}><span
                                className={Popup.card_info_title}>연락 포인트</span>
                                <span className={Popup.span}>{NumberUtils.toPrice(inputField.get('point'))}₩</span>
                            </li>
                            <li className={cm(Popup.price, Popup.card_info_item)}><span
                                className={cm(Popup.price, Popup.card_info_title)}>연락 잔액</span>
                                <span className={Popup.span}>{NumberUtils.toPrice(inputField.get('amount'))}₩</span>
                            </li>
                            <li className={cm(Popup.auto, Popup.card_info_item)}>
                                <span className={Popup.card_info_title}>자동 충전 설정</span>
                                <span className={cmc(Popup.switch)}>
                                        <input type="checkbox" id="switch" className={`switch_inp ${Popup.input}`}
                                               checked={!autoCharge}/>
                                        <label htmlFor="switch" className={Popup.label} onClick={()=>{
                                            setAutoCharge(!autoCharge)
                                        }}>
                                            {/*<span className={Popup.span}>on/off</span>*/}
                                        </label>
                                    </span>
                            </li>
                            <li className={cm(Popup.registered, Popup.card_info_item)}>
                                <span className={Popup.card_info_title}>등록 카드</span>
                                <span className={Popup.card_text}>KB 국민카드 7878-7800-7878-4529</span>
                                <button type="button" className={`btn_blue btn_medium ${cmc(Popup.btn)}`} onClick={openPaymentCardModal}>결제카드 변경
                                </button>
                            </li>
                            <li className={cm(Popup.select, Popup.card_info_item)}>
                                <span className={Popup.card_info_title}>내 문자 금액이 다음보다 적으면</span>
                                <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                                    <input type="hidden" id=""/>
                                    <SelectIndexLayer cssModule={User}
                                                      onChange={v=>{
                                                          inputField.put('trigger_amount', v)
                                                      }}
                                                      value={`${AUTO_CHARGE_AMOUNTS[inputField.get('trigger_amount')]}₩`}
                                                      values={AUTO_CHARGE_AMOUNTS}/>
                                </div>
                            </li>
                            <li className={cm(Popup.select, Popup.card_info_item)}>
                                <span className={Popup.card_info_title}>다음 금액을 잔액으로 자동 충전합니다.</span>
                                <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                                    <input type="hidden" id=""/>
                                    <SelectIndexLayer cssModule={User}
                                                      onChange={v=>{
                                                          inputField.put('charge_amount', v)
                                                      }}
                                                      value={`${AUTO_CHARGE_AMOUNTS[inputField.get('charge_amount')]}₩`}
                                                      values={AUTO_CHARGE_AMOUNTS} />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={Popup.popup_btn_box}>
                    <button type="button" className={`btn_blue ${cmc(Popup.btn)}`}>확인</button>
                </div>
            </form>

            <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
        </LayerModal>
    )
}