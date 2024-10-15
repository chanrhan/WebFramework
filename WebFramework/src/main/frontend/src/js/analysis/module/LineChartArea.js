import {cm, cmc} from "../../utils/cm";
import Graph from "../../../css/graph.module.css";
import {TabList} from "../../common/module/TabList";
import {LineChartInstance} from "./LineChartInstance";
import {useEffect, useState} from "react";
import {DateUtils} from "../../utils/DateUtils";
import useApi from "../../hook/useApi";
import {PerformanceChart} from "../../service/dashboard/module/PerformanceChart";

export function LineChartArea({date, userId}){
    const {saleApi} = useApi();
    const [tab1, setTab1] = useState(0)
    const [tab2, setTab2] = useState(0)
    const [tab3, setTab3] = useState(0)

    const [graphData, setGraphData] = useState(null)

    useEffect(() => {
        getGraphData()
    }, [date, userId, tab1, tab2, tab3]);

    const getGraphData = async ()=>{
        let fromDate = new Date(date);
        let toDate = new Date(date)
        toDate.setDate(toDate.getDate()-1);
        let rst = null;
        let dateType = 'd';
        switch (tab3){
            case 0: // 1주
                fromDate.setDate(fromDate.getDate()-7);
                break;
            case 1: // 1개월
                fromDate.setMonth(fromDate.getMonth()-1)
                break;
            case 2: // 3개월
                fromDate.setMonth(fromDate.getMonth()-3)
                break;
            case 3: // 1년
                fromDate.setMonth(fromDate.getMonth()-12)
                // dateType = 'm'
                break;
        }

        const body = {
            user_id: userId,
            from_ymd: DateUtils.dateToStringYYMMdd(fromDate),
            to_ymd: DateUtils.dateToStringYYMMdd(toDate)
        }

        switch (tab2){
            case 0: // 무선
                rst = await saleApi.getCtGraphByDateType(dateType, body)
                break;
            case 1: // 인터넷
                rst = await saleApi.getInternetGraphByDateType(dateType, body)
                break;
            case 2: // TV
                rst = await saleApi.getTvGraphByDateType(dateType, body)
                break;
            case 3: // 마진
                rst = await saleApi.getMarginGraphByDateType(dateType, body)
                break;
            case 4: // 평균 마진
                rst = await saleApi.getAvgMarginGraphByDateType(dateType, body)
                break;
        }

        if(rst != null){
            const {status, data}  = rst;
            if(status === 200 && data){
                if(data.value && data.date){
                    setGraphData({
                        value: JSON.parse(data.value),
                        date: JSON.parse(data.date)
                    })
                }
            }
        }
    }

     return (
        <div className={cm(Graph.graph2, Graph.div)}>
            <div className={Graph.graph_top}>
                <div className={cmc(Graph.tab, Graph.type4)}>
                    <TabList name='tab2' value={tab2} onChange={setTab2} values={
                        ['무선', '인터넷', 'TV', '총이익', '평균이익']
                    }/>
                </div>
            </div>

            <PerformanceChart userInfo={userId}
                              categoryTab={tab2}
                              pannelClassName={cmc(Graph.tab, Graph.type5)}
                              chartClassName={Graph.graph_box}
            />

            {/*<div className={Graph.graph_box}>*/}
            {/*    <LineChartInstance color='blue' pointRadius='0' data={graphData && graphData.value} x_axis_disabled*/}
            {/*                       y_axis_disabled/>*/}
            {/*</div>*/}

            {/*<div className={cmc(Graph.tab, Graph.type5)}>*/}
            {/*    <TabList name='tab3' value={tab3} onChange={setTab3} theme={Graph} values={*/}
            {/*        ['1주', '1개월', '3개월', '1년']*/}
            {/*    }/>*/}
            {/*</div>*/}
        </div>
    )
}