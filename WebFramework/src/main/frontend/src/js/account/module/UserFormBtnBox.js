import User from "../../../css/user.module.css"
import {cmc} from "../../utils/cm";

export function UserFormBtnBox({value, onClick}){
    return (
        <div className={User.form_btn_box}>
            <button type="button" className={`btn_blue ${cmc(User.btn)}`} onClick={onClick}>{value}</button>
        </div>
    )
}