import Board from "../../../css/board.module.css"
import {cm, cmc} from "../../utils/cm";

export function SelectBox({onActive, items=[]}){
    return (
        <div className="select_box">
            <input type="hidden" id=""/>
            <button type="button" className={cmc(Board.select_btn)}>{items && items[0]}</button>
            <ul className="select_layer">
                {
                    items && items.map((value)=> {
                        return <li className="select_item">
                            <button type="button">{value}</button>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}