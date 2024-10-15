import {getDaysInMonth, startOfMonth} from "date-fns";

export const DateUtils = {
    formatYYMMdd: (year, month: number, day:number)=>{
        return `${year}-${month.toString().padStart(2, 0)}-${day.toString().padStart(2,0)}`
    },
    formatYYMM: (year:number, month:number)=>{
        return `${year}-${month.toString().padStart(2, 0)}`
    },
    dateToStringYYMMdd: (date: Date)=>{
        return DateUtils.formatYYMMdd(date.getFullYear(), date.getMonth()+1,date.getDate())
    },
    getMonthInfo: (year, month)=>{
        const date = new Date(year, month-1);

        const firstDayOfMonth = startOfMonth(date);

        // 0: 일요일, 1: 월요일, ... , 6: 토요일
        // 시작 요일
        const startDay = firstDayOfMonth.getDay();

        const totalDays = getDaysInMonth(date);

        const totalWeek = Math.ceil((startDay + totalDays) / 7);

        return {
            startDay,
            totalDays,
            totalWeek
        }
    },
    hasNextMonth : (year, month)=>{
        const today = new Date();
        if(year < today.getFullYear()){
            return true;
        }
        if(month === 12 && year === today.getFullYear()){
            return false;
        }
        return month <= today.getMonth();
    },
    hasPrevMonth : (year)=>{
        return year >= 2000;
    },
    hasNextYear: (year)=>{
        const today = new Date();
        return year < today.getFullYear();
    },
    isToday: (year, month, day)=>{
        const today = new Date();
        return year === today.getFullYear() && month === today.getMonth()+1 && day === today.getDate();
    },
    dateDiff: (date1, date2)=>{
        console.log(`date diff: *${date1} *${date2}`)
        const before_date = Math.floor(new Date(date1).getTime() / 1000);
        const after_date = Math.floor(new Date(date2).getTime() / 1000);

        const tmp = after_date - before_date;
        if(tmp <= 0){
            throw "기준 날짜 이후의 날짜는 선택할 수 없습니다!"
        }

        return Math.floor(tmp / (60 * 60 * 24));
    },
    dateDiffFromToday: (date)=>{
        const d_date = Math.floor(new Date(date).getTime() / 1000);
        const now_date = Math.floor(new Date().getTime() / 1000);
        const tmp = d_date - now_date;
        if(tmp <= 0){
            throw "기준 날짜 이후의 날짜는 선택할 수 없습니다!"
        }
        return Math.floor(tmp / (60 * 60 * 24));
    },
    // dateAdd: (date, add)=>{
    //     const before_date = Math.floor(new Date(date).getTime() / 1000);
    //     before_date
    // }
    getYearWeek: (date) => {
        const onejan = new Date(date.getFullYear(),0,1);
        return Math.ceil((((date - onejan) / 86400000) + onejan.getDay()+1)/7);
    },
    getMonthAndWeek: (year, weekNumber)=>{
        // 주 번호에 해당하는 날짜 계산 (1월 1일부터 주 번호만큼 더함)
        const firstDayOfYear = new Date(year, 0, 1); // 1월 1일
        const daysOffset = (weekNumber - 1) * 7; // 주 번호에 따른 오프셋 계산
        const weekStartDate = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset));

        // 해당 날짜의 월과 몇째 주인지 계산
        const month = weekStartDate.getMonth() + 1; // 월 (0이 1월이므로 +1)
        const firstDayOfMonth = new Date(weekStartDate.getFullYear(), weekStartDate.getMonth(), 1);
        const dayOfWeek = firstDayOfMonth.getDay(); // 그 달의 첫 날의 요일 (0: 일요일, 1: 월요일, ...)
        const adjustedDay = weekStartDate.getDate() + dayOfWeek - 1; // 첫 주 보정
        const weekOfMonth = Math.ceil(adjustedDay / 7); // 몇째 주인지 계산

        return { month, weekOfMonth };
    }
}