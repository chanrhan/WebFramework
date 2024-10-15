import Board from "../../../../css/board.module.css";
import {cm, cmc} from "../../../utils/cm";
import {ObjectUtils} from "../../../utils/objectUtil";

export function PromiseOptionItem({content, id, disabled, onClick}){

    if(ObjectUtils.isEmpty(content)){
        return null;
    }

    return (
        <li className={Board.option_item}>
            <div className={cmc(Board.radio_box)}>
                <input type="radio" name="radio" id={id} disabled={disabled}/>
                <label htmlFor={id} className={Board.form_label} onClick={onClick}>{content}</label>
            </div>
        </li>
    )
}