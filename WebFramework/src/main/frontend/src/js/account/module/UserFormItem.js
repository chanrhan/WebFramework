import User from "../../../css/user.module.css";
import {cmc} from "../../utils/cm";

export function UserFormItem({active, style, errorText, children}){
    return (
        <li className={`${User.form_item} ${active && cmc(User.active)} ${errorText && cmc(User.error)}`}
            style={style}>
            {children}
            {
                (active !== false && errorText) && <p className={User.error_text}>{errorText}</p>
            }
        </li>
    )
}