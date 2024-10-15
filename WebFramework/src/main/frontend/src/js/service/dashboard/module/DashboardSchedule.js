import Dashboard from "../../../../css/dashboard.module.css"
import {cm} from "../../../utils/cm";
import {DashboardTodoItem} from "./DashboardTodoItem";
import {useEffect, useState} from "react";
import {DateUtils} from "../../../utils/DateUtils";
import useApi from "../../../hook/useApi";
import {useObjectArrayInputField} from "../../../hook/useObjectArrayInputField";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import {LMD} from "../../../common/LMD";

export function DashboardSchedule({userInfo}){
    const {todoApi} = useApi();
    const modal = useModal();

    const today = new Date();

    const [month, setMonth] = useState(today.getMonth()+1);
    const [year, setYear] = useState(today.getFullYear());
    const [day, setDay] = useState(today.getDate())
    const [cYear, setCYear] = useState(year) // clicked year
    const [cMonth, setCMonth] = useState(month) // clicked month

    const [monthInfo, setMonthInfo] = useState(DateUtils.getMonthInfo(today.getFullYear(), today.getMonth()+1))

    const [items, setItems] = useState(null)
    const detail = useObjectArrayInputField({
        color: 0,
        content: ''
    }, null);

    const [orgLength, setOrgLength] = useState(0);

    useEffect(() => {
        getTodoForCalendar();
    }, [month, userInfo]);

    useEffect(() => {
        getTodoDetail()
    }, [day, userInfo]);

    const getTodoForCalendar = async ()=>{
        await todoApi.getTodoForCalendar(DateUtils.formatYYMM(year,month)).then(({status,data})=>{
            if(status === 200 && data && typeof data === 'object'){
                let map = {};
                data.forEach((v,i)=>{
                    map[v] = true;
                })
                setItems(map)
            }
        })
    }

    const getTodoDetail = async ()=>{
        await todoApi.getTodoDetail(DateUtils.formatYYMMdd(year,month,day)).then(({status,data})=>{
            if(status === 200 && data){
                detail.putAll(data)
                setOrgLength(data.length)
            }
        })
    }

    const setMonthNext = ()=>{
        if(month === 12){
            setMonthInfo(DateUtils.getMonthInfo(year+1, 1))
            setMonth(1);
            setYear(year+1)
        }else{
            setMonthInfo(DateUtils.getMonthInfo(year, month+1))
            setMonth(month+1);
        }
    }

    const setMonthPrev = ()=>{
        if(month === 1){
            setMonthInfo(DateUtils.getMonthInfo(year-1, 12))
            setMonth(12);
            setYear(year-1);
        }else{
            setMonthInfo(DateUtils.getMonthInfo(year, month-1))
            setMonth(month-1);
        }
    }

    const handleDate = (d)=>{
        setCYear(year)
        setCMonth(month)
        setDay(d)
    }

    const removeTodo = async (todoId)=>{
        const date = DateUtils.formatYYMMdd(cYear, cMonth, day);
        await todoApi.deleteTodo({
            date: date,
            todo_id: todoId
        }).then(({status,data})=>{
            if(status === 200 && data){
                getTodoDetail()
                getTodoForCalendar()
            }
        })
    }

    const checkTodo = async (todoId, checked)=>{
        const date = DateUtils.formatYYMMdd(cYear, cMonth, day);
        await todoApi.updateTodoChecked({
            date: date,
            todo_id: todoId,
            checked: checked ? 1 : 0
        }).then(({status,data})=>{
            if(status === 200 && data){
                getTodoDetail()
                getTodoForCalendar()
            }
        })
    }

    const openTodoAddModal = (e)=>{
        const x = e.clientX
        const y = e.clientY
        modal.openModal(ModalType.LAYER.Todo_Add, {
            top: `${y}px`,
            left: `${x}px`,
            onSubmit: async ({color, content})=>{
                // console.log(`submit: ${color} ${content}`)
                await todoApi.addTodo({
                    date: DateUtils.formatYYMMdd(cYear, cMonth, day),
                    color: color,
                    content: content
                }).then(({status,data})=>{
                    if(status === 200 && data){
                        getTodoDetail();
                        getTodoForCalendar()
                    }
                })
            }
        })
    }

    const setToday = ()=>{
        setYear(today.getFullYear())
        setMonth(today.getMonth()+1)
        setDay(today.getDate())
    }

    return (
        <div className={cm(Dashboard.info_schedule, Dashboard.div)}>
            <div className={Dashboard.schedule_head}>
                <div className={cm(Dashboard.schedule_title)}>{month}월 일정</div>
                <div className={cm(Dashboard.schedule_control)}>
                    <button type="button" className={cm(Dashboard.schedule_btn, Dashboard.btn_today)} onClick={setToday}>오늘</button>
                    <button type="button" className={cm(Dashboard.schedule_btn, Dashboard.btn_arrow, Dashboard.btn_prev)} onClick={setMonthPrev}>이전</button>
                    <button type="button" className={cm(Dashboard.schedule_btn, Dashboard.btn_arrow, "btn_next")} onClick={setMonthNext}>이전</button>
                </div>
            </div>

            <div className={cm(Dashboard.schedule_body)}>
                <div className={cm(Dashboard.schedule_calender)}>
                    <table className={cm(Dashboard.tb_calender)}>
                        <caption>달력</caption>
                        <colgroup>
                            <col span="6" style={{width: "calc(100% / 7)"}}>
                            </col>
                        </colgroup>
                        <thead className={cm(Dashboard.thead)}>
                        <tr>
                            <th className={cm(Dashboard.th)} colSpan="col">일</th>
                            <th className={cm(Dashboard.th)} colSpan="col">월</th>
                            <th className={cm(Dashboard.th)} colSpan="col">화</th>
                            <th className={cm(Dashboard.th)} colSpan="col">수</th>
                            <th className={cm(Dashboard.th)} colSpan="col">목</th>
                            <th className={cm(Dashboard.th)} colSpan="col">금</th>
                            <th className={cm(Dashboard.th)} colSpan="col">토</th>
                        </tr>
                        </thead>
                        <tbody className={cm(Dashboard.tbody)}>
                        {
                            new Array(monthInfo.totalWeek).fill(0).map((v, week) => {
                                return <tr key={week}>
                                    {
                                        new Array(7).fill(0).map((v, _day) => {
                                            const d = (week * 7) + _day - monthInfo.startDay + 1;
                                            return <DateItem key={_day} today={DateUtils.isToday(year, month, d)}
                                                             day={(d > 0 && d <= monthInfo.totalDays) && d}
                                                             active={year === cYear && month === cMonth && d === day}
                                                             has={items && items[d]}
                                                             onClick={handleDate}/>
                                        })
                                    }
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>

                <button type="button" className={`btn btn_blue btn_medium ${Dashboard.add_btn}`}
                        onClick={openTodoAddModal}>일정 추가</button>
                <ul className={cm(Dashboard.schedule_list)}>
                    {
                        detail.input ? detail.input.map((v, i) => {
                            return <li key={i} className={cm(Dashboard.schedule_item)}>
                                <div className='radio_box'>
                                    {/*<span className={cm(Dashboard.schedule_mark, Dashboard[LMD.color[v.color]])}></span>*/}
                                    <input type="checkbox" name={`pm_${i}`} id={`pm_${i}`} checked={v.checked} disabled={v.checked}/>
                                    <label htmlFor={`pm_${i}`} className={Dashboard.form_label} onClick={()=>{
                                        checkTodo(v.todo_id, !v.checked)
                                    }}>
                                        {v.content}
                                    </label>

                                    {/*<span className={cm(Dashboard.schedule_text)}>{v.content}</span>*/}
                                    <button type="button" className={cm(Dashboard.schedule_del)}
                                            onClick={() => {
                                                removeTodo(v.todo_id)
                                            }}>삭제
                                    </button>
                                </div>
                            </li>
                        }) : <div>dd</div>
                    }
                </ul>
            </div>
        </div>
    )
}

function DateItem({day, today, active, onClick, has}) {
    return (
        <td className={cm(Dashboard.td, `${today && Dashboard.today}`)}>
            <button className={cm(Dashboard.button, `${active && Dashboard.active}`, `${has && Dashboard.has}`)}
                    type="button" onClick={() => {
                onClick(day)
            }}>{day}</button>
        </td>
    )
}