import Graph from "../../css/graph.module.css";
import {cm, cmc} from "../utils/cm";
import {GraphSummaryCard} from "./module/GraphSummaryCard";
import {SliderChartArea} from "./module/SliderChartArea";
import useApi from "../hook/useApi";
import {useEffect, useState} from "react";
import {DateUtils} from "../utils/DateUtils";
import {LineChartArea} from "./module/LineChartArea";
import {BarChartArea} from "./module/BarChartArea";
import {PieChartArea} from "./module/PieChartArea";

const ITEM_NAMES = [
    '무선','인터넷','TV','총 이익','개인 평균 마진','중고 개통','세컨'
]

export function DataGraph({userId, date}){
    const {saleApi} = useApi();

    const toDate = new Date();

    const [summary, setSummary] = useState(null)

    useEffect(() => {
        console.log(`userId: ${userId}`)
        getGraphSummary(6);
    }, [userId]);


    const getGraphSummary = async (range)=>{
        console.log(`id: ${userId}`)
        let fromDate = new Date();
        fromDate.setMonth(fromDate.getMonth()+1-range)
        fromDate.setDate(1)
        let toDt = new Date(toDate);
        const body = {
            user_id: userId,
            from_ymd: DateUtils.dateToStringYYMMdd(fromDate),
            to_ymd: DateUtils.dateToStringYYMMdd(toDt),
        }
        await saleApi.getGraphSummary(body).then(({status,data})=>{
            if(status === 200 && data){
                // console.table(data)
                setSummary(data)
            }
        })
    }



    return (
        <div className={Graph.graph_panel}>

            <div className={Graph.graph1}>
                <div className={Graph.graph_scroll}>
                    <ul className={Graph.graph_list}>
                        {
                            summary && summary.map((v, i) => {
                                return <GraphSummaryCard title={ITEM_NAMES[i]}
                                                         value={v.value}
                                                         price={i >= 3 && i <= 4}
                                                         per={v.per}
                                                         data={v.list && JSON.parse(v.list)}/>
                            })
                        }
                    </ul>
                </div>
            </div>


            <div className={cm(Graph.graph_group, Graph.graph4_group)}>
                <BarChartArea date={date} userId={userId}/>
                <SliderChartArea date={date} userId={userId}/>
                <PieChartArea date={date} userId={userId}/>

            </div>
            <div className={Graph.graph_group}>
                <LineChartArea date={date} userId={userId}/>
            </div>

        </div>
    )
}