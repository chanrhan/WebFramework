import User from "../../../css/user.module.css";
import {useState} from "react";
import {cm, cmc} from "../../utils/cm";
import useValidateInputField from "../../hook/useValidateInputField";
import {UserFormInput} from "./UserFormInput";
import {UserFormItem} from "./UserFormItem";

export function UserFormFindBox({inputField}){
    // inputField = useInputField([{key:'tel'},{key:'email'}]);

    const [byTel, setByTel] = useState(true)
    const [isSent, setIsSent] = useState(false)
    let auth = null;

    const toggleRadio = (value)=>{
        setByTel(value)
        setIsSent(false)
        inputField.clearOf('auth_code');
    }

    const sendAuthNumber = ()=>{

    }

    const matchAuthNumber = ()=>{
        inputField.matchAuthNumber(auth)
    }

    if(typeof inputField !== 'object'){
        return;
    }

    return (
        <ul className={cm(User.form_list,User.form_select)}>
            <UserFormItem active={byTel} errorText={inputField.error.tel}>
                {/*활성화시 active 추가*/}
                <div className={`radio_box ${User.radio_box} ${User.div}`}>
                    <input type="radio" name="radio" id="radio" checked={byTel}/>
                    <label htmlFor="radio" className={User.form_label} onClick={()=>{toggleRadio(true)}}>휴대폰 번호로 찾기 {inputField.input.telHint && `(${inputField.input.telHint})`}</label>
                </div>
                <UserFormInput name='tel' inputField={inputField}>
                    <button type="button" className={cm(User.form_btn, User.auth, `${isSent && User.resend}`)} onClick={sendAuthNumber}>{isSent ? '재발송': '인증번호 받기'}</button>
                </UserFormInput>
                <UserFormInput name='auth_code' inputField={inputField}>
                    <button type="button" className={User.form_btn} onClick={matchAuthNumber}>인증하기</button>
                </UserFormInput>
                {
                    isSent && <div className={User.form_timer}>
                                    <span className={User.timer_text}>유효시간 <span
                                        className={User.timer_num}>05:00</span></span>
                        <button type="button" className={User.timer_btn}>재발송</button>
                    </div>
                }
            </UserFormItem>
            <UserFormItem active={!byTel} errorText={inputField.error.email}>
                {/*활성화시 active 추가*/}
                <div className={`radio_box ${User.radio_box} ${User.div}`}>
                    <input type="radio" name="radio" id="radio" checked={!byTel}/>
                    <label htmlFor="radio" className={User.form_label} onClick={()=>{toggleRadio(false)}}>이메일로 찾기 {inputField.input.emailHint && `(${inputField.input.emailHint})`}</label>
                </div>
                <UserFormInput name='email' inputField={inputField}>
                    <button type="button" className={cm(User.form_btn, User.auth, `${isSent && User.resend}`)} onClick={sendAuthNumber}>{isSent ? '재발송': '인증번호 받기'}</button>
                </UserFormInput>
                <UserFormInput name='auth_code' inputField={inputField}>
                    <button type="button" className={User.form_btn} onClick={matchAuthNumber}>인증하기</button>
                </UserFormInput>
                {
                    isSent && <div className={User.form_timer}>
                                    <span className={User.timer_text}>유효시간 <span
                                        className={User.timer_num}>05:00</span></span>
                        <button type="button" className={User.timer_btn}>재발송</button>
                    </div>
                }
            </UserFormItem>
        </ul>
    )
}