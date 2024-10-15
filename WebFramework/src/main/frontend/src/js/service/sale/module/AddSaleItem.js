import Popup from "../../../../css/popup.module.css";
import {cm, cmc} from "../../../utils/cm";
import User from "../../../../css/user.module.css";

export function AddSaleItem({name, subject, children, errorText, style}){
    return (
        <li className={cm(Popup.customer_item, `${errorText && cmc(Popup.error)}`)} style={style}>
            {children}
            {/*<div className={Popup.customer_inp_box}>*/}
            {/*    <input type="text" name={name} className={cm(Popup.customer_inp, `${search && Popup.inp_search}`, className)} readOnly={readOnly}/>*/}
            {/*</div>*/}
            {
                errorText && <>
                    <p className='error_text'>{errorText}</p>
                </>
            }
        </li>
    )
}