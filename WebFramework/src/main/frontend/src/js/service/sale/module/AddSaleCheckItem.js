import {cm} from "../../../utils/cm";
import Popup from "../../../../css/popup.module.css";
import {useMemo} from "react";
import {ObjectUtils} from "../../../utils/objectUtil";

export function AddSaleCheckItem({subject, onClick, checked}){

    return (
        <li className={cm(Popup.customer_item, Popup.li)}>
            <input type="checkbox" name={`checklist_${subject}`} className={cm(Popup.check_inp, Popup.input)} checked={checked} readOnly/>
            <label htmlFor={`checklist_${subject}`} className={Popup.check_label} onClick={onClick}>{subject}</label>
        </li>
    )
}