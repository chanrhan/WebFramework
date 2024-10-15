import Dashboard from "../../../../css/dashboard.module.css"
import {cm} from "../../../utils/cm";

export function DashboardPannelItem4({title, value, total, per, onClick}){
    return (
        <li className={cm(Dashboard.panel_item)} onClick={onClick}>
            <span className={cm(Dashboard.panel_title, Dashboard.span)}>{title}</span>
            <span className={cm(Dashboard.panel_num, Dashboard.span)}>{value}/{total}</span>
            <span className={cm(Dashboard.panel_per, Dashboard.span)}><span className={cm(Dashboard.span)}>{per}</span>%</span>
        </li>
    )
}