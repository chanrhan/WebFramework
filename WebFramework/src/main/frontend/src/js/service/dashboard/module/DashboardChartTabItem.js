import {cm, cmc} from "../../../utils/cm";
import Dashboard from "../../../../css/dashboard.module.css";

export function DashboardChartTabItem({tabName, active}){
    return (
        <li className={cm(Dashboard.tab_item, `${active && Dashboard.active}`)}>
            <button type="button" className={cm(Dashboard.tab_btn)}>{tabName}</button>
        </li>
    )
}