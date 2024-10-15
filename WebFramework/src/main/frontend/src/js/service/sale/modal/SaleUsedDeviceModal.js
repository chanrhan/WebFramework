import {LayerModal} from "../../../common/modal/LayerModal";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import Popup from "../../../../css/popup.module.css"
import User from "../../../../css/user.module.css"
import {cm, cmc, toCssModules} from "../../../utils/cm";
import {SelectIndexLayer} from "../../../common/module/SelectIndexLayer";
import {useObjectArrayInputField} from "../../../hook/useObjectArrayInputField";
import {LMD} from "../../../common/LMD";
import {PriceInput} from "../../../common/inputbox/PriceInput";
import {ObjectUtils} from "../../../utils/objectUtil";

const USED_ITEM = {
    ud_nm: '',
    ud_stor: null,
    ud_cms: 0
}

function SaleUsedDeviceModal(props){
    const modal = useModal();
    const inputField = useObjectArrayInputField(USED_ITEM, props.data)
    const errorField = useObjectArrayInputField(USED_ITEM, props.data ? new Array(props.data.length) : null)

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Sale_Used_Phone)
    }

    const submit = ()=>{
        if(props.onSubmit){
            let isError = false;
            inputField.input.forEach((v,i)=>{
                if(ObjectUtils.isEmpty(v.ud_nm)){
                    isError = true;
                    errorField.put(i, 'ud_nm', true)
                }else{
                    errorField.put(i, 'ud_nm', false)
                }

                if(v.ud_stor === null){
                    isError = true;
                    errorField.put(i, 'ud_stor', true)
                }else{
                    errorField.put(i, 'ud_stor', false)
                }

            })
            // console.table(filtered)
            if(isError){
                return;
            }
            props.onSubmit([...inputField.input])
        }
        close();
    }

    return (
        <LayerModal top={30} minWidth={600} maxWidth={600}>
                <div className={Popup.popup_title}>중고폰</div>

                <form className={cm(Popup.user_form, Popup.inp_type2, User.user_form)}>
                    <div className={Popup.popup_cont}>
                        <div className={cmc(Popup.ta_r)}>
                            <button type="button" className={`btn_blue ${cmc(Popup.btn, Popup.btn_small)}`} onClick={()=>{
                                inputField.addItem()
                                errorField.addItem()
                            }}>항목추가</button>
                        </div>
                        <div className={cm(Popup.list_title, Popup.d3)}>
                            <label htmlFor="card_n1m" className={cm(Popup.form_label, User.form_label)}>모델명</label>
                            <label htmlFor="card_nm2" className={cm(Popup.form_label, User.form_label)}>용량</label>
                            <label htmlFor="card_n1m" className={cm(Popup.form_label, User.form_label)}>중고폰 판매금액</label>
                        </div>
                        {
                            inputField.length() > 0 && inputField.input.map((_,i)=>{
                                return <UsedDeviceItem index={i} inputField={inputField} errorField={errorField}/>
                            })
                        }
                    </div>

                    <div className={Popup.popup_btn_box}>
                        <button type="button" className={`btn_blue ${cmc(Popup.btn)}`} onClick={submit}>확인</button>
                    </div>
                </form>

                <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
        </LayerModal>
    )
}

function UsedDeviceItem({index, inputField, errorField}){
    return (
        <ul key={index} className={cm(Popup.third, Popup.form_list)}>
            <li className={cm(Popup.form_item, User.form_item)}>
                <div className={User.form_inp}>
                    <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                        <input type="hidden" id="used_device"/>
                        <div className={`${User.form_inp} ${errorField.get(index, 'ud_nm') && 'error'}`}>
                            <input name='ud_nm' type="text" className={`inp ${cm(Popup.inp, User.inp)}`}
                                   value={inputField.get(index, 'ud_nm')}
                                   onChange={e => {
                                       inputField.put(index, 'ud_nm', e.target.value)
                                       if(!ObjectUtils.isEmpty(e.target.value)) {
                                           errorField.put(index, 'ud_nm', false)
                                       }
                                   }}/>
                        </div>
                    </div>
                </div>
            </li>
            <li className={cm(Popup.form_item, User.form_item)}>
                <div className={cm(User.form_inp, Popup.card_form)}>
                    <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                        <input type="hidden" id="card"/>
                        <SelectIndexLayer buttonClassName={Popup.type2}
                                          name='ud_stor' cssModules={toCssModules(Popup, User)}
                                          value={LMD.storage[inputField.get(index, 'ud_stor') ?? 0]}
                                          onChange={v => {
                                              // console.log(`change: ${v}`)
                                              inputField.put(index, 'ud_stor', v)
                                              errorField.put(index, 'ud_stor', false)
                                          }}
                                          error={errorField.get(index, 'ud_stor')}
                                          values={LMD.storage}/>
                    </div>
                </div>
            </li>
            <li className={cm(Popup.form_item, User.form_item)}>
                {/*<label htmlFor="card_tp" className={cm(Popup.form_label, User.form_label)}>카드 유형</label>*/}
                <div className={cm(User.form_inp, Popup.card_form)}>
                    <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                        {/*<input type="hidden" id="used_device"/>*/}
                        <div className={User.form_inp}>
                            <PriceInput name='ud_cms' className={`inp ${cm(Popup.inp, User.inp)}`}
                                   value={inputField.get(index, 'ud_cms')}
                                   onChange={e => {
                                       inputField.put(index, 'ud_cms', e.target.value)
                                   }}/>
                        </div>
                    </div>
                    <button type="button" className={Popup.check_del}
                            onClick={() => {
                                inputField.removeItem(index)
                            }}>
                    </button>
                </div>
            </li>
        </ul>
    )
}

export default SaleUsedDeviceModal;