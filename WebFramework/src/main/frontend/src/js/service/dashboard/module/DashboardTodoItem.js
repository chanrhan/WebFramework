import {cm} from "../../../utils/cm";
import Dashboard from "../../../../css/dashboard.module.css";

export function DashboardTodoItem({color, value, onChange}){
    return (
        <li className={cm(Dashboard.schedule_item)}>
            <span className={cm(Dashboard.schedule_mark, Dashboard[color])}></span>

            <input type='text' className={cm(Dashboard.schedule_text)} value={value}
                   onChange={e=>{
                       onChange(e.target.value)
                   }}
                   placeholder='일정을 입력하세요'/>
            <button type="button" className={cm(Dashboard.schedule_del)}>삭제</button>
        </li>
    )
}