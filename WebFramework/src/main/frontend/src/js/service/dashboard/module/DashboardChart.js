import Dashboard from "../../../../css/dashboard.module.css"
import {cm} from "../../../utils/cm";
import {PerformanceChart} from "./PerformanceChart";
import {TabList} from "../../../common/module/TabList";
import {useEffect, useState} from "react";
import useApi from "../../../hook/useApi";
import {DateUtils} from "../../../utils/DateUtils";
import {NumberUtils} from "../../../utils/NumberUtils";

export function DashboardChart({userInfo}){
    const {saleApi} = useApi();
    const [tab1, setTab1] = useState(0)
    const [tab2, setTab2 ] = useState(0)

    const [amount, setAmount] = useState(0)
    const [isPrice, setIsPrice] = useState(false)
    const [isInclined, setIsInclined] = useState(true)

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const day = today.getDate();

    useEffect(() => {
        getChangeAmount();
    }, [userInfo,tab1]);


    const getChangeAmount = async ()=>{
        const body = {
            prev_from_ymd: DateUtils.formatYYMMdd(year, month-1, 1),
            prev_to_ymd: DateUtils.formatYYMMdd(year, month-1, day),
            curr_from_ymd: DateUtils.formatYYMMdd(year, month, 1),
            curr_to_ymd: DateUtils.formatYYMMdd(year, month, day),
        }

        let rst = null;
        if(tab1 < 3){
            switch (tab1){
                case 0:
                    rst = await saleApi.getCtChangeAmount(body);
                    break;
                case 1:
                    rst = await saleApi.getInternetChangeAmount(body);
                    break;
                case 2:
                    rst = await saleApi.getTvChangeAmount(body);
                    break;
            }
            if(rst != null){
                const {status,data} = rst;
                if(status === 200){
                    setIsInclined(data > 0);
                    setIsPrice(false)
                    setAmount(Math.abs(data))
                }
            }
        }else{
            switch (tab1){
                case 3:
                    rst = await saleApi.getTotalCmsChangeAmount(body);
                    break;
                case 4:
                    rst = await saleApi.getAvgCmsChangeAmount(body);
                    break;
            }


            if(rst != null){
                const {status,data} = rst;
                if(status === 200){
                    setIsInclined(data > 0);
                    setIsPrice(true)
                    setAmount(NumberUtils.toPrice(Math.abs(data)))
                }
            }
        }
    }



    return (
        <div className={cm(Dashboard.panel_chart)}>
            <p className={cm(Dashboard.chart_text)}>{month-1}월 1일 ~ {month-1}월 {day}일 실적 대비<br/>{amount}{isPrice ? '원':'대'} {isInclined ? '늘었어요':'줄었어요'}.</p>

            <div className={cm(Dashboard.chart_tab)}>
                <TabList name='tab1'
                         value={tab1}
                         onChange={setTab1}
                         theme={Dashboard}
                         values={
                    ['무선','인터넷','TV','총이익','평균이익']
                }/>
            </div>

            <div className={cm(Dashboard.chart_panel_wrap)}>
                <div className={cm(Dashboard.chart_panel, Dashboard.active)}>
                    <PerformanceChart userInfo={userInfo} categoryTab={tab1}
                                      chartClassName={cm(Dashboard.chart_map)}
                                      pannelClassName={cm(Dashboard.chart_panel_tab)}/>
                </div>
            </div>
        </div>
    )
}