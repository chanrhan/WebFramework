import Layout from "../../css/layout.module.css";
import Calender from "../../css/calendar.module.css";
import {cm} from "../utils/cm";
import {CalendarTable} from "./module/CalendarTable";
import {MonthSelectModal} from "../common/modal/menu/MonthSelectModal";
import {useObjectInputField} from "../hook/useObjectInputField";

export function Communication(){
    const today = new Date();

    const inputField = useObjectInputField({
        year: today.getFullYear(),
        month: today.getMonth()+1,
    });

    const onYYMMSelect = (year, month)=>{
        inputField.setInput(prev=>({
            ...prev,
            year: year,
            month: month
        }))
    }

    const setMonthNext = ()=>{
        if(inputField.get('month') === 12){
            inputField.setInput(prev=>({
                ...prev,
                month: 1,
                year: prev.year+1
            }));
        }else{
            inputField.setInput(prev=>({
                ...prev,
                month: prev.month+1
            }));
        }
    }

    const setMonthPrev = ()=>{
        if(inputField.get('month') === 1){
            inputField.setInput(prev=>({
                ...prev,
                month: 12,
                year: prev.year-1
            }))
        }else{
            inputField.setInput(prev=>({
                ...prev,
                month: prev.month-1
            }))
        }
    }

    return (
        <div className={Layout.sub}>
            <div className={Layout.sub_head}>
                <h2 className={Layout.sub_title}>예약전송함</h2>
            </div>

            <div className={Calender.calender}>
                <div className={Calender.calender_head}>
                    <div className={cm(Calender.calender_date, Calender.div)}>
                        <span className={Calender.date_text}>{inputField.input.year}년 {inputField.input.month}월</span>
                        <div className={Calender.date_box}>
                            <MonthSelectModal onSelect={onYYMMSelect}>
                                <button type="button" className={Calender.date_btn}>달력</button>
                            </MonthSelectModal>
                        </div>
                    </div>

                    <div className={cm(Calender.calender_control, Calender.div)}>
                        <button type="button"
                                className={cm(Calender.calender_btn, Calender.btn_arrow, Calender.btn_prev)}
                                onClick={setMonthPrev}>이전</button>
                        <button type="button" className={cm(Calender.calender_btn, Calender.btn_month)} onClick={()=>{
                            inputField.setInput({
                                year: today.getFullYear(),
                                month: today.getMonth()+1
                            })
                        }}>이번달</button>
                        <button type="button" className={cm(Calender.calender_btn, Calender.btn_arrow, Calender.btn_next)}
                                onClick={setMonthNext}>다음</button>
                    </div>
                </div>

                <div className={cm(Calender.calender_body, Calender.div)}>
                    <CalendarTable inputField={inputField}/>
                </div>
            </div>
        </div>
    )
}