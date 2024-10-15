import Popup from "../../../../css/popup.module.css"
import {cm, cmc} from "../../../utils/cm";
import {DateUtils} from "../../../utils/DateUtils";
import {useEffect, useRef, useState} from "react";
import {useRenderlessModal} from "../../../hook/useRenderlessModal";

export function DateSelectModal({rootClassName, onSelect, children, errorText}){
    const renderlessModal = useRenderlessModal(`RDL_DATE_SELECT_${onSelect}`)

    const today = new Date();
    const [month, setMonth] = useState(today.getMonth()+1);
    const [year, setYear] = useState(today.getFullYear());
    const [monthInfo, setMonthInfo] = useState(DateUtils.getMonthInfo(today.getFullYear(), today.getMonth()+1))

    const handleDate = (day)=>{
        if(onSelect) onSelect(year, month, day)
        renderlessModal.close()
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

    return (
        <div onClick={renderlessModal.clickToOpen} className={`${rootClassName} ${errorText && cmc(Popup.error)}`} style={{
            position: 'relative'
        }}>
            {children}
            {
                errorText && <>
                    <p className='error_text'>{errorText}</p>
                </>
            }
            <div className={`${cm(Popup.date_popup, Popup.solo, `${renderlessModal.active && Popup.active}`)}`} ref={renderlessModal.ref}>
                <div className={Popup.date_head}>
                    <span className={Popup.span}>{year}년 {month}월</span>
                    <button type="button" className={cm(Popup.date_btn2, Popup.btn_prev2)} onClick={setMonthPrev}
                            disabled={!DateUtils.hasPrevMonth(year)}>이전
                    </button>
                    <button type="button" className={cm(Popup.date_btn2, Popup.btn_next2)} onClick={setMonthNext}
                            disabled={!DateUtils.hasNextMonth(year, month)}>다음
                    </button>
                </div>

                <div className={Popup.date_body}>
                    <table className={Popup.tb_date}>
                        <caption>달력</caption>
                        <colgroup>
                            <col span="6" style={{width: 'calc(100% / 7)'}}/>
                            <col/>
                        </colgroup>
                        <thead className={Popup.thead}>
                        <tr>
                            <th className={Popup.th} colSpan="col">월</th>
                            <th className={Popup.th} colSpan="col">화</th>
                            <th className={Popup.th} colSpan="col">수</th>
                            <th className={Popup.th} colSpan="col">목</th>
                            <th className={Popup.th} colSpan="col">금</th>
                            <th className={Popup.th} colSpan="col">토</th>
                            <th className={Popup.th} colSpan="col">일</th>
                        </tr>
                        </thead>
                        <tbody className={Popup.tbody}>
                        {
                            new Array(monthInfo.totalWeek).fill(0).map((v, week) => {
                                return <tr key={week}>
                                    {
                                        new Array(7).fill(0).map((v, day) => {
                                            const d = (week * 7) + day - monthInfo.startDay + 1;
                                            return <DateItem key={day} today={DateUtils.isToday(year, month, d)}
                                                             day={(d > 0 && d <= monthInfo.totalDays) && d}
                                                             onClick={handleDate}>
                                                {/*do something*/}
                                                {/*<span className="stat blue">전송완료 5건</span>*/}
                                            </DateItem>
                                        })
                                    }
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function DateItem({day, today, onClick}) {
    return (
        <td className={cm(Popup.td, `${today && Popup.today}`)}>
            <button type='button' className={Popup.button} onClick={() => {
                onClick(day)
            }}>{day}</button>
        </td>
    )
}