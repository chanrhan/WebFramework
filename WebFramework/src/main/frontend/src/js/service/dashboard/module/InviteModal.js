import {LayerModal} from "../../../common/modal/LayerModal";

import Popup from "../../../../css/popup.module.css"
import User from "../../../../css/user.module.css"
import {cm, cmc} from "../../../utils/cm";
import {useState} from "react";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import useApi from "../../../hook/useApi";
import {ObjectUtils} from "../../../utils/objectUtil";

export function InviteModal(props){
    const {userApi} = useApi();
    const [inputItems, setInputItems ] = useState([''])
    const modal = useModal()

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Invite)
    }

    const handleInput = (i, v)=>{
        const copy = [...inputItems]
        copy[i] = v;
        setInputItems(copy)
    }

    const addItem = ()=>{
        const copy = [...inputItems]
        copy.push('')
        setInputItems(copy)
    }

    const submit = async ()=>{
        const body = inputItems.filter(v=>!ObjectUtils.isEmpty(v));
        // console.table(body)
        if(body && body.length > 0){
            await userApi.invite(inputItems).then(({status,data})=>{
                if(status === 200 && data){
                    modal.openModal(ModalType.SNACKBAR.Info, {
                        msg: "초대가 전송되었습니디."
                    })
                    close();
                }
            })
        }
    }

    return (
        <LayerModal maxWidth={595} top={30}>
            {/*활성화시 active 추가 -->*/}
            <form className={cm(Popup.user_form, User.user_form)}>
                <div className={Popup.popup_cont}>
                    <h2 className={cm(User.user_title, Popup.user_title)}>초대하기</h2>
                    <p className={cm(Popup.form_text, User.form_text)}>입력하신 번호로 가입 링크를 보내드립니다.</p>

                    <ul className={cm(Popup.form_list, User.form_list)}>
                        <li className={cm(Popup.form_item, User.form_item)}>
                            <label htmlFor="phone" className={cm(Popup.form_label,User.form_label)}>휴대폰 번호</label>
                            {
                                inputItems && inputItems.map((v, i) => {
                                    return <div className={cm(User.form_inp)}>
                                        <input type="text" value={v}
                                               onChange={e=>{
                                                   handleInput(i, e.target.value)
                                               }}
                                               className={`inp ${cm(Popup.inp, User.inp)}`}/>
                                    </div>
                                })
                            }
                        </li>

                    </ul>

                    <div className={cm(Popup.form_right_btn)}>
                        <button type="button" className={`btn_sky btn_add_icon ${cmc(Popup.btn)}`} onClick={addItem}>초대 추가</button>
                    </div>
                </div>

                <div className={Popup.popup_btn_box}>
                    <button type="button" className={`btn_blue ${cmc(Popup.btn)}`} onClick={submit}>전송하기</button>
                </div>
            </form>

            <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
        </LayerModal>
    )
}