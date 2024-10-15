import User from "../../../../css/user.module.css"
import Popup from "../../../../css/popup.module.css"
import {cm, cmc, toCssModules} from "../../../utils/cm";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import {LayerModal} from "../../../common/modal/LayerModal";
import {useObjectArrayInputField} from "../../../hook/useObjectArrayInputField";
import {SelectIndexLayer} from "../../../common/module/SelectIndexLayer";
import {LMD} from "../../../common/LMD";
import {ObjectUtils} from "../../../utils/objectUtil";

export const FILTER_INPUT_TYPE = [
    false,LMD.main_div,false,false,false,LMD.ct_actv_tp,LMD.ct_actv_div,LMD.istm,LMD.storage
]

export function SaleFilterModal(props){
    // const inputField = useFilterInputField();
    const inputField = useObjectArrayInputField({
        and: false,
        type: 0,
        option: 0,
        target: 0
    }, props.data)
    const modal = useModal()

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Sale_Filter)
    }

    const submit = ()=>{
        if(props.onSubmit){
            const arr = inputField.input.filter(v=>{
                if(!FILTER_INPUT_TYPE[v.type] && (ObjectUtils.isEmpty(v.target) || v.target === 0)){
                    return false
                }
                return true
            })
            // console.table(arr)
            // return;
            if(!ObjectUtils.isEmpty(arr)){
                props.onSubmit(arr)
            }
        }
        close();
    }

    return (
        <LayerModal top={130} left={props.left} maxWidth={609}>
                <div className={Popup.popup_title}>필터</div>

                <form className={Popup.filter}>
                    <div className={Popup.popup_cont}>
                        <div className="ta_r">
                            <button type="button" className={`btn_blue ${cmc(Popup.btn_small, Popup.btn)}`}
                                    onClick={inputField.addItem}>항목추가
                            </button>
                        </div>

                        <ul className={Popup.filter_list}>
                            {
                                inputField.input && inputField.input.map((v, i) => {
                                    return <li key={i} className={Popup.filter_item}>
                                        <div className={`${cmc(Popup.select_box)} ${Popup.add}`}>
                                            {
                                                i > 0 && (
                                                    <SelectIndexLayer values={LMD.filter_and}
                                                                      onChange={(v) => {
                                                                          inputField.put(i, 'and', v);
                                                                      }}
                                                                      initValue={LMD.filter_and[0]}
                                                                      value={LMD.filter_and[v.and]}/>
                                                )
                                            }
                                        </div>
                                        <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                                            <input type="hidden" id=""/>
                                            <SelectIndexLayer values={LMD.filter_type}
                                                              cssModules={toCssModules(Popup, User)}
                                                              value={LMD.filter_type[v.type]}
                                                              onChange={(v) => {
                                                                  inputField.put(i, 'type', v);
                                                              }}/>
                                        </div>
                                        <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                                            <input type="hidden" id=""/>
                                            <SelectIndexLayer values={LMD.filter_option}
                                                              cssModules={toCssModules(Popup, User)}
                                                              value={LMD.filter_option[v.option]}
                                                              onChange={(v) => {
                                                                  inputField.put(i, 'option', v);
                                                              }}/>
                                        </div>
                                        <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                                            {/*<DynamicSelectLayer type={inputField.get(i, 'type')}/>*/}
                                            <input type="hidden" id=""/>
                                            {
                                                !FILTER_INPUT_TYPE[inputField.get(i, 'type')] ?
                                                    <input type="text"
                                                           value={v.target !== 0 ? v.target: ''}
                                                           onChange={e=>{
                                                               inputField.put(i, 'target', e.target.value)
                                                           }}
                                                           className={cmc(Popup.inp)}
                                                           placeholder='입력해주세요'/>
                                                    : <SelectIndexLayer values={FILTER_INPUT_TYPE[v.type]}
                                                                        value={FILTER_INPUT_TYPE[v.type][v.target]}
                                                                        cssModules={toCssModules(Popup, User)}
                                                                        onChange={(v) => {
                                                                            inputField.put(i, 'target', v);
                                                                        }}/>
                                            }
                                        </div>
                                        <div className={`${cmc(Popup.select_box)} ${Popup.del}`}>
                                            <button type="button" className={Popup.filter_del} onClick={() => {
                                                inputField.removeItem(i)
                                            }}>삭제
                                            </button>
                                        </div>
                                    </li>
                                })
                            }
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