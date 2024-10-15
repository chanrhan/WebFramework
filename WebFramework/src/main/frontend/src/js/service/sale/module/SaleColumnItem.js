import {cm, cmc} from "../../../utils/cm";
import Board from "../../../../css/board.module.css";

export function SaleColumnItem({index, title, checked, onClick}){
    return (
        <li className={cm(Board.filter_item)}>
            <div className={cmc(Board.check_box)}>
                <input type="checkbox" id={`filter_${index}`} checked={checked}/>
                <label className={Board.label} htmlFor="filter" onClick={onClick}>{title}</label>
            </div>
        </li>
    )
}