import {LayerModal} from "../../../common/modal/LayerModal";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import Popup from "../../../../css/popup.module.css"
import User from "../../../../css/user.module.css"
import {cm, cmc, toCssModules} from "../../../utils/cm";
import {SelectIndexLayer} from "../../../common/module/SelectIndexLayer";
import {useObjectInputField} from "../../../hook/useObjectInputField";
import {DynamicSelectButton} from "../../../common/module/DynamicSelectButton";
import {DYNAMIC_TYPE} from "../../../common/modal/DynamicSelectModal";

function SaleCombModal(props){
    const inputField = useObjectInputField({
        comb_tp: 0,
        comb_memo: ''
    });
    const modal = useModal();

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Sale_Comb)
    }

    const submit = ()=>{
        if(props.onSubmit){
            props.onSubmit(inputField.input)
        }
        close();
    }


    return (
        <LayerModal top={30}>
                <div className={Popup.popup_title}>결합</div>

                <form className={cm(Popup.inp_type2, Popup.user_form, User.user_form)} onSubmit={e=>e.preventDefault()}>
                    <div className={Popup.popup_cont}>
                        <ul className={cm(Popup.form_list, User.form_list, Popup.half)}>
                            <li className={cm(Popup.form_item, User.form_item)}>
                                <label htmlFor="type" className={cm(User.form_label,Popup.form_label)}>결합 유형</label>
                                <div className={User.form_inp}>
                                    <div className={`select_box ${cm(User.select_box, Popup.select_box)}`}>
                                        <input type="hidden" id="type"/>
                                        <DynamicSelectButton type={DYNAMIC_TYPE.comb_tp}/>
                                        {/*<SelectIndexLayer values={[1,2,3]} name='comb_tp' inputField={inputField} cssModules={toCssModules(Popup, User)}/>*/}
                                    </div>
                                </div>
                            </li>
                            <li className={cm(Popup.form_item, User.form_item)}>
                                <label htmlFor="memo" className={cm(Popup.form_label,User.form_label)}>결합 메모</label>
                                <div className={cm(User.form_inp)}>
                                    <input type="text" id="memo" className={`inp ${cm(Popup.inp, User.inp)}`}/>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className={Popup.popup_btn_box}>
                        <button type="button" className={`btn_blue ${cmc(Popup.btn)}`} onClick={submit}>확인</button>
                    </div>
                </form>

                <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
        </LayerModal>
    )
}

export default SaleCombModal;