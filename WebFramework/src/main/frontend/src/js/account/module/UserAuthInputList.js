import User from "../../../css/user.module.css"

export function UserAuthInputList({subject, name, error, errorText, inputField}){
    return (
        <li className={`${User.form_item} ${errorText && `error ${User.error}`}`}>
            <label htmlFor={name} className={User.form_label}>{subject}</label>
            <div className={User.form_inp}>
                <input type="tel" id={name} className={`inp bg ${User.inp}`}/>
                {/*<input type="tel" id="phoneNum" className="inp" readonly>*/}
            </div>
            <div className={User.form_inp}>
                <input type="text" title="인증번호" id="phoneCode" className={`inp ${User.inp}`}/>
                <button type="button" className={User.form_btn}>인증하기</button>
            </div>
            <div className={User.form_timer}>
                <span className={User.timer_text}>유효시간 <span className={User.timer_num}>05:00</span></span>
                <button type="button" className={User.timer_btn}>재발송</button>
            </div>
            <p className={User.error_text}>{errorText}</p>
        </li>
    )
}