import {cm, cmc} from "../../utils/cm";
import User from "../../../css/user.module.css";
import {UserFormItem} from "./UserFormItem";
import {TelePhoneInput} from "../../common/inputbox/TelePhoneInput";
import {UserFormInput} from "./UserFormInput";
import {ObjectUtils} from "../../utils/objectUtil";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const MINUTES_IN_MS = 5 * 60 * 1000;
const INTERVAL = 1000;

export function FindAccountBox({inputField, secretTel, secretEmail, onSubmit, onPrev}){
    const nav = useNavigate();
    const [byTel, setByTel] = useState(true)
    const [isSent, setIsSent] = useState(false)

    const [authenticated, setAuthenticated] = useState(false)
    const [authNumber, setAuthNumber] = useState(null)

    const [timeLeft, setTimeLeft] = useState(0)

    useEffect(() => {
        let timer = null;
        if(timeLeft > 0){
            timer = setInterval(()=>{
                setTimeLeft(prev=>prev - INTERVAL);
            }, INTERVAL)
            if(timeLeft <= 0){
                clearInterval(timer)
            }
        }
        return ()=>{
            clearInterval(timer)
        }
    }, [timeLeft]);

    const toggleRadio = ()=>{
        let field = inputField.input[(byTel ? 'tel': 'email')];
        // console.log(`field: ${field}`)
        if(ObjectUtils.isEmpty(field)){
            inputField.clearErrorOf(byTel ? 'tel': 'email')
        }
        inputField.clearOf('auth_code');
        // inputField.clearOf(byTel ? 'tel':'email')
        setByTel(!byTel)
        setAuthenticated(false)
        setTimeLeft(0)
        setIsSent(false)
    }

    const sendAuthNumber = (by)=>{
        if(inputField.validateOne(by)){
            setAuthNumber(123)
            setTimeLeft(MINUTES_IN_MS)
            setIsSent(true)
            setAuthenticated(false)
        }
    }

    const matchAuthNumber = ()=>{
        if(inputField.matchAuthNumber(authNumber)){
            setTimeLeft(0)
            setAuthenticated(true)
        }else{
            setAuthenticated(false)
        }
    }

    const getTimeerMS = ()=>{
        const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
        const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');
        return `${minutes}:${second}`
    }

    const prev = ()=>{
        if(onPrev){
            onPrev();
        }
    }

    const submit = ()=>{
        if(inputField.matchAuthNumber(authNumber)){
            const by = byTel ? 'tel':'email'
            if(inputField.validateOne(by)){
                if(onSubmit){
                    onSubmit(by);
                }
            }
        }
    }

    if(ObjectUtils.isEmpty(inputField)){
        return null;
    }

    return (
        <>
            <ul className={cm(User.form_list, User.form_select)}>
                <UserFormItem active={byTel} errorText={inputField.error.tel}>
                    {/*활성화시 active 추가*/}
                    <div className={`radio_box ${User.radio_box} ${User.div}`}>
                        <input type="radio" name="radio" id="radio" checked={byTel}/>
                        <label htmlFor="radio" className={User.form_label} onClick={toggleRadio}>휴대폰 번호로 찾기</label>
                    </div>
                    <div className={`${User.form_inp} ${User.div}`}>
                        <TelePhoneInput name='tel' value={inputField.get('tel')}
                                        className={`inp ${User.inp}`} placeholder='휴대폰 번호를 입력해주세요'
                                        onChange={e => {
                                            inputField.handleInput(e)
                                            setAuthNumber(null)
                                            setTimeLeft(0)
                                            setIsSent(false)
                                            setAuthenticated(false)
                                        }}/>
                        <button type="button"
                                className={cm(User.form_btn, User.auth, `${isSent && User.resend}`)}
                                onClick={() => {
                                    sendAuthNumber('tel')
                                }}>{isSent ? '재발송' : '인증번호 받기'}</button>
                    </div>
                    <UserFormInput name='auth_code' inputField={inputField}
                                placeholder='인증번호를 입력해주세요'
                                   readOnly={authenticated}>
                        <button type="button" className={User.form_btn} onClick={matchAuthNumber}>인증하기</button>
                    </UserFormInput>
                    {
                        byTel && isSent && <div className={User.form_timer}>
                            {
                                authenticated ? <span className={User.timer_text}>인증되었습니다!</span>
                                    : <>
                                    <span className={User.timer_text}>유효시간
                                        <span className={User.timer_num}>{getTimeerMS()}</span>
                                    </span>
                                        <button type="button" className={User.timer_btn} onClick={sendAuthNumber}>재발송</button>
                                    </>
                            }
                        </div>
                    }
                </UserFormItem>
                <UserFormItem active={!byTel} errorText={inputField.error.email}>
                    {/*활성화시 active 추가*/}
                    <div className={`radio_box ${User.radio_box} ${User.div}`}>
                        <input type="radio" name="radio" id="radio" checked={!byTel}/>
                        <label htmlFor="radio" className={User.form_label} onClick={toggleRadio}>이메일로 찾기</label>
                    </div>
                    <div className={`${User.form_inp} ${User.div}`}>
                        <input type='text' name='email' value={inputField.get('email')}
                               className={`inp ${User.inp}`} placeholder='이메일을 입력해주세요'
                               onChange={e => {
                                   inputField.handleInput(e)
                                   setAuthNumber(null)
                                   setTimeLeft(0)
                                   setIsSent(false)
                                   setAuthenticated(false)
                               }}/>
                        <button type="button"
                                className={cm(User.form_btn, User.auth, `${isSent && User.resend}`)}
                                onClick={() => {
                                    sendAuthNumber('email')
                                }}>{isSent ? '재발송' : '인증번호 받기'}</button>
                    </div>
                    <UserFormInput name='auth_code' inputField={inputField} placeholder='인증번호를 입력해주세요'
                                   readOnly={authenticated}>
                        <button type="button" className={User.form_btn} onClick={matchAuthNumber}>인증하기</button>
                    </UserFormInput>
                    {
                        !byTel && isSent && <div className={User.form_timer}>
                            {
                                authenticated ? <span className={User.timer_text}>인증되었습니다!</span>
                                    : <>
                                    <span className={User.timer_text}>유효시간
                                        <span className={User.timer_num}>{getTimeerMS()}</span>
                                    </span>
                                        <button type="button" className={User.timer_btn} onClick={sendAuthNumber}>재발송</button>
                                    </>
                            }
                        </div>
                    }
                </UserFormItem>
            </ul>
            <div className={User.form_btn_box}>
                <button type="button" className={`btn_grey ${cmc(User.btn)} ${User.w50}`} onClick={prev}>이전</button>
                <button type="button" className={`btn_blue ${cmc(User.btn)}`} onClick={submit}>다음</button>
            </div>
        </>
    )
}