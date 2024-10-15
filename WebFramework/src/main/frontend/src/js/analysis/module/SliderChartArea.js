import Graph from "../../../css/graph.module.css";
import {cm, cmc} from "../../utils/cm";
import {TabList} from "../../common/module/TabList";
import {useEffect, useState} from "react";
import useApi from "../../hook/useApi";
import {DateUtils} from "../../utils/DateUtils";
import DataNotFound from "../../../images/no_data_icon.png"
import {ObjectUtils} from "../../utils/objectUtil";

export function SliderChartArea({date, userId}){
    const {saleApi} = useApi()
    const [tab, setTab] = useState(0)

    const [items, setItems] = useState(null)

    useEffect(() => {
        getItems()
    }, [date, userId, tab]);

    const getItems = async ()=>{
        let fromDate = new Date(date)
        fromDate.setMonth(fromDate.getMonth()-1);
        fromDate.setDate(1)
        let toDate = new Date(date)
        toDate.setDate(0)

        const body = {
            user_id: userId,
            from_ymd: DateUtils.dateToStringYYMMdd(fromDate),
            to_ymd: DateUtils.dateToStringYYMMdd(toDate)
        }

        await saleApi.getGraphStat(tab, body).then(({status,data})=>{
            if(status === 200 && data){
                // console.table(data)
                setItems(data)
            }
        })
    }

    return (
        <div className={cm(Graph.graph4, Graph.div)}>
            <div className={Graph.graph_top}>
                <div className={`${cmc(Graph.tab, Graph.type4)} ta_r`}>
                    <TabList value={tab} onChange={setTab} values={['개통 모델', '개통 요금제','세컨']}/>
                </div>
            </div>

            <div className={Graph.graph_bar}>
                <ul className={Graph.bar_list}>
                    {
                        items && items.map((v,i)=> {
                            return <li key={i} className={Graph.bar_item}>
                                <div className={Graph.bar_text}>{v.name}<span className={Graph.bar_per}>{v.per}%</span></div>
                                <div className={Graph.bar}><span className={Graph.span} style={{width: `${v.per}%`}}></span>
                                </div>
                            </li>
                        })
                    }
                    {
                        ObjectUtils.isEmpty(items) && <>
                            <img className={Graph.img} src={DataNotFound} alt=""/>
                        </>
                    }
                </ul>
            </div>
        </div>
    )
}