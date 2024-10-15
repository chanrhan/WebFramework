import Calendar from "react-calendar"
import "./calendar.css"
import styled from "styled-components";
import {useEffect, useState} from "react";
import {DateUtils} from "../utils/DateUtils";

function CalendarTest() {
    const today = new Date();
    const [date, setDate] = useState(today)
    const [memos, setMemos] = useState({
        "2024-04-27": "Today"
    })

    // useEffect(() => {
    //     setMemos({
    //         "2024-04-27": "Today"
    //     })
    // }, []);

    const handleDateChange = (newDate) => {
        console.log(newDate)
        setDate(newDate)
    }


    const showContent = ({date, view}) => {
        console.log(`date: ${DateUtils.formatDate(date)}, view: ${view}`)
        if (view === 'month') {
            const memo = memos[DateUtils.formatDate(date)];
            if (memo == null) return null
            return <p style={{fontSize: '0.8em', margin: 0}}>{memo}</p>
        }
    }

    return (
        <div>
            <Calendar calendarType='gregory'>

            </Calendar>
        </div>
    )
}

export default CalendarTest;

