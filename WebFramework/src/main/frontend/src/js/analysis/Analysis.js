import Graph from "../../css/graph.module.css"
import Layout from "../../css/layout.module.css"
import {cm, cmc} from "../utils/cm";
import {GraphSummaryCard} from "./module/GraphSummaryCard";
import graphImg1 from "../../images/graph_img1.png"
import {TabList} from "../common/module/TabList";
import {useEffect, useState} from "react";
import {GraphBarItem} from "./module/GraphBarItem";
import {SliderChartArea} from "./module/SliderChartArea";
import {DataGraph} from "./DataGraph";
import {Statistics} from "./Statistics";
import useValidateInputField from "../hook/useValidateInputField";
import useApi from "../hook/useApi";
import {useSelector} from "react-redux";
import {MonthSelectModal} from "../common/modal/menu/MonthSelectModal";
import {DateUtils} from "../utils/DateUtils";

export function Analysis(){
    const {userApi} = useApi();
    const userInfo = useSelector(state=>state.userReducer)

    const [graphTab, setGraphTab ] = useState(0)
    const [groupTab, setGroupTab ] = useState(0)
    const [userTab, setUserTab ] = useState(0)

    const today = new Date();
    const [keydate, setKeydate] = useState(DateUtils.formatYYMM(today.getFullYear(),today.getMonth()+1))

    const [staffIdList, setStaffIdList] = useState([])
    const [staffNameList, setStaffNameList] = useState([])

    useEffect(() => {
        getInnerStaff();
    }, []);


    const getInnerStaff = async ()=>{
        const {role} = userInfo;
        if(role === 1){
            await userApi.getInnerStaffAsObject().then(({status,data})=>{
                if(status === 200 && data){
                    // console.table(data)
                    const keys = Object.keys(data);
                    setStaffIdList(keys)
                    setStaffNameList(Object.values(data));
                    for(let i=0;i<keys.length; ++i){
                        if(keys[i] === userInfo.id){
                            setUserTab(i)
                            break;
                        }
                    }
                }
            })
        }else{
            setStaffIdList([userInfo.id])
            setStaffNameList([userInfo.name])
        }
    }

    const selectDate = (year,month)=>{
        setKeydate(DateUtils.formatYYMM(year,month))
    }

    return (
        <div className={Layout.sub}>

            <div className={Graph.graph}>
                <div className={Graph.graph_head}>
                    <div className={`${cmc(Graph.tab)} type1`}>
                        <TabList value={graphTab} onChange={setGraphTab} values={
                            ['그래프', '통계']
                        }/>
                    </div>

                    {
                        (graphTab === 0) && (
                            <div className={cmc(Graph.tab, Graph.type2)}>
                                <TabList value={groupTab} onChange={setGroupTab} values={
                                    (userInfo.role === 1) ? ['개인', '매장'] : ['개인']
                                }/>
                            </div>
                        )
                    }


                    <div className={Graph.graph_head_group}>
                        {
                           ( graphTab === 0 && groupTab === 0) && <div className={cmc(Graph.tab, Graph.type3)}>
                                <TabList value={userTab} onChange={setUserTab} values={staffNameList}/>
                            </div>
                        }

                        <MonthSelectModal onSelect={selectDate}>
                            <input type="text" className="inp date" value={keydate}
                                   placeholder="날짜 선택" readOnly/>
                        </MonthSelectModal>
                        <button type="button" className="btn_all">전체 보기</button>
                    </div>
                </div>
                {
                    graphTab === 0 ? <DataGraph userId={groupTab === 0 ? staffIdList[userTab] : null} date={keydate}/> : <Statistics date={keydate}/>
                }
            </div>

        </div>
    )
}