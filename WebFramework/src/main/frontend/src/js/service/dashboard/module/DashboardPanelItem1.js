import Dashboard from "../../../../css/dashboard.module.css";
import {cm} from "../../../utils/cm";

export function DashboardPanelItem1({title, num, per, price, onClick}){

    const getSide = ()=>{
        if(per > 0){
            return 'up'
        }else if(per < 0){
            return 'down'
        }
        return 'none'
    }

    const getArrow = ()=>{
        if(per > 0){
            return '▲'
        }else if(per < 0){
            return '▼'
        }
        return ''
    }

    return (
        <li className={cm(Dashboard.panel_item)} onClick={onClick}>
            <div className={Dashboard.panel_title}>{title}</div>
            <div className={cm(`${price ? Dashboard.panel_price : Dashboard.panel_num}`)}><span className={Dashboard.span}>{num}</span>{price ? '원':'대'}</div>
            <div className={`${Dashboard.panel_per} ${Dashboard[getSide()]}`}><span
                className={`${Dashboard.per_arrow}`}>{getArrow()}</span> {per}%<span
                className={cm(Dashboard.per_text)}>(전월 대비)</span></div>
        </li>
    )
}