import Calendar from "../../../css/calendar.module.css"
import {cm} from "../../utils/cm";
import {LMD} from "../../common/LMD";

export function CalendarDetail({type, dday_type, dday, username}){
    const color = 'grey';
    return (
        <tr>
            <td className={Calendar.td}><span className={cm(Calendar.stat, `${Calendar[color]}`)}>예약 안됨</span>{username}</td>
            <td className={Calendar.td}>{dday_type}-{dday}</td>
            <td className={Calendar.td}>{LMD.rsv_msg_tp[type]}</td>
            <td className={Calendar.td}>
                <button type="button" className="btn_kakao">전송</button>
            </td>
        </tr>
    )
}