import {LayerModal} from "../../../common/modal/LayerModal";
import Popup from "../../../../css/popup.module.css"
import User from "../../../../css/user.module.css"
import {cm, cmc, toCssModules} from "../../../utils/cm";
import {TabList} from "../../../common/module/TabList";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import {SelectIndexLayer} from "../../../common/module/SelectIndexLayer";
import {useObjectInputField} from "../../../hook/useObjectInputField";
import {LMD} from "../../../common/LMD";
import {DynamicSelectButton} from "../../../common/module/DynamicSelectButton";
import {PriceInput} from "../../../common/inputbox/PriceInput";
import {DYNAMIC_TYPE} from "../../../common/modal/DynamicSelectModal";

export function SaleWtPlanModal(props){
    const inputField = useObjectInputField(props.data ?? {
        wt_actv_div: 0,
        wt_cms: 0,
        internet_plan: null,
        internet_plan_nm: null,
        tv_plan: null,
        tv_plan_nm: null
    })
    const modal = useModal();

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Sale_Wt_Plan)
    }

    const submit = ()=>{
        // console.table(inputField.input)
        if(props.onSubmit){
            props.onSubmit(inputField.input);
        }
        close();
    }

    return (
        <LayerModal top={30} maxWidth={548}>
                <div className={Popup.popup_title}>유선</div>

                <form className={cm(Popup.user_form, User.user_form, Popup.inp_type2)} onSubmit={(e)=>{
                    e.preventDefault()
                }}>
                    <div className={Popup.popup_cont}>
                        <ul className={cm(Popup.half, Popup.form_list, User.form_list)} style={{
                            marginLeft: `20px`
                        }}>
                            <li className={cm(Popup.form_item, User.form_item)}>
                                <label className={cm(Popup.form_label, User.form_label)}>개통 유형</label>
                                <div className={User.form_inp}>
                                    <div className={Popup.popup_tab}>
                                        <TabList name='wt_actv_div' inputField={inputField} theme={Popup} values={LMD.wt_actv_div}/>
                                    </div>
                                </div>
                            </li>
                            <li className={cm(Popup.form_item,User.form_item)}>
                                <label htmlFor="wt_cms" className={cm(Popup.form_label, User.form_label)}>유선 판매 수수료(정책)</label>
                                <div className={User.form_inp}>
                                    <PriceInput name="wt_cms" className={cmc(Popup.inp, Popup.ta_r)}
                                                value={inputField.get('wt_cms')}
                                                onChange={inputField.handleInput}/>
                                </div>
                            </li>
                        </ul>
                        <ul className={cm(Popup.half, Popup.form_list, User.form_list)} style={{
                            marginLeft: `20px`
                        }}>
                            <li className={cm(Popup.form_item, User.form_item)}>
                                <label htmlFor="net" className={cm(Popup.form_label, User.form_label)}>인터넷 요금제</label>
                                <div className={User.form_inp}>
                                    <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                                        <input type="hidden" id="net"/>
                                        <DynamicSelectButton type={DYNAMIC_TYPE.internet_plan}
                                                             provider={props.provider}
                                                             value={inputField.get('internet_plan_nm')}
                                                             onChange={({id,name})=>{
                                                                inputField.put('internet_plan',id)
                                                                inputField.put('internet_plan_nm',name)
                                        }}/>
                                    </div>
                                </div>
                            </li>
                            <li className={cm(Popup.form_item, User.form_item)}>
                                <label htmlFor="tv" className={cm(Popup.form_label, User.form_label)}>TV 요금제</label>
                                <div className={User.form_inp}>
                                    <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                                        <input type="hidden" id="tv"/>
                                        <DynamicSelectButton type={DYNAMIC_TYPE.tv_plan}
                                                             provider={props.provider}
                                                             value={inputField.get('tv_plan_nm')}
                                                             onChange={({id,name})=>{
                                            inputField.put('tv_plan',id)
                                            inputField.put('tv_plan_nm',name)
                                        }}/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className={Popup.popup_btn_box}>
                        <button type="button" className={`btn_blue ${cmc(Popup.btn)}`} onClick={submit}>저장</button>
                    </div>
                </form>

                <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
        </LayerModal>
    )
}
