import Popup from "../../../../css/popup.module.css";
import {cm} from "../../../utils/cm";
import User from "../../../../css/user.module.css";

export function AddSaleInput({value, name, subject, search, maxLength, className, onClick, readOnly, inputField, icon, children}){

    if(typeof inputField !== 'object'){
        return null;
    }

    return (
        <>
            <label htmlFor={name} className={Popup.customer_label}>{subject}</label>
            {icon}
            <div className={`${Popup.customer_inp_box}`}>
                <input type="text" name={name}
                       value={value ?? inputField.get(name)}
                       maxLength={maxLength}
                       className={cm(Popup.customer_inp, `${search && Popup.inp_search}`, className)}
                       readOnly={readOnly}
                       onChange={inputField.handleInput}
                       onClick={onClick}/>
                {children}
            </div>
        </>
    )
}